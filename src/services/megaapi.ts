import axios from 'axios';
import { MegaapiConfig, ApiValidationResponse, ApiError } from '../types/api';

interface InstanceResponse {
  error: boolean;
  message: string;
  webhookUrl?: string;
  webhookEnabled?: boolean;
}

class MegaapiService {
  private static instance: MegaapiService;
  private config: MegaapiConfig | null = null;

  private constructor() {
    // Carregar configuração do localStorage
    const savedConfig = localStorage.getItem('megaapi_config');
    if (savedConfig) {
      this.config = JSON.parse(savedConfig);
    }
  }

  public static getInstance(): MegaapiService {
    if (!MegaapiService.instance) {
      MegaapiService.instance = new MegaapiService();
    }
    return MegaapiService.instance;
  }

  public getConfig(): MegaapiConfig | null {
    return this.config;
  }

  private createAxiosInstance(hostUrl: string, token?: string) {
    // Garante que a URL começa com https:// e termina com /rest
    let baseURL = hostUrl;
    
    // Adiciona https:// se não existir
    if (!baseURL.startsWith('http://') && !baseURL.startsWith('https://')) {
      baseURL = `https://${baseURL}`;
    }

    // Adiciona /rest se não existir
    if (!baseURL.endsWith('/rest')) {
      // Remove barra no final se existir
      baseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
      baseURL = `${baseURL}/rest`;
    }
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Debug dos headers
    console.log('URL Base:', baseURL);
    console.log('Headers:', headers);
    
    return axios.create({
      baseURL,
      headers
    });
  }

  private validateInstanceResponse(response: InstanceResponse): void {
    if (response.error) {
      const error: ApiError = {
        message: response.message || 'Erro ao validar webhook',
        code: 'WEBHOOK_ERROR',
        status: 400
      };
      throw error;
    }
  }

  public async validateAndSaveConfig(config: MegaapiConfig): Promise<ApiValidationResponse> {
    try {
      const api = this.createAxiosInstance(config.hostUrl, config.token);
      const { data } = await api.get<InstanceResponse>(`/webhook/${config.instanceKey}`);
      
      // Debug da resposta
      console.log('Resposta da API:', data);

      // Verifica se a resposta tem a estrutura esperada
      if (!data || typeof data !== 'object') {
        throw new Error('Resposta inválida da API');
      }

      // Valida a resposta da API
      this.validateInstanceResponse(data);

      // Se chegou aqui, a configuração é válida
      this.config = {
        ...config,
        isValid: true
      };
      localStorage.setItem('megaapi_config', JSON.stringify(this.config));

      return {
        status: 200,
        message: data.message || 'Conexão estabelecida com sucesso',
        instance: {
          id: config.instanceKey,
          name: `Webhook ${data.webhookEnabled ? 'Ativado' : 'Desativado'}`
        }
      };
    } catch (error) {
      // Debug do erro
      console.error('Erro completo:', error);
      
      if (error && typeof error === 'object' && 'code' in error && 'message' in error && 'status' in error) {
        // Se já é um ApiError, apenas repassa
        throw error;
      }
      
      if (axios.isAxiosError(error)) {
        let message = 'Erro ao validar a configuração';
        let status = 500;
        
        // Debug da resposta de erro
        console.log('Resposta de erro:', error.response?.data);
        
        if (error.response?.status === 401) {
          message = 'Token de autenticação inválido';
          status = 401;
        } else if (error.response?.status === 404) {
          message = 'Webhook não encontrado';
          status = 404;
        } else if (!error.response) {
          message = 'Não foi possível conectar ao host. Verifique a URL e sua conexão';
          status = 503;
        }

        const apiError: ApiError = {
          message: error.response?.data?.message || message,
          code: error.code || 'UNKNOWN_ERROR',
          status: error.response?.status || status
        };
        throw apiError;
      }

      // Para outros tipos de erro, cria um ApiError genérico
      const apiError: ApiError = {
        message: error instanceof Error ? error.message : 'Erro desconhecido',
        code: 'UNKNOWN_ERROR',
        status: 500
      };
      throw apiError;
    }
  }

  public async checkInstanceStatus(): Promise<ApiValidationResponse> {
    if (!this.config) {
      const error: ApiError = {
        message: 'API não configurada',
        code: 'NOT_CONFIGURED',
        status: 400
      };
      throw error;
    }

    try {
      const api = this.createAxiosInstance(this.config.hostUrl, this.config.token);
      const { data } = await api.get<InstanceResponse>(`/webhook/${this.config.instanceKey}`);
      
      try {
        this.validateInstanceResponse(data);
        return {
          status: 200,
          message: data.message || 'Webhook configurado e operacional',
          instance: {
            id: this.config.instanceKey,
            name: `Webhook ${data.webhookEnabled ? 'Ativado' : 'Desativado'}`
          }
        };
      } catch (validationError) {
        if (validationError && typeof validationError === 'object' && 'message' in validationError) {
          return {
            status: 200,
            message: validationError.message as string,
            instance: {
              id: this.config.instanceKey,
              name: `Webhook ${data.webhookEnabled ? 'Ativado' : 'Desativado'}`
            }
          };
        }
        throw validationError;
      }
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error && 'message' in error && 'status' in error) {
        // Se já é um ApiError, apenas repassa
        throw error;
      }

      if (axios.isAxiosError(error)) {
        const apiError: ApiError = {
          message: error.response?.data?.message || 'Erro ao verificar status do webhook',
          code: error.code || 'UNKNOWN_ERROR',
          status: error.response?.status || 500
        };
        throw apiError;
      }

      // Para outros tipos de erro, cria um ApiError genérico
      const apiError: ApiError = {
        message: error instanceof Error ? error.message : 'Erro desconhecido',
        code: 'UNKNOWN_ERROR',
        status: 500
      };
      throw apiError;
    }
  }

  public clearConfig(): void {
    this.config = null;
    localStorage.removeItem('megaapi_config');
  }
}

export const megaapi = MegaapiService.getInstance();
export default megaapi; 