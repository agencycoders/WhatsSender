import React, { useState, useRef, useEffect } from 'react';
import { Edit2, Trash2, MoreVertical, MessageSquare } from 'lucide-react';

interface ActionsMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  onMessage: () => void;
  messageLabel?: string;
}

const ActionsMenu: React.FC<ActionsMenuProps> = ({ onEdit, onDelete, onMessage, messageLabel = 'Enviar Mensagem' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState<'right' | 'left'>('right');
  const [menuTop, setMenuTop] = useState<'down' | 'up'>('down');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const checkMenuPosition = () => {
      if (menuRef.current) {
        const rect = menuRef.current.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Verifica posição horizontal
        if (rect.right + 192 > windowWidth) {
          setMenuPosition('left');
        } else {
          setMenuPosition('right');
        }

        // Verifica posição vertical
        if (rect.bottom + 144 > windowHeight) {
          setMenuTop('up');
        } else {
          setMenuTop('down');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', checkMenuPosition);
    if (isOpen) {
      checkMenuPosition();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', checkMenuPosition);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-[#8696A0] hover:text-[#E9EDEF] transition-colors rounded-lg"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen && (
        <div 
          className={`fixed ${menuPosition === 'right' ? 'translate-x-0' : '-translate-x-48'} 
            ${menuTop === 'down' ? 'translate-y-1' : '-translate-y-[144px]'} 
            w-48 bg-[#202C33] rounded-lg shadow-lg border border-[#2A373F] z-[9999]`}
          style={{
            top: menuTop === 'down' ? menuRef.current?.getBoundingClientRect().bottom : 'auto',
            left: menuRef.current?.getBoundingClientRect().left
          }}
        >
          <div className="py-1">
            <button
              onClick={() => {
                onEdit();
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-[#E9EDEF] hover:bg-[#2A373F] transition-colors flex items-center space-x-2"
            >
              <Edit2 className="w-4 h-4 text-[#00A884]" />
              <span>Editar</span>
            </button>
            <button
              onClick={() => {
                onMessage();
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-[#E9EDEF] hover:bg-[#2A373F] transition-colors flex items-center space-x-2"
            >
              <MessageSquare className="w-4 h-4 text-[#00A884]" />
              <span>{messageLabel}</span>
            </button>
            <button
              onClick={() => {
                onDelete();
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-[#E9EDEF] hover:bg-[#2A373F] transition-colors flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4 text-[#EF4444]" />
              <span>Excluir</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionsMenu; 