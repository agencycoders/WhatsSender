import React, { useState, useEffect } from 'react';
import { X, ListPlus, Info } from 'lucide-react';

interface ContactList {
  id?: string;
  name: string;
  description: string;
}

interface CreateListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (listData: ContactList) => void;
  initialData?: ContactList;
}

const CreateListModal: React.FC<CreateListModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData
}) => {
  const [formData, setFormData] = useState<ContactList>({
    name: '',
    description: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', description: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#202C33] rounded-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-[#2A373F]">
          <h2 className="text-[#E9EDEF] text-lg font-medium">
            {initialData ? 'Editar Lista' : 'Nova Lista'}
          </h2>
          <button
            onClick={onClose}
            className="text-[#8696A0] hover:text-[#E9EDEF] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-[#E9EDEF] text-sm font-medium mb-1">
              Nome da Lista
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ListPlus className="h-5 w-5 text-[#8696A0]" />
              </div>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#2A373F] text-[#E9EDEF] pl-10 pr-3 py-2 rounded-lg border border-[#2A373F] focus:outline-none focus:border-[#00A884] placeholder-[#8696A0]"
                placeholder="Nome da lista de contatos"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[#E9EDEF] text-sm font-medium mb-1">
              Descrição
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Info className="h-5 w-5 text-[#8696A0]" />
              </div>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-[#2A373F] text-[#E9EDEF] pl-10 pr-3 py-2 rounded-lg border border-[#2A373F] focus:outline-none focus:border-[#00A884] placeholder-[#8696A0] resize-none h-24"
                placeholder="Descrição da lista"
                required
              />
            </div>
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
              className="px-4 py-2 bg-[#00A884] text-[#202C33] rounded-lg hover:bg-[#00A884]/90 transition-colors font-medium"
            >
              {initialData ? 'Salvar Alterações' : 'Criar Lista'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListModal; 