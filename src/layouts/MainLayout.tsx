import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Users, Settings as SettingsIcon, ChevronRight, UserCog } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-[22px] h-[22px]" />,
      path: '/'
    },
    {
      label: 'Mensagens',
      icon: <MessageSquare className="w-[22px] h-[22px]" />,
      path: '/messages'
    },
    {
      label: 'Contatos',
      icon: <Users className="w-[22px] h-[22px]" />,
      path: '/contacts'
    },
    {
      label: 'Usuários',
      icon: <UserCog className="w-[22px] h-[22px]" />,
      path: '/users'
    },
    {
      label: 'Configurações',
      icon: <SettingsIcon className="w-[22px] h-[22px]" />,
      path: '/settings'
    }
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className={`flex-shrink-0 h-full transition-all duration-300 ease-in-out relative ${
        isSidebarOpen ? 'w-[280px]' : 'w-[72px]'
      }`}>
        <div className="flex flex-col h-full bg-whatsapp-sidebar border-r border-border">
          {/* Collapse Button */}
          <button
            onClick={toggleSidebar}
            className="absolute -right-3 top-7 w-6 h-6 bg-surface border border-border rounded-full flex items-center justify-center text-text-secondary hover:text-whatsapp transition-colors z-50 hover:bg-border group"
          >
            <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Logo */}
          <div className="py-5 px-4 border-b border-border">
            <div className="flex items-center">
              <div className={`w-8 h-8 bg-whatsapp rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                isSidebarOpen ? '' : 'mx-auto'
              }`}>
                <MessageSquare className="w-5 h-5 text-surface" />
              </div>
              <span className={`ml-3 text-text-primary text-base font-medium tracking-wide transition-all duration-300 ${
                isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 hidden'
              }`}>
                WhatsApp API
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <div className={`space-y-0.5 ${isSidebarOpen ? 'px-2' : 'px-1'}`}>
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center rounded-lg transition-all duration-200 group relative ${
                    isSidebarOpen ? 'px-3 py-2.5' : 'p-2 justify-center'
                  } ${
                    location.pathname === item.path
                      ? 'text-whatsapp bg-surface'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                  }`}
                >
                  <div className={`flex items-center space-x-3 ${!isSidebarOpen ? 'justify-center space-x-0' : ''}`}>
                    {item.icon}
                    <span className={`text-[15px] font-normal tracking-wide transition-all duration-300 ${
                      isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 hidden'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  {!isSidebarOpen && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-surface text-text-primary text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </nav>

          {/* User Profile */}
          <div className={`p-4 border-t border-border transition-all duration-300 ${
            isSidebarOpen ? '' : 'flex justify-center'
          }`}>
            <div className={`flex items-center ${isSidebarOpen ? '' : 'justify-center'}`}>
              <div className="w-9 h-9 rounded-full bg-surface flex items-center justify-center flex-shrink-0">
                <span className="text-text-primary text-sm font-medium">JS</span>
              </div>
              <div className={`transition-all duration-300 ${
                isSidebarOpen ? 'opacity-100 translate-x-0 ml-3' : 'opacity-0 translate-x-10 hidden'
              }`}>
                <h3 className="text-text-primary text-[15px] font-medium truncate">João Silva</h3>
                <p className="text-text-secondary text-[13px] truncate">Administrador</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative bg-background">
        <div className="absolute inset-0 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout; 