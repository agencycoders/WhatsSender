import React, { useState, useEffect } from 'react';
import { X, Search, UserPlus, Users } from 'lucide-react';
import type { Contact } from '../types';

interface ManageListContactsModalProps {
  isOpen: boolean;
  onClose: () => void;
  listName: string;
  listId: string;
  contacts: Contact[];
  onAddContacts: (contactIds: string[]) => void;
  onRemoveContacts: (contactIds: string[]) => void;
}

const ManageListContactsModal: React.FC<ManageListContactsModalProps> = ({
  isOpen,
  onClose,
  listName,
  listId,
  contacts,
  onAddContacts,
  onRemoveContacts
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [availableContacts] = useState<Contact[]>([
    { id: '1', name: 'João Silva', phone: '+55 11 99999-9999' },
    { id: '2', name: 'Maria Oliveira', phone: '+55 11 98888-8888' },
    { id: '3', name: 'Pedro Santos', phone: '+55 11 97777-7777' }
  ]);

  const filteredContacts = availableContacts.filter(
    contact => !contacts.find(c => c.id === contact.id) &&
    (contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     contact.phone.includes(searchQuery))
  );

  const handleAddContacts = () => {
    onAddContacts(selectedContacts);
    setSelectedContacts([]);
  };

  const handleRemoveContacts = (contactIds: string[]) => {
    onRemoveContacts(contactIds);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#202C33] rounded-xl w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-[#2A373F]">
          <div>
            <h2 className="text-[#E9EDEF] text-lg font-medium">Gerenciar Contatos</h2>
            <p className="text-[#8696A0] text-sm">Lista: {listName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#8696A0] hover:text-[#E9EDEF] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 flex gap-4 p-4 min-h-0">
          {/* Contatos Disponíveis */}
          <div className="flex-1 flex flex-col bg-[#2A373F] rounded-lg overflow-hidden">
            <div className="p-4 border-b border-[#202C33]">
              <h3 className="text-[#E9EDEF] font-medium mb-3">Adicionar Contatos</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar contatos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#202C33] text-[#E9EDEF] px-10 py-2 rounded-lg border border-[#202C33] focus:outline-none focus:border-[#00A884] placeholder-[#8696A0]"
                />
                <Search className="w-5 h-5 text-[#8696A0] absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center p-2 hover:bg-[#202C33] rounded-lg group"
                >
                  <input
                    type="checkbox"
                    checked={selectedContacts.includes(contact.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedContacts([...selectedContacts, contact.id]);
                      } else {
                        setSelectedContacts(selectedContacts.filter(id => id !== contact.id));
                      }
                    }}
                    className="mr-3"
                  />
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-8 h-8 rounded-full bg-[#00A884] flex items-center justify-center text-[#202C33]">
                      {contact.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[#E9EDEF]">{contact.name}</p>
                      <p className="text-[#8696A0] text-sm">{contact.phone}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {selectedContacts.length > 0 && (
              <div className="p-4 border-t border-[#202C33]">
                <button
                  onClick={handleAddContacts}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-[#00A884] text-[#202C33] rounded-lg hover:bg-[#00A884]/90 transition-colors"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Adicionar Selecionados ({selectedContacts.length})</span>
                </button>
              </div>
            )}
          </div>

          {/* Contatos na Lista */}
          <div className="flex-1 flex flex-col bg-[#2A373F] rounded-lg overflow-hidden">
            <div className="p-4 border-b border-[#202C33]">
              <div className="flex items-center justify-between">
                <h3 className="text-[#E9EDEF] font-medium">Contatos na Lista</h3>
                <span className="px-2 py-1 text-xs font-medium bg-[#202C33] text-[#00A884] rounded-full">
                  {contacts.length} contatos
                </span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center p-2 hover:bg-[#202C33] rounded-lg group"
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-8 h-8 rounded-full bg-[#00A884] flex items-center justify-center text-[#202C33]">
                      {contact.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[#E9EDEF]">{contact.name}</p>
                      <p className="text-[#8696A0] text-sm">{contact.phone}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveContacts([contact.id])}
                    className="p-2 text-[#8696A0] hover:text-[#EF4444] opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageListContactsModal; 