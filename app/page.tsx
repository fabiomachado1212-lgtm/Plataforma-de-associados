'use client';

import * as React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { StatCard } from '@/components/StatCard';
import { Users, UserCheck, Wallet, ArrowUpRight, ArrowDownRight, MessageSquare, UserPlus, Wrench, Megaphone, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-[#f6f6f8] dark:bg-[#101622]">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <Header title="Painel" actionLabel="Novo Comunicado" />
        
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Bom dia, Alex</h3>
            <p className="text-slate-500 dark:text-slate-400">Aqui está o que está acontecendo na sua associação hoje.</p>
          </motion.div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
              label="Total de Associados" 
              value="1.240" 
              trend={{ value: "2,1%", isUp: true }} 
              icon={Users} 
            />
            <StatCard 
              label="Membros Ativos" 
              value="958" 
              trend={{ value: "0,5%", isUp: true }} 
              icon={UserCheck} 
            />
            <StatCard 
              label="Saldo Financeiro" 
              value="R$ 45.200" 
              trend={{ value: "1,2%", isUp: false }} 
              icon={Wallet} 
            />
          </div>

          {/* Chart and Activity Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Revenue vs Expenses Chart (Simplified Visual) */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">Receita vs Despesas</h4>
                  <p className="text-sm text-slate-500">Visão mensal para o 1º Semestre de 2024</p>
                </div>
                <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-xs font-semibold focus:ring-[#0f49bd] cursor-pointer">
                  <option>Últimos 6 Meses</option>
                  <option>Ano Atual</option>
                </select>
              </div>
              
              <div className="flex-1 min-h-[250px] flex items-end gap-4 px-2">
                {[
                  { month: 'Jan', rev: 40, exp: 60 },
                  { month: 'Fev', rev: 60, exp: 30 },
                  { month: 'Mar', rev: 55, exp: 40 },
                  { month: 'Abr', rev: 90, exp: 20 },
                  { month: 'Mai', rev: 45, exp: 50 },
                  { month: 'Jun', rev: 75, exp: 30 },
                ].map((item) => (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg relative flex flex-col justify-end overflow-hidden" style={{ height: `${item.rev + item.exp}%` }}>
                      <div className="bg-[#0f49bd]/40 w-full" style={{ height: `${(item.rev / (item.rev + item.exp)) * 100}%` }}></div>
                      <div className="bg-[#0f49bd] w-full" style={{ height: `${(item.exp / (item.rev + item.exp)) * 100}%` }}></div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.month}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center gap-6 mt-6 justify-center">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-[#0f49bd]/40"></span>
                  <span className="text-xs font-medium text-slate-500">Receita</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-[#0f49bd]"></span>
                  <span className="text-xs font-medium text-slate-500">Despesas</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Atividade Recente</h4>
                <button className="text-[#0f49bd] text-xs font-bold hover:underline">Ver Tudo</button>
              </div>
              <div className="space-y-6">
                <ActivityItem 
                  icon={Wallet} 
                  title="Taxa de Serviço Recebida" 
                  desc="Associado 402 - R$ 150,00 • 2 horas atrás" 
                  iconColor="text-[#0f49bd]" 
                  iconBg="bg-[#0f49bd]/10" 
                />
                <ActivityItem 
                  icon={UserPlus} 
                  title="Novo Associado Registrado" 
                  desc="Sarah Jenkins - Rua das Flores, 112 • 5 horas atrás" 
                />
                <ActivityItem 
                  icon={Wrench} 
                  title="Chamado de Manutenção Aberto" 
                  desc="Vazamento de água - Área Comum • Ontem" 
                  iconColor="text-red-600" 
                  iconBg="bg-red-100 dark:bg-red-900/30" 
                />
                <ActivityItem 
                  icon={Megaphone} 
                  title="Reunião Comunitária Agendada" 
                  desc="15 de Julho às 18:00 • 2 dias atrás" 
                />
              </div>
            </div>
          </div>

          {/* New Residents Table Summary */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Novos Associados</h4>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Buscar associados..." 
                  className="pl-9 pr-4 py-1.5 text-sm bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-1 focus:ring-[#0f49bd]"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Associado</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Endereço</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Saldo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <ResidentRow 
                    name="Robert Fox" 
                    unit="Rua das Flores, 102" 
                    status="Pago" 
                    balance="R$ 0,00" 
                    img="https://lh3.googleusercontent.com/aida-public/AB6AXuCm0gPMLVXHx5H9Xa3nd_y8CaSXMPGKVUrVDu09zWmMlqbsWnSaMfZPaDUlGRrZPdTQad9WnJOpHwSs-Avx38cCKfkdlS1LkgrDS3NOG5Q0sZzRArARRwXCIkePVNaI-BGKPZ5lM571h-t1WLRY1sNt7owcdooGJB7-TYjy2xyI2VLuveUXmZTXIzlPu687blrjqEX_gWzTRqwZdaTfPQhVK1gLPt1j5yePhPpdBV1Qz5IqLGDY25LdSKDlmcPeE6LRKCej7NR9ZL4N"
                  />
                  <ResidentRow 
                    name="Jane Cooper" 
                    unit="Av. Principal, 405" 
                    status="Pendente" 
                    balance="R$ 120,00" 
                    img="https://lh3.googleusercontent.com/aida-public/AB6AXuDrVYBm5Ny512c2CDCCwYtNjNaVUpCZfOSM-aTZdHOsOKp3gPzLOlQlOUTSCXwqmhQ5o-nY92TRv8i2N70hUjomYRRKRVwAUl5c46dMyuJnqrftLUBAjgnRPxRNhsWNlXSYDQQQlj2L30UcQF8P0G9jwwFkJpm1ta9HDpTcQ71L-A1ARoCnx18-d30udKv9bDlq8odGBBw3v5J3uztoZB5MFztewSEIoxax7PPPolVWudQVba-JJdYCAS-vBO3mpdJhuwXvmBKld317"
                  />
                  <ResidentRow 
                    name="Cody Fisher" 
                    unit="Rua Secundária, 210" 
                    status="Pago" 
                    balance="R$ 0,00" 
                    img="https://lh3.googleusercontent.com/aida-public/AB6AXuBhz25aP1oARenv7Hw8azlqPCM22JN_juL5Wq06v0xaMXlUP1oKZFkWVcn9O8bgJPQrdCTA6ZvqHuxUTUa0DgSNLb_dA8vDl8mQSBk1AodWbdY0jW8KS5A1Dpfbw51LVBMh5XJRdD8rRiKCUhiR4u-JIKvqgetyir3V6HNc_vjPYmjS9nGLBOQGGMCOhp5UAVgjV31FR7ElMBPUNGNwEHhft4G6WRgPZJrtJCQaYB1hb_s5blCACVywf4AmMQKj0zjTRElOsIExi4XD"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ActivityItem({ icon: Icon, title, desc, iconColor = "text-slate-500", iconBg = "bg-slate-100 dark:bg-slate-800" }: any) {
  return (
    <div className="flex gap-4">
      <div className={cn("size-10 rounded-full flex items-center justify-center shrink-0", iconBg)}>
        <Icon className={cn("size-5", iconColor)} />
      </div>
      <div className="flex flex-col">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">{title}</p>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>
    </div>
  );
}

function ResidentRow({ name, unit, status, balance, img }: any) {
  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <td className="px-6 py-4 flex items-center gap-3">
        <div 
          className="size-8 rounded-full bg-slate-200 bg-cover bg-center" 
          style={{ backgroundImage: `url("${img}")` }}
        />
        <span className="text-sm font-medium text-slate-900 dark:text-white">{name}</span>
      </td>
      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{unit}</td>
      <td className="px-6 py-4">
        <span className={cn(
          "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
          status === 'Pago' 
            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
            : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
        )}>
          {status}
        </span>
      </td>
      <td className={cn(
        "px-6 py-4 text-sm font-bold text-right",
        status === 'Pendente' ? "text-amber-600" : "text-slate-900 dark:text-white"
      )}>
        {balance}
      </td>
    </tr>
  );
}
