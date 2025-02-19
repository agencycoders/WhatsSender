import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Loader2, RefreshCw } from 'lucide-react';
import { megaapi } from '../services/megaapi';
import type { MegaapiConfig, ApiError } from '../types/api';

const ApiSettings: React.FC = () => {
  const [config, setConfig] = useState<MegaapiConfig>({
    hostUrl: '',
    instanceKey: '',
    token: '',
    isValid: false
  });
  const [isValidating, setIsValidating] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [instanceStatus, setInstanceStatus] = useState<{
    status: string;
    lastCheck: string;
  } | null>(null);

  useEffect(() => {
    // Carregar configuração existente
    const savedConfig = megaapi.getConfig();
    if (savedConfig) {
      setConfig(savedConfig);
      if (savedConfig.isValid) {
        checkInstanceStatus();
      }
    }
  }, []);

  const handleValidate = async () => {
    setIsValidating(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await megaapi.validateAndSaveConfig(config);
      setConfig(prev => ({ ...prev, isValid: true }));
      setSuccessMessage(`Instância "${response.instance?.name}" conectada com sucesso!`);
      await checkInstanceStatus();
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erro ao validar a configuração');
      setConfig(prev => ({ ...prev, isValid: false }));
      setInstanceStatus(null);
    } finally {
      setIsValidating(false);
    }
  };

  const checkInstanceStatus = async () => {
    setIsCheckingStatus(true);
    try {
      const response = await megaapi.checkInstanceStatus();
      setInstanceStatus({
        status: response.message,
        lastCheck: new Date().toLocaleTimeString()
      });
      setError(null);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message);
      setInstanceStatus(null);
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const handleClear = () => {
    megaapi.clearConfig();
    setConfig({
      hostUrl: '',
      instanceKey: '',
      token: '',
      isValid: false
    });
    setError(null);
    setSuccessMessage(null);
    setInstanceStatus(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="hostUrl" className="block text-[#E9EDEF] text-sm font-medium mb-1">
          URL do Host
        </label>
        <input
          type="url"
          id="hostUrl"
          value={config.hostUrl}
          onChange={(e) => setConfig({ ...config, hostUrl: e.target.value, isValid: false })}
          placeholder="apistart01.megaapi.com.br"
          className="w-full bg-[#2A373F] text-[#E9EDEF] px-3 py-2 rounded-lg border border-[#2A373F] focus:outline-none focus:border-[#00A884] placeholder-[#8696A0]"
        />
        <p className="mt-1 text-[#8696A0] text-sm">
          URL base da API da Megaapi (exemplo: apistart01.megaapi.com.br)
        </p>
      </div>

      <div>
        <label htmlFor="instanceKey" className="block text-[#E9EDEF] text-sm font-medium mb-1">
          Instance Key
        </label>
        <input
          type="text"
          id="instanceKey"
          value={config.instanceKey}
          onChange={(e) => setConfig({ ...config, instanceKey: e.target.value, isValid: false })}
          placeholder="Sua chave de instância"
          className="w-full bg-[#2A373F] text-[#E9EDEF] px-3 py-2 rounded-lg border border-[#2A373F] focus:outline-none focus:border-[#00A884] placeholder-[#8696A0]"
        />
        <p className="mt-1 text-[#8696A0] text-sm">
          Chave de identificação da instância
        </p>
      </div>

      <div>
        <label htmlFor="token" className="block text-[#E9EDEF] text-sm font-medium mb-1">
          Token de Autenticação
        </label>
        <input
          type="password"
          id="token"
          value={config.token}
          onChange={(e) => setConfig({ ...config, token: e.target.value, isValid: false })}
          placeholder="Seu token de autenticação"
          className="w-full bg-[#2A373F] text-[#E9EDEF] px-3 py-2 rounded-lg border border-[#2A373F] focus:outline-none focus:border-[#00A884] placeholder-[#8696A0]"
        />
        <p className="mt-1 text-[#8696A0] text-sm">
          Token Bearer para autenticação na API
        </p>
      </div>

      {error && (
        <div className="flex items-center space-x-2 text-[#EF4444] bg-[#EF4444]/10 px-3 py-2 rounded-lg">
          <XCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="flex items-center space-x-2 text-[#00A884] bg-[#00A884]/10 px-3 py-2 rounded-lg">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{successMessage}</p>
        </div>
      )}

      <div className="flex items-center space-x-3">
        <button
          onClick={handleValidate}
          disabled={isValidating || !config.hostUrl || !config.instanceKey}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            isValidating || !config.hostUrl || !config.instanceKey
              ? 'bg-[#2A373F] text-[#8696A0] cursor-not-allowed'
              : 'bg-[#00A884] text-[#202C33] hover:bg-[#00A884]/90'
          }`}
        >
          {isValidating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Validando...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5" />
              <span>Validar Conexão</span>
            </>
          )}
        </button>

        {config.isValid && (
          <>
            <button
              onClick={checkInstanceStatus}
              disabled={isCheckingStatus}
              className="flex items-center space-x-2 px-4 py-2 text-[#E9EDEF] bg-[#2A373F] rounded-lg hover:bg-[#2A373F]/80 transition-colors"
            >
              {isCheckingStatus ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <RefreshCw className="w-5 h-5" />
              )}
              <span>Verificar Status</span>
            </button>

            <button
              onClick={handleClear}
              className="px-4 py-2 text-[#EF4444] hover:text-[#EF4444]/80 transition-colors"
            >
              Limpar Configuração
            </button>
          </>
        )}
      </div>

      {config.isValid && instanceStatus && (
        <div className="mt-6 p-4 bg-[#2A373F] rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-[#00A884]">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-medium">API configurada e pronta para uso</span>
            </div>
            <span className="text-[#8696A0] text-sm">
              Última verificação: {instanceStatus.lastCheck}
            </span>
          </div>
          <p className="mt-2 text-[#8696A0] text-sm">
            Status: {instanceStatus.status}
          </p>
        </div>
      )}
    </div>
  );
};

export default ApiSettings; 