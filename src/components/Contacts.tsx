import React, { useState } from 'react';
import { Users, Upload, Search, Filter, MoreVertical, Trash2, Download, UserPlus, ListPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AddContactModal from './AddContactModal';
import EditContactModal from './EditContactModal';
import SendMessageModal from './SendMessageModal';
import ActionsMenu from './ActionsMenu';

interface Contact {
  id: string;
  name: string;
  phone: string;
  group: string;
  lastMessage?: string;
  lastMessageDate?: string;
}

const Contacts: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'João Silva',
      phone: '+55 11 99999-9999',
      group: 'Clientes Ativos',
      lastMessage: 'Obrigado pelo atendimento!',
      lastMessageDate: '2024-03-15'
    },
    {
      id: '2',
      name: 'Maria Oliveira',
      phone: '+55 11 98888-8888',
      group: 'Leads Quentes',
      lastMessage: 'Gostaria de mais informações',
      lastMessageDate: '2024-03-14'
    },
    {
      id: '3',
      name: 'Pedro Santos',
      phone: '+55 11 97777-7777',
      group: 'Newsletter',
      lastMessageDate: '2024-03-13'
    }
  ]);

  const handleAddContact = (newContact: { name: string; phone: string; group: string }) => {
    const contact: Contact = {
      id: Date.now().toString(),
      ...newContact
    };
    setContacts([contact, ...contacts]);
  };

  const handleEditContact = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    if (contact) {
      setSelectedContact(contact);
      setIsEditModalOpen(true);
    }
  };

  const handleSaveEdit = (editedContact: Contact) => {
    setContacts(contacts.map(contact => 
      contact.id === editedContact.id ? editedContact : contact
    ));
  };

  const handleDeleteContact = (contactId: string) => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const handleDeleteSelected = () => {
    setContacts(contacts.filter(contact => !selectedContacts.includes(contact.id)));
    setSelectedContacts([]);
  };

  const handleMessageContact = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    if (contact) {
      setSelectedContact(contact);
      setIsSendMessageModalOpen(true);
    }
  };

  const handleSendMessage = (message: string, file?: File) => {
    if (selectedContact) {
      // Atualizar o último contato com a nova mensagem
      setContacts(contacts.map(contact => 
        contact.id === selectedContact.id
          ? {
              ...contact,
              lastMessage: message,
              lastMessageDate: new Date().toISOString().split('T')[0]
            }
          : contact
      ));
      
      // Aqui você implementaria a lógica real de envio da mensagem
      console.log('Enviando mensagem para:', selectedContact.name);
      console.log('Mensagem:', message);
      if (file) {
        console.log('Arquivo anexado:', file.name);
      }
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery) ||
    contact.group.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[#E9EDEF] text-2xl font-medium">Contatos</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar contatos..."
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
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-[#00A884] text-[#202C33] rounded-lg hover:bg-[#00A884]/90 transition-colors"
            >
              <UserPlus className="w-5 h-5" />
              <span className="text-sm font-medium">Adicionar Contato</span>
            </button>
            <button 
              onClick={() => navigate('/contacts/import')}
              className="flex items-center space-x-2 px-4 py-2 text-[#E9EDEF] bg-[#2A373F] rounded-lg hover:bg-[#2A373F]/80 transition-colors"
            >
              <Upload className="w-5 h-5" />
              <span className="text-sm">Importar</span>
            </button>
            <button 
              onClick={() => navigate('/contacts/lists')}
              className="flex items-center space-x-2 px-4 py-2 text-[#E9EDEF] bg-[#2A373F] rounded-lg hover:bg-[#2A373F]/80 transition-colors"
            >
              <ListPlus className="w-5 h-5" />
              <span className="text-sm">Listas</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 text-[#E9EDEF] bg-[#2A373F] rounded-lg hover:bg-[#2A373F]/80 transition-colors">
              <Download className="w-5 h-5" />
              <span className="text-sm">Exportar</span>
            </button>
          </div>
          {selectedContacts.length > 0 && (
            <button 
              onClick={handleDeleteSelected}
              className="flex items-center space-x-2 px-4 py-2 text-[#EF4444] hover:text-[#EF4444]/80 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              <span className="text-sm">Excluir Selecionados ({selectedContacts.length})</span>
            </button>
          )}
        </div>

        {/* Contacts Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A373F]">
                <th className="px-4 py-3 w-[48px]">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#00A884] rounded border-[#8696A0] focus:ring-[#00A884] bg-[#202C33]"
                      checked={selectedContacts.length === contacts.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedContacts(contacts.map(c => c.id));
                        } else {
                          setSelectedContacts([]);
                        }
                      }}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#8696A0]">Nome</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#8696A0]">Telefone</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#8696A0]">Grupo</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#8696A0]">Última Mensagem</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#8696A0]">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="border-b border-[#2A373F] hover:bg-[#2A373F] transition-colors group"
                >
                  <td className="px-4 py-3 w-[48px]">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-[#00A884] rounded border-[#8696A0] focus:ring-[#00A884] bg-[#202C33]"
                        checked={selectedContacts.includes(contact.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedContacts([...selectedContacts, contact.id]);
                          } else {
                            setSelectedContacts(selectedContacts.filter(id => id !== contact.id));
                          }
                        }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-[#00A884] flex items-center justify-center text-[#202C33] font-medium">
                        {contact.name.charAt(0)}
                      </div>
                      <span className="text-[#E9EDEF]">{contact.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#8696A0]">{contact.phone}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs font-medium bg-[#2A373F] text-[#00A884] rounded-full">
                      {contact.group}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {contact.lastMessage ? (
                      <div>
                        <p className="text-[#E9EDEF] text-sm">{contact.lastMessage}</p>
                        <p className="text-[#8696A0] text-xs mt-1">{contact.lastMessageDate}</p>
                      </div>
                    ) : (
                      <span className="text-[#8696A0] text-sm">Nenhuma mensagem</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <ActionsMenu
                      onEdit={() => handleEditContact(contact.id)}
                      onDelete={() => handleDeleteContact(contact.id)}
                      onMessage={() => handleMessageContact(contact.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AddContactModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddContact}
      />
      
      <EditContactModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedContact(null);
        }}
        onSave={handleSaveEdit}
        contact={selectedContact}
      />

      <SendMessageModal
        isOpen={isSendMessageModalOpen}
        onClose={() => {
          setIsSendMessageModalOpen(false);
          setSelectedContact(null);
        }}
        onSend={handleSendMessage}
        contact={selectedContact}
      />
    </div>
  );
};

export default Contacts; 