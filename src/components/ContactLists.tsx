import React, { useState } from 'react';
import { ListPlus, Search, Filter, Users, Trash2, Edit2, MoreVertical } from 'lucide-react';
import ActionsMenu from './ActionsMenu';
import CreateListModal from './CreateListModal';
import ManageListContactsModal from './ManageListContactsModal';
import type { Contact } from '../types';

const availableContacts: Contact[] = [
  { id: '1', name: 'João Silva', phone: '+55 11 99999-9999' },
  { id: '2', name: 'Maria Oliveira', phone: '+55 11 98888-8888' },
  { id: '3', name: 'Pedro Santos', phone: '+55 11 97777-7777' }
];

interface ContactList {
  id: string;
  name: string;
  description: string;
  count: number;
  createdAt: string;
  contacts: Contact[];
}

const ContactLists: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isManageContactsModalOpen, setIsManageContactsModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<ContactList | null>(null);
  const [lists, setLists] = useState<ContactList[]>([
    {
      id: '1',
      name: 'Clientes Ativos',
      description: 'Lista de clientes atualmente ativos',
      count: 45,
      createdAt: '2024-03-15',
      contacts: [
        { id: '1', name: 'João Silva', phone: '+55 11 99999-9999' },
        { id: '2', name: 'Maria Oliveira', phone: '+55 11 98888-8888' }
      ]
    },
    {
      id: '2',
      name: 'Leads Quentes',
      description: 'Potenciais clientes interessados',
      count: 28,
      createdAt: '2024-03-14',
      contacts: [
        { id: '3', name: 'Pedro Santos', phone: '+55 11 97777-7777' }
      ]
    },
    {
      id: '3',
      name: 'Newsletter',
      description: 'Inscritos na newsletter',
      count: 150,
      createdAt: '2024-03-13',
      contacts: []
    }
  ]);

  const handleCreateList = (listData: { name: string; description: string }) => {
    const newList: ContactList = {
      id: Date.now().toString(),
      ...listData,
      count: 0,
      createdAt: new Date().toISOString().split('T')[0],
      contacts: []
    };
    setLists([newList, ...lists]);
  };

  const handleEditList = (listId: string) => {
    const list = lists.find(l => l.id === listId);
    if (list) {
      setSelectedList(list);
      setIsCreateModalOpen(true);
    }
  };

  const handleUpdateList = (listData: { name: string; description: string }) => {
    if (selectedList) {
      setLists(lists.map(list => 
        list.id === selectedList.id
          ? { ...list, ...listData }
          : list
      ));
      setSelectedList(null);
    }
  };

  const handleDeleteList = (listId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta lista?')) {
      setLists(lists.filter(list => list.id !== listId));
    }
  };

  const handleManageContacts = (listId: string) => {
    const list = lists.find(l => l.id === listId);
    if (list) {
      setSelectedList(list);
      setIsManageContactsModalOpen(true);
    }
  };

  const handleAddContactsToList = (contactIds: string[]) => {
    if (selectedList) {
      const updatedList = lists.map(list => {
        if (list.id === selectedList.id) {
          const newContacts = contactIds.map(id => {
            const contact = availableContacts.find((c: Contact) => c.id === id);
            return contact!;
          });
          return {
            ...list,
            contacts: [...list.contacts, ...newContacts],
            count: list.contacts.length + newContacts.length
          };
        }
        return list;
      });
      setLists(updatedList);
    }
  };

  const handleRemoveContactsFromList = (contactIds: string[]) => {
    if (selectedList) {
      const updatedList = lists.map(list => {
        if (list.id === selectedList.id) {
          const filteredContacts = list.contacts.filter(
            contact => !contactIds.includes(contact.id)
          );
          return {
            ...list,
            contacts: filteredContacts,
            count: filteredContacts.length
          };
        }
        return list;
      });
      setLists(updatedList);
    }
  };

  const filteredLists = lists.filter(list =>
    list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    list.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h1 className="text-[#E9EDEF] text-2xl font-medium">Listas de Contatos</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar listas..."
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

      {/* Main Content */}
      <div className="flex-1 bg-[#202C33] rounded-xl border border-[#2A373F] flex flex-col min-h-0">
        {/* Action Bar */}
        <div className="p-4 border-b border-[#2A373F] flex items-center justify-between flex-shrink-0">
          <button 
            onClick={() => {
              setSelectedList(null);
              setIsCreateModalOpen(true);
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-[#00A884] text-[#202C33] rounded-lg hover:bg-[#00A884]/90 transition-colors"
          >
            <ListPlus className="w-5 h-5" />
            <span className="text-sm font-medium">Nova Lista</span>
          </button>
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-[#202C33] z-10">
              <tr className="text-left [&>th]:p-4 [&>th]:font-medium [&>th]:text-sm [&>th]:text-[#8696A0]">
                <th className="w-[25%] min-w-[200px]">Nome</th>
                <th className="w-[45%] min-w-[300px]">Descrição</th>
                <th className="w-[15%] min-w-[100px]">Contatos</th>
                <th className="w-[15%] min-w-[100px]">Data de Criação</th>
                <th className="w-[100px]"></th>
              </tr>
            </thead>
            <tbody>
              {filteredLists.map((list) => (
                <tr
                  key={list.id}
                  className="border-b border-[#2A373F] hover:bg-[#2A373F] transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center space-x-3 max-w-full">
                      <div className="w-8 h-8 rounded-lg bg-[#00A884] flex items-center justify-center text-[#202C33] flex-shrink-0">
                        <Users className="w-5 h-5" />
                      </div>
                      <span className="text-[#E9EDEF] font-medium truncate">{list.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-[#8696A0] truncate max-w-full">{list.description}</div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-[#2A373F] text-[#00A884] rounded-full">
                      {list.count} contatos
                    </span>
                  </td>
                  <td className="p-4 text-[#8696A0] whitespace-nowrap">
                    {new Date(list.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end">
                      <ActionsMenu
                        onEdit={() => handleEditList(list.id)}
                        onDelete={() => handleDeleteList(list.id)}
                        onMessage={() => handleManageContacts(list.id)}
                        messageLabel="Gerenciar Contatos"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CreateListModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setSelectedList(null);
        }}
        onSubmit={selectedList ? handleUpdateList : handleCreateList}
        initialData={selectedList || undefined}
      />

      {selectedList && (
        <ManageListContactsModal
          isOpen={isManageContactsModalOpen}
          onClose={() => {
            setIsManageContactsModalOpen(false);
            setSelectedList(null);
          }}
          listId={selectedList.id}
          listName={selectedList.name}
          contacts={selectedList.contacts}
          onAddContacts={handleAddContactsToList}
          onRemoveContacts={handleRemoveContactsFromList}
        />
      )}
    </div>
  );
};

export default ContactLists; 