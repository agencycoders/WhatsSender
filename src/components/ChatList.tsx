import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { CheckCircle2 } from 'lucide-react';

interface Chat {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  status: 'online' | 'offline';
  lastMessageStatus?: 'sent' | 'delivered' | 'read';
}

interface ChatListProps {
  chats: Chat[];
  selectedChat?: string;
  onSelectChat: (chatId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  selectedChat,
  onSelectChat
}) => {
  const { theme } = useTheme();
  const isDark = theme.mode === 'dark';

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full flex items-center px-4 py-3 border-b ${
              isDark ? 'border-whatsapp-divider-dark' : 'border-whatsapp-divider'
            } ${
              selectedChat === chat.id
                ? isDark
                  ? 'bg-whatsapp-message-in-dark'
                  : 'bg-white'
                : isDark
                ? 'hover:bg-whatsapp-message-in-dark'
                : 'hover:bg-gray-50'
            }`}
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                {chat.avatar ? (
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-medium text-gray-600">
                    {chat.name.charAt(0)}
                  </span>
                )}
              </div>
              {chat.status === 'online' && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-whatsapp rounded-full border-2 border-white dark:border-whatsapp-sidebar-dark" />
              )}
            </div>

            {/* Chat Info */}
            <div className="flex-1 min-w-0 ml-4">
              <div className="flex items-center justify-between">
                <h3 className={`font-medium truncate ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {chat.name}
                </h3>
                <span className={`text-xs ${
                  chat.unreadCount > 0
                    ? 'text-whatsapp'
                    : isDark
                    ? 'text-gray-400'
                    : 'text-gray-500'
                }`}>
                  {chat.timestamp}
                </span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className={`text-sm truncate ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {chat.lastMessageStatus && (
                    <span className="inline-block mr-1">
                      <CheckCircle2 className={`w-4 h-4 inline ${
                        chat.lastMessageStatus === 'read'
                          ? 'text-blue-500'
                          : 'text-gray-400'
                      }`} />
                    </span>
                  )}
                  {chat.lastMessage}
                </p>
                {chat.unreadCount > 0 && (
                  <span className="ml-2 px-2 py-1 text-xs font-medium bg-whatsapp text-white rounded-full">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatList; 