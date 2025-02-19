import React, { useState } from 'react';
import { X, User, Mail, Shield, Key } from 'lucide-react';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userData: {
    name: string;
    email: string;
    role: 'admin' | 'user';
    password: string;
  }) => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '', role: 'user', password: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#202C33] rounded-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-[#2A373F]">
          <h2 className="text-[#E9EDEF] text-lg font-medium">Novo Usuário</h2>
          <button
            onClick={onClose}
            className="text-[#8696A0] hover:text-[#E9EDEF] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-[#E9EDEF] text-sm font-medium mb-1">
              Nome
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-[#8696A0]" />
              </div>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#2A373F] text-[#E9EDEF] pl-10 pr-3 py-2 rounded-lg border border-[#2A373F] focus:outline-none focus:border-[#00A884] placeholder-[#8696A0]"
                placeholder="Nome completo"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[#E9EDEF] text-sm font-medium mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-[#8696A0]" />
              </div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#2A373F] text-[#E9EDEF] pl-10 pr-3 py-2 rounded-lg border border-[#2A373F] focus:outline-none focus:border-[#00A884] placeholder-[#8696A0]"
                placeholder="email@exemplo.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[#E9EDEF] text-sm font-medium mb-1">
              Função
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Shield className="h-5 w-5 text-[#8696A0]" />
              </div>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'user' })}
                className="w-full bg-[#2A373F] text-[#E9EDEF] pl-10 pr-3 py-2 rounded-lg border border-[#2A373F] focus:outline-none focus:border-[#00A884]"
              >
                <option value="user">Usuário</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[#E9EDEF] text-sm font-medium mb-1">
              Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="h-5 w-5 text-[#8696A0]" />
              </div>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-[#2A373F] text-[#E9EDEF] pl-10 pr-3 py-2 rounded-lg border border-[#2A373F] focus:outline-none focus:border-[#00A884] placeholder-[#8696A0]"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[#E9EDEF] bg-[#2A373F] rounded-lg hover:bg-[#2A373F]/80 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#00A884] text-[#202C33] rounded-lg hover:bg-[#00A884]/90 transition-colors font-medium"
            >
              Criar Usuário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal; 