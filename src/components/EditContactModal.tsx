import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  phone: string;
  group: string;
}

interface EditContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contact: Contact) => void;
  contact: Contact | null;
}

const EditContactModal: React.FC<EditContactModalProps> = ({ isOpen, onClose, onSave, contact }) => {
  const [formData, setFormData] = useState<Contact>({
    id: '',
    name: '',
    phone: '',
    group: ''
  });

  useEffect(() => {
    if (contact) {
      setFormData(contact);
    }
  }, [contact]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen || !contact) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#202C33] rounded-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-[#2A373F]">
          <h2 className="text-[#E9EDEF] text-lg font-medium">Editar Contato</h2>
          <button
            onClick={onClose}
            className="text-[#8696A0] hover:text-[#E9EDEF] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="name" className="block text-[#E9EDEF] text-sm font-medium mb-1">
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#2A373F] text-[#E9EDEF] px-3 py-2 rounded-lg border border-[#2A373F] focus:outline-none focus:border-[#00A884] placeholder-[#8696A0]"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-[#E9EDEF] text-sm font-medium mb-1">
              Telefone
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-[#2A373F] text-[#E9EDEF] px-3 py-2 rounded-lg border border-[#2A373F] focus:outline-none focus:border-[#00A884] placeholder-[#8696A0]"
              required
            />
          </div>

          <div>
            <label htmlFor="group" className="block text-[#E9EDEF] text-sm font-medium mb-1">
              Grupo
            </label>
            <select
              id="group"
              value={formData.group}
              onChange={(e) => setFormData({ ...formData, group: e.target.value })}
              className="w-full bg-[#2A373F] text-[#E9EDEF] px-3 py-2 rounded-lg border border-[#2A373F] focus:outline-none focus:border-[#00A884]"
            >
              <option value="Clientes Ativos">Clientes Ativos</option>
              <option value="Leads Quentes">Leads Quentes</option>
              <option value="Newsletter">Newsletter</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[#E9EDEF] bg-[#2A373F] rounded-lg hover:bg-[#2A373F]/80 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#00A884] text-[#111B21] rounded-lg hover:bg-[#00A884]/90 transition-colors font-medium"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContactModal; 