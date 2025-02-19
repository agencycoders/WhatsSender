import React, { useState } from 'react';
import { Smile, Paperclip, Mic, Send } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isOutgoing: boolean;
  status: 'sent' | 'delivered' | 'read';
}

interface ChatInterfaceProps {
  contact: {
    name: string;
    avatar?: string;
    status: string;
  };
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ contact }) => {
  const { theme } = useTheme();
  const isDark = theme.mode === 'dark';
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! How can I help you today?',
      timestamp: '12:00',
      isOutgoing: false,
      status: 'read'
    },
    {
      id: '2',
      content: 'I have a question about your services.',
      timestamp: '12:01',
      isOutgoing: true,
      status: 'read'
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOutgoing: true,
      status: 'sent'
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isOutgoing ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[65%] rounded-lg p-2 relative ${
                msg.isOutgoing
                  ? isDark
                    ? 'bg-whatsapp-message-out-dark text-white'
                    : 'bg-whatsapp-message-out text-gray-800'
                  : isDark
                  ? 'bg-whatsapp-message-in-dark text-white'
                  : 'bg-whatsapp-message-in text-gray-800'
              }`}
              style={{
                clipPath: msg.isOutgoing
                  ? 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)'
                  : 'polygon(0 0, 100% 0, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
              }}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              <div className="flex items-center justify-end space-x-1 mt-1">
                <span className="text-xs opacity-70">{msg.timestamp}</span>
                {msg.isOutgoing && (
                  <svg
                    viewBox="0 0 16 11"
                    height="11"
                    width="16"
                    className={`${
                      msg.status === 'read' ? 'text-blue-500' : 'text-gray-500'
                    }`}
                  >
                    <path
                      d="M11.071.653a.5.5 0 0 0-.742.001L6.672 4.796l-1.001-1.2a.5.5 0 1 0-.77.642l1.385 1.66a.5.5 0 0 0 .77 0L11.071 1.4a.5.5 0 0 0 0-.747z"
                      fill="currentColor"
                    />
                    <path
                      d="M15.071.653a.5.5 0 0 0-.742.001L10.672 4.796l-1.001-1.2a.5.5 0 1 0-.77.642l1.385 1.66a.5.5 0 0 0 .77 0L15.071 1.4a.5.5 0 0 0 0-.747z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className={`p-4 ${isDark ? 'bg-whatsapp-header-dark' : 'bg-whatsapp-header'}`}>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <Smile className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <Paperclip className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
          <div className="flex-1 relative">
            <textarea
              rows={1}
              placeholder="Type a message"
              className={`w-full py-2 px-4 rounded-lg resize-none ${
                isDark
                  ? 'bg-whatsapp-message-in-dark text-white placeholder-gray-400'
                  : 'bg-white text-gray-900 placeholder-gray-500'
              } focus:outline-none`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          {message.trim() ? (
            <button
              onClick={handleSendMessage}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Send className="w-6 h-6 text-whatsapp dark:text-whatsapp-light" />
            </button>
          ) : (
            <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              <Mic className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface; 