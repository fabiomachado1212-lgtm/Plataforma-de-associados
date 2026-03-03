'use client';

import * as React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { 
  Wallet, 
  TrendingUp, 
  Clock, 
  AlertCircle, 
  BarChart3, 
  Plus, 
  Calendar, 
  Filter, 
  Download, 
  Printer, 
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

const invoices = [
  { id: 'JD', name: 'Jane Doe', unit: 'Unit 402-B', amount: '$250.00', date: 'Oct 01, 2023', due: 'Oct 15, 2023', status: 'Paid' },
  { id: 'MS', name: 'Michael Scott', unit: 'Unit 101-A', amount: '$250.00', date: 'Oct 01, 2023', due: 'Oct 15, 2023', status: 'Overdue' },
  { id: 'RS', name: 'Robert Smith', unit: 'Unit 305-C', amount: '$250.00', date: 'Oct 01, 2023', due: 'Oct 15, 2023', status: 'Pending' },
  { id: 'EB', name: 'Emily Blunt', unit: 'Unit 512-A', amount: '$250.00', date: 'Oct 01, 2023', due: 'Oct 15, 2023', status: 'Paid' },
  { id: 'WW', name: 'Walter White', unit: 'Unit 202-F', amount: '$320.00', date: 'Sep 25, 2023', due: 'Oct 10, 2023', status: 'Overdue' },
];

import { useRouter } from 'next/navigation';

export default function FinancePage() {
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
        <Header title="Visão Geral Financeira" actionLabel="Nova Fatura" />
        
        <div className="p-8 space-y-8 max-w-[1400px] mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-1"
          >
            <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">Visão Geral Financeira</h1>
            <p className="text-slate-500 dark:text-slate-400">Acompanhe o status de arrecadação para o período fiscal atual.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <FinanceStatCard 
              label="Total Arrecadado" 
              value="R$ 24.450,00" 
              icon={Wallet} 
              color="text-green-500" 
              trend="+5,2% desde o mês passado" 
            />
            <FinanceStatCard 
              label="Taxas Pendentes" 
              value="R$ 4.200,00" 
              icon={Clock} 
              color="text-amber-500" 
              subtext="14 contas aguardando" 
            />
            <FinanceStatCard 
              label="Saldo em Atraso" 
              value="R$ 1.850,00" 
              icon={AlertCircle} 
              color="text-red-500" 
              subtext="8 notificações urgentes" 
              isUrgent
            />
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-[#0f49bd] text-white shadow-lg shadow-[#0f49bd]/20">
              <div className="flex justify-between items-start">
                <p className="text-white/80 text-sm font-medium">Progresso de Arrecadação</p>
                <BarChart3 className="size-5" />
              </div>
              <p className="text-3xl font-bold leading-tight">92,4%</p>
              <div className="w-full bg-white/20 h-2 rounded-full mt-1">
                <div className="bg-white h-2 rounded-full w-[92.4%]"></div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-sm">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex gap-3 items-center">
                <button className="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors">
                  <Calendar className="size-4" />
                  <span>Intervalo de Datas</span>
                </button>
                <button className="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors">
                  <Filter className="size-4" />
                  <span>Status: Todos</span>
                </button>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                  <Download className="size-5" />
                </button>
                <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                  <Printer className="size-5" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Associado</th>
                    <th className="px-6 py-4">Valor</th>
                    <th className="px-6 py-4">Data da Fatura</th>
                    <th className="px-6 py-4">Vencimento</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {invoices.map((invoice, idx) => (
                    <tr key={idx} className={cn(
                      "hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors",
                      invoice.status === 'Overdue' && "bg-red-50/30 dark:bg-red-900/5"
                    )}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "size-8 rounded-full flex items-center justify-center font-bold text-xs",
                            invoice.status === 'Overdue' ? "bg-red-100 text-red-600" : "bg-[#0f49bd]/10 text-[#0f49bd]"
                          )}>
                            {invoice.id}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{invoice.name}</span>
                            <span className="text-xs text-slate-500">{invoice.unit.replace('Unit', 'Endereço')}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-slate-100">{invoice.amount.replace('$', 'R$ ')}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{invoice.date}</td>
                      <td className={cn(
                        "px-6 py-4 text-sm",
                        invoice.status === 'Overdue' ? "font-bold text-red-600 dark:text-red-400" : "text-slate-600 dark:text-slate-400"
                      )}>
                        {invoice.due}
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold",
                          invoice.status === 'Paid' ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                          invoice.status === 'Overdue' ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                          "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        )}>
                          <span className={cn(
                            "w-1 h-1 rounded-full",
                            invoice.status === 'Paid' ? "bg-green-500" :
                            invoice.status === 'Overdue' ? "bg-red-500" :
                            "bg-amber-500"
                          )}></span>
                          {invoice.status === 'Paid' ? 'Pago' : invoice.status === 'Overdue' ? 'Atrasado' : 'Pendente'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-[#0f49bd] transition-colors">
                          <MoreVertical className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium tracking-tight">Mostrando 1-10 de 42 associados</span>
              <div className="flex gap-2">
                <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50">
                  <ChevronLeft className="size-4" />
                </button>
                <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function FinanceStatCard({ label, value, icon: Icon, color, trend, subtext, isUrgent }: any) {
  return (
    <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex justify-between items-start">
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{label}</p>
        <Icon className={cn("size-5", color)} />
      </div>
      <p className="text-slate-900 dark:text-slate-100 text-3xl font-bold leading-tight">{value}</p>
      {trend && (
        <div className="flex items-center gap-1">
          <TrendingUp className="size-3 text-green-500" />
          <p className="text-green-600 text-xs font-bold leading-normal">{trend}</p>
        </div>
      )}
      {subtext && (
        <div className="flex items-center gap-1">
          {isUrgent ? <AlertCircle className="size-3 text-red-500" /> : <Clock className="size-3 text-slate-400" />}
          <p className={cn("text-xs font-medium leading-normal", isUrgent ? "text-red-600 font-bold" : "text-slate-400")}>
            {subtext}
          </p>
        </div>
      )}
    </div>
  );
}
