import React, { useState } from 'react';
import { X, Send, Paperclip } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  phone: string;
}

interface SendMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (message: string, file?: File) => void;
  contact: Contact | null;
}

const SendMessageModal: React.FC<SendMessageModalProps> = ({ isOpen, onClose, onSend, contact }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message, file || undefined);
      setMessage('');
      setFile(null);
      onClose();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  if (!isOpen || !contact) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#202C33] rounded-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-[#2A373F]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#00A884] flex items-center justify-center text-[#202C33] font-medium">
              {contact.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-[#E9EDEF] text-lg font-medium">{contact.name}</h2>
              <p className="text-[#8696A0] text-sm">{contact.phone}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#8696A0] hover:text-[#E9EDEF] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <textarea
              placeholder="Digite sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-32 bg-[#2A373F] text-[#E9EDEF] px-3 py-2 rounded-lg border border-[#2A373F] focus:outline-none focus:border-[#00A884] placeholder-[#8696A0] resize-none"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="file"
                id="file-attachment"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-attachment"
                className="flex items-center space-x-2 px-3 py-2 text-[#E9EDEF] bg-[#2A373F] rounded-lg hover:bg-[#2A373F]/80 transition-colors cursor-pointer"
              >
                <Paperclip className="w-5 h-5" />
                <span className="text-sm">Anexar Arquivo</span>
              </label>
              {file && (
                <span className="text-[#8696A0] text-sm truncate max-w-[150px]">
                  {file.name}
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={!message.trim()}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                message.trim()
                  ? 'bg-[#00A884] text-[#202C33] hover:bg-[#00A884]/90'
                  : 'bg-[#2A373F] text-[#8696A0] cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
              <span>Enviar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendMessageModal; 