import React, { useState } from 'react';
import { Send, Upload, Clock, Search, Filter, MoreVertical, AlertCircle, Users, ChevronDown } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  recipients: number;
  status: 'scheduled' | 'sending' | 'sent' | 'failed';
  scheduledFor?: string;
  sentAt?: string;
}

interface ContactList {
  id: string;
  name: string;
  count: number;
  description?: string;
}

const Messages: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [isContactListOpen, setIsContactListOpen] = useState(false);
  const [selectedLists, setSelectedLists] = useState<string[]>([]);

  // Mock de listas de contatos
  const contactLists: ContactList[] = [
    {
      id: '1',
      name: 'Clientes Ativos',
      count: 150,
      description: 'Clientes que fizeram compras nos últimos 30 dias'
    },
    {
      id: '2',
      name: 'Leads Quentes',
      count: 75,
      description: 'Leads que demonstraram alto interesse'
    },
    {
      id: '3',
      name: 'Newsletter',
      count: 500,
      description: 'Inscritos na newsletter'
    }
  ];

  const [messages] = useState<Message[]>([
    {
      id: '1',
      content: 'Olá! Temos uma promoção especial para você!',
      recipients: 150,
      status: 'sent',
      sentAt: '2024-03-15 14:30'
    },
    {
      id: '2',
      content: 'Não perca nossa Black Friday!',
      recipients: 300,
      status: 'scheduled',
      scheduledFor: '2024-03-20 10:00'
    },
    {
      id: '3',
      content: 'Feliz Aniversário! 🎉',
      recipients: 50,
      status: 'failed',
      sentAt: '2024-03-14 09:15'
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim() || selectedLists.length === 0) return;
    
    // Aqui você implementaria a lógica de envio
    // Incluindo o envio para as listas selecionadas
    
    setMessage('');
    setSelectedFile(null);
    setIsScheduled(false);
    setScheduleDate('');
    setScheduleTime('');
    setSelectedLists([]);
  };

  const handleListSelect = (listId: string) => {
    setSelectedLists(prev => {
      if (prev.includes(listId)) {
        return prev.filter(id => id !== listId);
      }
      return [...prev, listId];
    });
  };

  const getSelectedListsCount = () => {
    return selectedLists.reduce((total, listId) => {
      const list = contactLists.find(l => l.id === listId);
      return total + (list?.count || 0);
    }, 0);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const getStatusColor = (status: Message['status']) => {
    switch (status) {
      case 'sent':
        return 'text-green-500';
      case 'scheduled':
        return 'text-blue-500';
      case 'sending':
        return 'text-yellow-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[#E9EDEF] text-2xl font-medium">Mensagens</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar mensagens..."
              className="bg-[#202C33] text-[#E9EDEF] px-10 py-2 rounded-lg border border-[#2A373F] focus:outline-none focus:border-[#00A884] w-64 placeholder-[#8696A0]"
            />
            <Search className="w-5 h-5 text-[#8696A0] absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <button className="p-2 text-[#8696A0] hover:text-[#00A884] transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#2A373F] mb-6">
        <button
          className={`px-6 py-3 font-medium transition-colors relative ${
            activeTab === 'new'
              ? 'text-[#00A884]'
              : 'text-[#8696A0] hover:text-[#E9EDEF]'
          }`}
          onClick={() => setActiveTab('new')}
        >
          Nova Mensagem
          {activeTab === 'new' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00A884]" />
          )}
        </button>
        <button
          className={`px-6 py-3 font-medium transition-colors relative ${
            activeTab === 'history'
              ? 'text-[#00A884]'
              : 'text-[#8696A0] hover:text-[#E9EDEF]'
          }`}
          onClick={() => setActiveTab('history')}
        >
          Histórico
          {activeTab === 'history' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00A884]" />
          )}
        </button>
      </div>

      {activeTab === 'new' ? (
        <div className="bg-[#202C33] rounded-xl p-6 border border-[#2A373F]">
          {/* Lista de Contatos Selector */}
          <div className="mb-6">
            <label className="block text-[#E9EDEF] text-sm font-medium mb-2">
              Selecionar Listas de Contatos
            </label>
            <div className="relative">
              <button
                onClick={() => setIsContactListOpen(!isContactListOpen)}
                className="w-full px-4 py-3 text-left bg-[#2A373F] text-[#E9EDEF] rounded-lg flex items-center justify-between hover:bg-[#2A373F]/80 transition-colors border border-[#2A373F] focus:border-[#00A884]"
              >
                <span className="text-sm">
                  {selectedLists.length > 0
                    ? `${selectedLists.length} lista(s) selecionada(s) - ${getSelectedListsCount()} contatos`
                    : 'Selecione as listas de contatos'}
                </span>
                <ChevronDown className="w-5 h-5 text-[#8696A0]" />
              </button>

              {isContactListOpen && (
                <div className="absolute z-10 w-full mt-1 bg-[#2A373F] border border-[#2A373F] rounded-lg shadow-lg">
                  <div className="p-2 max-h-60 overflow-y-auto">
                    {contactLists.map(list => (
                      <label
                        key={list.id}
                        className="flex items-start p-3 hover:bg-[#202C33] rounded-lg cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedLists.includes(list.id)}
                          onChange={() => handleListSelect(list.id)}
                          className="mt-1 w-4 h-4 text-[#00A884] rounded border-[#8696A0] focus:ring-[#00A884] bg-[#202C33]"
                        />
                        <div className="ml-3">
                          <div className="text-[#E9EDEF] text-sm font-medium">{list.name}</div>
                          <div className="text-[#8696A0] text-xs mt-1">
                            {list.description}
                          </div>
                          <div className="text-[#8696A0] text-xs mt-0.5">
                            {list.count} contatos
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Campo de Mensagem */}
          <div className="mb-6">
            <label className="block text-[#E9EDEF] text-sm font-medium mb-2">
              Sua Mensagem
            </label>
            <textarea
              rows={4}
              placeholder="Digite sua mensagem aqui..."
              className="w-full p-3 bg-[#2A373F] text-[#E9EDEF] placeholder-[#8696A0] rounded-lg border border-[#2A373F] focus:outline-none focus:border-[#00A884] resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <input
                type="file"
                id="file-attachment"
                className="hidden"
                onChange={handleFileSelect}
              />
              <label
                htmlFor="file-attachment"
                className="flex items-center space-x-2 px-4 py-2 bg-[#2A373F] text-[#E9EDEF] rounded-lg hover:bg-[#2A373F]/80 transition-colors cursor-pointer border border-[#2A373F]"
              >
                <Upload className="w-5 h-5" />
                <span className="text-sm">Anexar Arquivo</span>
              </label>
              {selectedFile && (
                <span className="text-[#8696A0] text-sm">
                  {selectedFile.name}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isScheduled}
                  onChange={(e) => setIsScheduled(e.target.checked)}
                  className="w-4 h-4 text-[#00A884] rounded border-[#8696A0] focus:ring-[#00A884] bg-[#202C33]"
                />
                <span className="text-[#E9EDEF] text-sm">Agendar Envio</span>
              </label>
              {isScheduled && (
                <div className="flex items-center space-x-2">
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="px-3 py-2 bg-[#2A373F] text-[#E9EDEF] rounded-lg border border-[#2A373F] focus:outline-none focus:border-[#00A884]"
                  />
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="px-3 py-2 bg-[#2A373F] text-[#E9EDEF] rounded-lg border border-[#2A373F] focus:outline-none focus:border-[#00A884]"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              disabled={!message.trim() || selectedLists.length === 0}
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-colors ${
                message.trim() && selectedLists.length > 0
                  ? 'bg-[#00A884] hover:bg-[#00A884]/90 text-[#202C33]'
                  : 'bg-[#2A373F] text-[#8696A0] cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
              <span>{isScheduled ? 'Agendar' : 'Enviar'}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-[#202C33] rounded-xl p-4 border border-[#2A373F] hover:bg-[#2A373F] transition-colors group"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-[#E9EDEF] font-medium mb-2">{msg.content}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center space-x-1 text-[#8696A0]">
                      <Users className="w-4 h-4" />
                      <span>{msg.recipients} destinatários</span>
                    </span>
                    {msg.status === 'scheduled' ? (
                      <span className="flex items-center space-x-1 text-[#8696A0]">
                        <Clock className="w-4 h-4" />
                        <span>Agendado para {msg.scheduledFor}</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1 text-[#8696A0]">
                        <Clock className="w-4 h-4" />
                        <span>Enviado em {msg.sentAt}</span>
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
                    msg.status === 'sent'
                      ? 'bg-[#00A884]/10 text-[#00A884]'
                      : msg.status === 'scheduled'
                      ? 'bg-[#2563EB]/10 text-[#2563EB]'
                      : 'bg-[#EF4444]/10 text-[#EF4444]'
                  }`}>
                    {msg.status === 'failed' && <AlertCircle className="w-4 h-4" />}
                    <span>
                      {msg.status === 'sent' ? 'Enviado' :
                       msg.status === 'scheduled' ? 'Agendado' : 'Falhou'}
                    </span>
                  </span>
                  <button className="p-1 text-[#8696A0] hover:text-[#E9EDEF] opacity-0 group-hover:opacity-100 transition-all">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages; 