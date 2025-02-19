import React, { useState } from 'react';
import { UserPlus, Search, Filter, Shield, Mail, Key, Trash2, Edit2, MoreVertical } from 'lucide-react';
import CreateUserModal from './CreateUserModal';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  createdAt: string;
}

const Users: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'João Silva',
      email: 'joao.silva@email.com',
      role: 'admin',
      status: 'active',
      createdAt: '2024-03-15'
    },
    {
      id: '2',
      name: 'Maria Oliveira',
      email: 'maria.oliveira@email.com',
      role: 'user',
      status: 'active',
      createdAt: '2024-03-14'
    }
  ]);

  const handleCreateUser = (userData: {
    name: string;
    email: string;
    role: 'admin' | 'user';
    password: string;
  }) => {
    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };
    // Aqui você implementaria a lógica de criação do usuário na API
    console.log('Criar usuário:', newUser);
  };

  const handleEditUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setIsEditModalOpen(true);
    }
  };

  const handleUpdateUser = (userData: User) => {
    // Aqui você implementaria a lógica de atualização do usuário
    console.log('Atualizar usuário:', userData);
  };

  const handleDeleteUser = (userId: string) => {
    // Aqui você implementaria a lógica de exclusão do usuário
    console.log('Excluir usuário:', userId);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[#E9EDEF] text-2xl font-medium">Usuários</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar usuários..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#202C33] text-[#E9EDEF] px-10 py-2 rounded-lg border border-[#2A373F] focus:outline-none focus:border-[#00A884] w-64 placeholder-[#8696A0]"
            />
            <Search className="w-5 h-5 text-[#8696A0] absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <button className="p-2 text-[#8696A0] hover:text-[#00A884] transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-[#202C33] rounded-xl border border-[#2A373F]">
        {/* Header Actions */}
        <div className="p-4 border-b border-[#2A373F] flex items-center justify-between">
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#00A884] text-[#202C33] rounded-lg hover:bg-[#00A884]/90 transition-colors"
          >
            <UserPlus className="w-5 h-5" />
            <span className="text-sm font-medium">Novo Usuário</span>
          </button>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A373F]">
                <th className="px-4 py-3 text-left text-sm font-medium text-[#8696A0]">Nome</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#8696A0]">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#8696A0]">Função</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#8696A0]">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#8696A0]">Data de Criação</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#8696A0]">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-[#2A373F] hover:bg-[#2A373F] transition-colors group"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-[#00A884] flex items-center justify-center text-[#202C33] font-medium">
                        {user.name.charAt(0)}
                      </div>
                      <span className="text-[#E9EDEF]">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#8696A0]">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.role === 'admin'
                        ? 'bg-[#00A884]/10 text-[#00A884]'
                        : 'bg-[#8696A0]/10 text-[#8696A0]'
                    }`}>
                      {user.role === 'admin' ? 'Administrador' : 'Usuário'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.status === 'active'
                        ? 'bg-[#00A884]/10 text-[#00A884]'
                        : 'bg-[#EF4444]/10 text-[#EF4444]'
                    }`}>
                      {user.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#8696A0]">
                    {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditUser(user.id)}
                        className="p-1 text-[#8696A0] hover:text-[#00A884] transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-1 text-[#8696A0] hover:text-[#EF4444] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-[#8696A0] hover:text-[#E9EDEF] transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateUser}
      />
    </div>
  );
};

export default Users; 