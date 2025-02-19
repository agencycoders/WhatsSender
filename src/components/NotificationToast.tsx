import React from 'react';
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { Notification } from '../hooks/useNotifications';
import { useTheme } from '../contexts/ThemeContext';

interface NotificationToastProps {
  notification: Notification;
  onClose: (id: string) => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({
  notification,
  onClose
}) => {
  const { theme } = useTheme();
  const { id, message, type } = notification;
  const isDark = theme.mode === 'dark';

  const icons = {
    success: CheckCircle2,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info
  };

  const colors = {
    success: {
      light: 'bg-whatsapp-message-out text-green-800',
      dark: 'bg-whatsapp-message-out-dark text-green-100'
    },
    error: {
      light: 'bg-red-100 text-red-800',
      dark: 'bg-red-900 text-red-100'
    },
    warning: {
      light: 'bg-yellow-100 text-yellow-800',
      dark: 'bg-yellow-900 text-yellow-100'
    },
    info: {
      light: 'bg-whatsapp-message-in text-gray-800',
      dark: 'bg-whatsapp-message-in-dark text-gray-100'
    }
  };

  const Icon = icons[type];
  const color = colors[type][isDark ? 'dark' : 'light'];

  return (
    <div
      className={`flex items-center p-4 rounded-lg shadow-message ${color} transition-all duration-300 ease-in-out max-w-[90%] ml-auto relative`}
      role="alert"
      style={{
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
      }}
    >
      <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
      <span className="flex-1 text-sm">{message}</span>
      <button
        onClick={() => onClose(id)}
        className="ml-3 p-1 rounded-full hover:bg-black/10 focus:outline-none"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
      <div className="absolute bottom-1 right-2 flex items-center space-x-1 text-xs opacity-70">
        <span>12:00</span>
        <CheckCircle2 className="w-4 h-4" />
      </div>
    </div>
  );
};

export const NotificationContainer: React.FC<{
  notifications: Notification[];
  onClose: (id: string) => void;
}> = ({ notifications, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          notification={notification}
          onClose={onClose}
        />
      ))}
    </div>
  );
};

export default NotificationToast; 