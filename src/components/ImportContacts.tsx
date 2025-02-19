import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const ImportContacts: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'upload' | 'map' | 'review' | 'import'>('upload');
  const [file, setFile] = useState<File | null>(null);

  const steps = [
    { id: 'upload', label: 'Upload do Arquivo' },
    { id: 'map', label: 'Mapear Colunas' },
    { id: 'review', label: 'Revisar' },
    { id: 'import', label: 'Importar' }
  ];

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'text/csv' || droppedFile.name.endsWith('.xls') || droppedFile.name.endsWith('.xlsx'))) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-medium text-[#E9EDEF] mb-6">Importar Contatos</h1>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`flex-1 text-center ${
                steps.findIndex(s => s.id === currentStep) >= index
                  ? 'text-[#00A884]'
                  : 'text-[#8696A0]'
              }`}
            >
              {step.label}
            </div>
          ))}
        </div>
        <div className="h-1 bg-[#2A373F] rounded-full">
          <div 
            className="h-1 bg-[#00A884] rounded-full transition-all duration-300"
            style={{ width: `${(steps.findIndex(s => s.id === currentStep) + 1) * 25}%` }}
          />
        </div>
      </div>

      {/* Upload Area */}
      <div 
        className="bg-[#202C33] border-2 border-dashed border-[#2A373F] rounded-xl p-8"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-[#2A373F] rounded-full flex items-center justify-center mb-4">
            <Upload className="w-8 h-8 text-[#00A884]" />
          </div>
          <h3 className="text-[#E9EDEF] text-lg font-medium mb-2">
            Arraste seu arquivo aqui ou clique para enviar
          </h3>
          <p className="text-[#8696A0] text-sm mb-6">
            Suporta arquivos XLS e CSV
          </p>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".csv,.xls,.xlsx"
            onChange={handleFileInput}
          />
          <label
            htmlFor="file-upload"
            className="px-6 py-3 bg-[#00A884] text-[#111B21] rounded-lg hover:bg-[#00A884]/90 transition-colors cursor-pointer font-medium"
          >
            Selecionar Arquivo
          </label>
        </div>
      </div>

      {/* File Info */}
      {file && (
        <div className="mt-4 p-4 bg-[#202C33] rounded-lg border border-[#2A373F]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#2A373F] rounded-lg flex items-center justify-center">
                <Upload className="w-5 h-5 text-[#00A884]" />
              </div>
              <div>
                <p className="text-[#E9EDEF] text-sm font-medium">{file.name}</p>
                <p className="text-[#8696A0] text-xs">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              onClick={() => setCurrentStep('map')}
              className="px-4 py-2 bg-[#00A884] text-[#111B21] rounded-lg hover:bg-[#00A884]/90 transition-colors font-medium"
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportContacts; 