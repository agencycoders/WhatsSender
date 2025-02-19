import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { megaapi } from './megaapi';
import type { MegaapiConfig, ApiError } from '../types/api';

// Mock do axios
vi.mock('axios');
const mockedAxios = vi.mocked(axios);

// Mock da instância do axios
const mockAxiosInstance = {
  get: vi.fn()
} as unknown as AxiosInstance;

// Helper para criar uma resposta do axios
const createAxiosResponse = <T>(data: T): AxiosResponse<T> => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {} as any
});

describe('MegaapiService', () => {
  beforeEach(() => {
    // Limpa os mocks antes de cada teste
    vi.clearAllMocks();
    // Limpa o localStorage
    localStorage.clear();
    // Limpa a configuração do serviço
    megaapi.clearConfig();
    // Reseta o mock do axios.create
    (mockedAxios.create as any).mockReturnValue(mockAxiosInstance);
    // Mock do isAxiosError
    (axios.isAxiosError as any) = vi.fn().mockReturnValue(true);
  });

  describe('validateAndSaveConfig', () => {
    it('deve validar uma configuração válida com sucesso', async () => {
      // Mock da resposta da API
      const mockResponse = createAxiosResponse({
        status: true,
        message: 'Instância encontrada',
        instance: {
          id: 'test-id',
          name: 'Test Instance',
          status: 'connected'
        }
      });

      // Mock do localStorage.setItem
      const setItemSpy = vi.spyOn(localStorage, 'setItem');

      // Configura o mock da resposta
      (mockAxiosInstance.get as any).mockResolvedValue(mockResponse);

      const config: MegaapiConfig = {
        hostUrl: 'apistart01.megaapi.com.br',
        instanceKey: 'megastart-test',
        isValid: false
      };

      const result = await megaapi.validateAndSaveConfig(config);

      // Verifica se a resposta está correta
      expect(result).toEqual({
        status: 200,
        message: 'Instância encontrada',
        instance: {
          id: 'test-id',
          name: 'Test Instance'
        }
      });

      // Verifica se o localStorage.setItem foi chamado com os parâmetros corretos
      expect(setItemSpy).toHaveBeenCalledWith(
        'megaapi_config',
        JSON.stringify({ ...config, isValid: true })
      );
    });

    it('deve rejeitar uma instância desconectada', async () => {
      // Mock da resposta da API com instância desconectada
      const mockResponse = createAxiosResponse({
        status: true,
        message: 'Instância encontrada',
        instance: {
          id: 'test-id',
          name: 'Test Instance',
          status: 'disconnected'
        }
      });

      // Configura o mock da resposta
      (mockAxiosInstance.get as any).mockResolvedValue(mockResponse);

      const config = {
        hostUrl: 'apistart01.megaapi.com.br',
        instanceKey: 'megastart-test',
        isValid: false
      };

      try {
        await megaapi.validateAndSaveConfig(config);
        expect.fail('Deveria ter lançado um erro');
      } catch (error) {
        const apiError = error as ApiError;
        expect(apiError.message).toBe('Instância está desconectada');
        expect(apiError.code).toBe('INSTANCE_DISCONNECTED');
        expect(apiError.status).toBe(400);
      }
    });

    it('deve lidar com erro 404 corretamente', async () => {
      // Mock de erro 404
      const mockError = new AxiosError();
      mockError.response = {
        status: 404,
        data: {
          message: 'Instância não encontrada'
        }
      } as any;

      // Configura o mock para rejeitar com erro
      (mockAxiosInstance.get as any).mockRejectedValue(mockError);

      const config = {
        hostUrl: 'apistart01.megaapi.com.br',
        instanceKey: 'invalid-key',
        isValid: false
      };

      try {
        await megaapi.validateAndSaveConfig(config);
        expect.fail('Deveria ter lançado um erro');
      } catch (error) {
        const apiError = error as ApiError;
        expect(apiError.status).toBe(404);
        expect(apiError.message).toBe('Instância não encontrada');
        expect(apiError.code).toBe('UNKNOWN_ERROR');
      }
    });

    it('deve lidar com erro de conexão corretamente', async () => {
      // Mock de erro de conexão
      const mockError = new AxiosError();
      mockError.code = 'ECONNREFUSED';
      mockError.response = undefined;

      // Configura o mock para rejeitar com erro
      (mockAxiosInstance.get as any).mockRejectedValue(mockError);

      const config = {
        hostUrl: 'invalid-host',
        instanceKey: 'megastart-test',
        isValid: false
      };

      try {
        await megaapi.validateAndSaveConfig(config);
        expect.fail('Deveria ter lançado um erro');
      } catch (error) {
        const apiError = error as ApiError;
        expect(apiError.message).toBe('Não foi possível conectar ao host. Verifique a URL e sua conexão');
        expect(apiError.code).toBe('ECONNREFUSED');
        expect(apiError.status).toBe(503);
      }
    });
  });

  describe('checkInstanceStatus', () => {
    it('deve verificar o status de uma instância válida', async () => {
      // Configura uma instância válida primeiro
      const mockResponse = createAxiosResponse({
        status: true,
        message: 'Instância operacional',
        instance: {
          id: 'test-id',
          name: 'Test Instance',
          status: 'connected'
        }
      });

      // Configura o mock da resposta
      (mockAxiosInstance.get as any).mockResolvedValue(mockResponse);

      // Configura o serviço com uma configuração válida
      const config = {
        hostUrl: 'apistart01.megaapi.com.br',
        instanceKey: 'megastart-test',
        isValid: true
      };

      // Mock do getItem para retornar a configuração
      vi.spyOn(localStorage, 'getItem').mockReturnValue(JSON.stringify(config));

      // Força a recriação da instância para carregar a nova configuração
      (megaapi as any).config = config;

      const result = await megaapi.checkInstanceStatus();

      expect(result).toEqual({
        status: 200,
        message: 'Instância operacional',
        instance: {
          id: 'test-id',
          name: 'Test Instance'
        }
      });
    });

    it('deve rejeitar quando não há configuração', async () => {
      try {
        await megaapi.checkInstanceStatus();
        expect.fail('Deveria ter lançado um erro');
      } catch (error) {
        const apiError = error as ApiError;
        expect(apiError.message).toBe('API não configurada');
        expect(apiError.code).toBe('NOT_CONFIGURED');
        expect(apiError.status).toBe(400);
      }
    });
  });
}); 