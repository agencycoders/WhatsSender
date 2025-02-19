import React from 'react';
import { Users, Send, AlertCircle, Wallet } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isUp: boolean;
  };
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, trend }) => {
  return (
    <div className="bg-[#202C33] rounded-xl p-6 transition-all duration-200 hover:bg-[#2A373F] border border-[#2A373F] hover:border-[#00A884]/20">
      <div className="flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-[#8696A0] text-sm font-medium">{title}</h3>
          <div className="text-[#00A884] bg-[#00A884]/10 p-2 rounded-lg">
            {icon}
          </div>
        </div>
        <div className="flex items-end justify-between">
          <p className="text-[#E9EDEF] text-3xl font-medium tracking-tight">{value}</p>
          {trend && (
            <div className={`flex items-center space-x-1 text-sm ${
              trend.isUp ? 'text-[#00A884]' : 'text-[#EF4444]'
            }`}>
              <span>{trend.isUp ? '↑' : '↓'}</span>
              <span>{trend.value}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[#E9EDEF] text-2xl font-medium">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <select className="bg-[#202C33] text-[#E9EDEF] px-4 py-2 rounded-lg border border-[#2A373F] focus:outline-none focus:border-[#00A884]">
            <option value="today">Hoje</option>
            <option value="week">Esta Semana</option>
            <option value="month">Este Mês</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total de Números Cadastrados"
          value="96"
          icon={<Users className="w-5 h-5" />}
          trend={{ value: 12, isUp: true }}
        />
        <DashboardCard
          title="Total de Mensagens Enviadas"
          value="2/∞"
          icon={<Send className="w-5 h-5" />}
          trend={{ value: 8, isUp: true }}
        />
        <DashboardCard
          title="Total de Falhas"
          value="0"
          icon={<AlertCircle className="w-5 h-5" />}
          trend={{ value: 0, isUp: false }}
        />
        <DashboardCard
          title="Carteira"
          value="US$ 4,81"
          icon={<Wallet className="w-5 h-5" />}
          trend={{ value: 5, isUp: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Gráfico de Envios por Mês */}
        <div className="bg-[#202C33] rounded-xl p-6 border border-[#2A373F]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#E9EDEF] text-lg font-medium">Envios por Mês</h2>
            <button className="text-[#00A884] hover:text-[#00A884]/80 text-sm font-medium">
              Ver Detalhes
            </button>
          </div>
          <div className="h-64 flex items-end space-x-4">
            <div className="flex-1 flex flex-col justify-end group">
              <div className="h-full bg-[#00A884] rounded-lg transition-all duration-200 group-hover:brightness-110" />
              <span className="text-[#8696A0] text-sm mt-2 text-center">dez.</span>
            </div>
            <div className="flex-1 flex flex-col justify-end group">
              <div className="h-1/3 bg-[#2A373F] rounded-lg transition-all duration-200 group-hover:brightness-110" />
              <span className="text-[#8696A0] text-sm mt-2 text-center">jan.</span>
            </div>
            <div className="flex-1 flex flex-col justify-end group">
              <div className="h-1/4 bg-[#2A373F] rounded-lg transition-all duration-200 group-hover:brightness-110" />
              <span className="text-[#8696A0] text-sm mt-2 text-center">fev.</span>
            </div>
            <div className="flex-1 flex flex-col justify-end group">
              <div className="h-1/2 bg-[#2A373F] rounded-lg transition-all duration-200 group-hover:brightness-110" />
              <span className="text-[#8696A0] text-sm mt-2 text-center">mar.</span>
            </div>
          </div>
        </div>

        {/* Status da API */}
        <div className="bg-[#202C33] rounded-xl p-6 border border-[#2A373F]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#E9EDEF] text-lg font-medium">Status da API (Últimas 5 horas)</h2>
            <div className="flex items-center space-x-2 text-[#00A884] bg-[#00A884]/10 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-[#00A884] rounded-full animate-pulse" />
              <span className="text-sm font-medium">Online</span>
            </div>
          </div>
          <div className="relative h-64">
            <div className="absolute inset-0 bg-[#2A373F]/30 rounded-lg" />
            <div className="absolute top-4 left-4 space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#00A884] rounded-full" />
                <span className="text-[#E9EDEF] text-sm">Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#2A373F] rounded-full" />
                <span className="text-[#8696A0] text-sm">Offline</span>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex justify-between text-[#8696A0] text-sm font-medium">
                <span>12:01:48</span>
                <span>13:31:52</span>
                <span>13:39:21</span>
                <span>13:54:41</span>
                <span>13:55:40</span>
                <span>16:50:02</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 