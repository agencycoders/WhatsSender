import React, { useState, useRef } from 'react';
import { Settings as SettingsIcon, User, Key, Bell, Database, Shield, HelpCircle, MessageSquare, Mail, Camera, Eye, EyeOff } from 'lucide-react';
import ApiSettings from './ApiSettings';

interface SettingSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  items: SettingItem[];
}

interface SettingItem {
  id: string;
  label: string;
  description?: string;
  type: 'toggle' | 'input' | 'select' | 'password' | 'custom';
  value?: string | boolean;
  options?: { label: string; value: string }[];
  icon?: React.ReactNode;
  placeholder?: string;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  render?: () => React.ReactNode;
}

const Settings: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const settingSections: SettingSection[] = [
    {
      id: 'account',
      title: 'Conta',
      description: 'Gerencie suas informações de conta e preferências',
      icon: <User className="w-5 h-5" />,
      items: [
        {
          id: 'avatar',
          label: 'Avatar',
          type: 'custom',
          render: () => (
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-[#2A373F] flex items-center justify-center overflow-hidden">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl text-[#8696A0]">JS</span>
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-1.5 bg-[#00A884] rounded-full text-[#202C33] hover:bg-[#00A884]/90 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
              <div className="flex-1">
                <p className="text-[#E9EDEF] text-sm font-medium mb-1">Alterar foto do perfil</p>
                <p className="text-[#8696A0] text-xs">Clique no ícone da câmera para alterar sua foto</p>
              </div>
            </div>
          )
        },
        {
          id: 'name',
          label: 'Nome',
          type: 'input',
          value: 'João Silva',
          icon: <User className="w-5 h-5 text-[#8696A0]" />,
          placeholder: 'Digite seu nome'
        },
        {
          id: 'email',
          label: 'Email',
          type: 'input',
          value: 'joao.silva@email.com',
          icon: <Mail className="w-5 h-5 text-[#8696A0]" />,
          placeholder: 'Digite seu email'
        },
        {
          id: 'current_password',
          label: 'Senha Atual',
          type: 'password',
          value: '',
          icon: <Key className="w-5 h-5 text-[#8696A0]" />,
          placeholder: 'Digite sua senha atual',
          showPassword: showPassword,
          onTogglePassword: () => setShowPassword(!showPassword)
        },
        {
          id: 'new_password',
          label: 'Nova Senha',
          type: 'password',
          value: '',
          icon: <Key className="w-5 h-5 text-[#8696A0]" />,
          placeholder: 'Digite sua nova senha',
          showPassword: showNewPassword,
          onTogglePassword: () => setShowNewPassword(!showNewPassword)
        }
      ]
    },
    {
      id: 'security',
      title: 'Segurança',
      description: 'Configure suas opções de segurança e autenticação',
      icon: <Shield className="w-5 h-5" />,
      items: [
        {
          id: '2fa',
          label: 'Autenticação em dois fatores',
          description: 'Adicione uma camada extra de segurança à sua conta',
          type: 'toggle',
          value: true
        },
        {
          id: 'session',
          label: 'Tempo de sessão',
          description: 'Defina o tempo máximo de inatividade antes do logout',
          type: 'select',
          value: '30',
          options: [
            { label: '15 minutos', value: '15' },
            { label: '30 minutos', value: '30' },
            { label: '1 hora', value: '60' }
          ]
        }
      ]
    },
    {
      id: 'notifications',
      title: 'Notificações',
      description: 'Personalize suas preferências de notificação',
      icon: <Bell className="w-5 h-5" />,
      items: [
        {
          id: 'push',
          label: 'Notificações push',
          description: 'Receba notificações em tempo real',
          type: 'toggle',
          value: true
        },
        {
          id: 'email_notifications',
          label: 'Notificações por email',
          description: 'Receba um resumo diário por email',
          type: 'toggle',
          value: false
        }
      ]
    }
  ];

  const renderSettingItem = (item: SettingItem) => {
    switch (item.type) {
      case 'custom':
        return item.render?.();
      case 'toggle':
        return (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={item.value as boolean}
              onChange={() => {}}
            />
            <div className="w-11 h-6 bg-[#2A373F] rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-[#8696A0] after:border-[#8696A0] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00A884] after:bg-[#202C33] peer-checked:after:bg-[#202C33]"></div>
          </label>
        );
      case 'password':
      case 'input':
        return (
          <div className="relative">
            {item.icon && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {item.icon}
              </div>
            )}
            <input
              type={item.type === 'password' ? (item.showPassword ? 'text' : 'password') : 'text'}
              value={item.value as string}
              placeholder={item.placeholder}
              onChange={() => {}}
              className={`bg-[#2A373F] text-[#E9EDEF] rounded-lg border border-[#2A373F] focus:outline-none focus:border-[#00A884] w-full transition-colors duration-200 ${
                item.icon ? 'pl-10' : 'px-3'
              } ${item.type === 'password' ? 'pr-10' : 'pr-3'} py-2 placeholder-[#8696A0]`}
            />
            {item.type === 'password' && (
              <button
                type="button"
                onClick={item.onTogglePassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#8696A0] hover:text-[#E9EDEF] transition-colors"
              >
                {item.showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
        );
      case 'select':
        return (
          <select
            value={item.value as string}
            onChange={() => {}}
            className="bg-[#2A373F] text-[#E9EDEF] px-3 py-2 rounded-lg border border-[#2A373F] focus:outline-none focus:border-[#00A884] w-full"
          >
            {item.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <SettingsIcon className="w-6 h-6 text-[#00A884]" />
        <h1 className="text-[#E9EDEF] text-2xl font-medium">Configurações</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {settingSections.map((section) => (
          <div
            key={section.id}
            className="bg-[#202C33] rounded-xl border border-[#2A373F] overflow-hidden"
          >
            <div className="p-6 border-b border-[#2A373F]">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-[#2A373F] rounded-lg text-[#00A884]">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-[#E9EDEF] text-lg font-medium">{section.title}</h2>
                  <p className="text-[#8696A0] text-sm">{section.description}</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {section.items.map((item) => (
                <div key={item.id} className={`flex items-start ${section.id === 'account' ? 'space-x-4' : 'justify-between'}`}>
                  <div className={`${section.id === 'account' ? 'w-24 pt-2' : 'space-y-1'}`}>
                    <label className="text-[#E9EDEF] font-medium">{item.label}</label>
                    {item.description && (
                      <p className="text-[#8696A0] text-sm">{item.description}</p>
                    )}
                  </div>
                  <div className={`${section.id === 'account' ? 'flex-1' : 'w-64'}`}>
                    {renderSettingItem(item)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-[#202C33] rounded-xl border border-[#2A373F] overflow-hidden">
          <div className="p-6 border-b border-[#2A373F]">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-[#2A373F] rounded-lg text-[#00A884]">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-[#E9EDEF] text-lg font-medium">Configurações da API</h2>
                <p className="text-[#8696A0] text-sm">Configure sua conexão com a API da Megaapi</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <ApiSettings />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-6 bg-[#202C33] rounded-xl border border-[#2A373F]">
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-2 text-[#8696A0] hover:text-[#00A884] transition-colors">
            <HelpCircle className="w-5 h-5" />
            <span>Central de Ajuda</span>
          </button>
          <button className="flex items-center space-x-2 text-[#8696A0] hover:text-[#00A884] transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span>Feedback</span>
          </button>
        </div>
        <div className="text-[#8696A0] text-sm">
          Versão 1.0.0
        </div>
      </div>
    </div>
  );
};

export default Settings; 