'use client';

import * as React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Search, Filter, Download, Edit, Trash2, ChevronLeft, ChevronRight, X, Plus, Baby } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';

const initialAssociates = [
  { id: 'JD', name: 'Johnathan Doe', email: 'john.doe@example.com', address: 'Rua das Flores, 123', status: 'Active', hasChildren: true, children: [{ name: 'Leo', birthDate: '2019-05-12' }] },
  { id: 'JS', name: 'Jane Smith', email: 'jane.s@service.com', address: 'Av. Principal, 456', status: 'Active', hasChildren: false, children: [] },
  { id: 'RB', name: 'Robert Brown', email: 'robert.b@domain.org', address: 'Rua Secundária, 789', status: 'Inactive', hasChildren: true, children: [{ name: 'Alice', birthDate: '2016-08-20' }, { name: 'Bob', birthDate: '2014-11-05' }] },
  { id: 'ED', name: 'Emily Davis', email: 'emily.davis@mail.com', address: 'Praça Central, 10', status: 'Active', hasChildren: false, children: [] },
  { id: 'MW', name: 'Michael Wilson', email: 'm.wilson@home.net', address: 'Rua das Palmeiras, 55', status: 'Pending', hasChildren: false, children: [] },
];

export default function AssociatesPage() {
  const router = useRouter();
  const [associates, setAssociates] = React.useState(initialAssociates);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  
  // Form State
  const [formData, setFormData] = React.useState({
    name: '',
    address: '',
    hasChildren: false,
    children: [{ name: '', birthDate: '' }]
  });

  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [router]);

  const handleAddChild = () => {
    if (formData.children.length < 5) {
      setFormData({
        ...formData,
        children: [...formData.children, { name: '', birthDate: '' }]
      });
    }
  };

  const handleRemoveChild = (index: number) => {
    const newChildren = formData.children.filter((_, i) => i !== index);
    setFormData({ ...formData, children: newChildren });
  };

  const handleChildChange = (index: number, field: 'name' | 'birthDate', value: string) => {
    const newChildren = [...formData.children];
    newChildren[index][field] = value;
    setFormData({ ...formData, children: newChildren });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = formData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const newEntry = {
      id: id || '??',
      name: formData.name,
      email: `${formData.name.toLowerCase().replace(' ', '.')}@example.com`,
      address: formData.address,
      status: 'Active',
      hasChildren: formData.hasChildren,
      children: formData.hasChildren ? formData.children.filter(c => c.name) : []
    };
    
    setAssociates([newEntry, ...associates]);
    setIsModalOpen(false);
    setFormData({ name: '', address: '', hasChildren: false, children: [{ name: '', birthDate: '' }] });
  };

  const filteredAssociates = associates.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#f6f6f8] dark:bg-[#101622]">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <Header 
          title="Gestão de Associados" 
          actionLabel="Adicionar Novo Associado" 
          onAction={() => setIsModalOpen(true)}
        />
        
        <div className="p-8 space-y-6 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-1"
          >
            <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">Gestão de Associados</h1>
            <p className="text-slate-500 dark:text-slate-400">Gerencie membros da comunidade, endereços e status de acesso.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SummaryCard label="Total de Associados" value={associates.length.toString()} emoji="👥" color="text-[#0f49bd]" bg="bg-[#0f49bd]/10" />
            <SummaryCard label="Membros Ativos" value={associates.filter(a => a.status === 'Active').length.toString()} emoji="✅" color="text-green-500" bg="bg-green-500/10" />
            <SummaryCard label="Aguardando Aprovação" value={associates.filter(a => a.status === 'Pending').length.toString()} emoji="⏳" color="text-amber-500" bg="bg-amber-500/10" />
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <input 
                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-1 focus:ring-[#0f49bd] h-11 pl-10 pr-4 text-sm outline-none" 
                    placeholder="Buscar por nome ou endereço..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-800 px-4 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <Filter className="size-4" />
                  <span>Status</span>
                </button>
                <button className="flex h-11 size-11 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <Download className="size-4" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Nome do associado</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Endereço</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Filhos</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Idade (Filhos)</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider text-center">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredAssociates.map((associate, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-full bg-[#0f49bd]/10 text-[#0f49bd] flex items-center justify-center font-bold text-sm">
                            {associate.id}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 dark:text-slate-100">{associate.name}</p>
                            <p className="text-xs text-slate-500">{associate.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-medium">{associate.address}</td>
                      <td className="px-6 py-4">
                        {associate.hasChildren ? (
                          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-sm">
                            <Baby className="size-4 text-[#0f49bd]" />
                            <span>{associate.children.length} {associate.children.length === 1 ? 'filho' : 'filhos'}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-sm italic">Não possui</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {associate.hasChildren ? (
                          <div className="flex flex-wrap gap-1">
                            {associate.children.map((child: any, cIdx: number) => {
                              const birthDate = new Date(child.birthDate);
                              const today = new Date('2026-03-02');
                              let age = today.getFullYear() - birthDate.getFullYear();
                              const m = today.getMonth() - birthDate.getMonth();
                              if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                                age--;
                              }
                              return (
                                <span key={cIdx} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-bold text-slate-600 dark:text-slate-400">
                                  {child.name}: {age}a
                                </span>
                              );
                            })}
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[11px] font-bold uppercase border",
                            associate.status === 'Active' ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800" :
                            associate.status === 'Pending' ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800" :
                            "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                          )}>
                            {associate.status === 'Active' ? 'Ativo' : associate.status === 'Pending' ? 'Pendente' : 'Inativo'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-slate-400 hover:text-[#0f49bd] transition-colors">
                            <Edit className="size-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <p className="text-sm text-slate-500">Mostrando {filteredAssociates.length} de {associates.length} associados</p>
              <div className="flex items-center gap-1">
                <button className="size-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-50">
                  <ChevronLeft className="size-4" />
                </button>
                <button className="size-8 flex items-center justify-center rounded bg-[#0f49bd] text-white font-medium text-sm">1</button>
                <button className="size-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700">
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Associate Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Novo Cadastro de Associado</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                  <X className="size-5 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nome Completo</label>
                    <input 
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-11 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 text-sm focus:ring-2 focus:ring-[#0f49bd] outline-none"
                      placeholder="Ex: João Silva"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Endereço</label>
                    <input 
                      required
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full h-11 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 text-sm focus:ring-2 focus:ring-[#0f49bd] outline-none"
                      placeholder="Ex: Rua das Flores, 123"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Possui filhos?</p>
                    <p className="text-xs text-slate-500">Marque se o associado tem dependentes.</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setFormData({ ...formData, hasChildren: !formData.hasChildren })}
                    className={cn(
                      "w-12 h-6 rounded-full transition-all relative",
                      formData.hasChildren ? "bg-[#0f49bd]" : "bg-slate-300 dark:bg-slate-600"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 size-4 bg-white rounded-full transition-all",
                      formData.hasChildren ? "left-7" : "left-1"
                    )} />
                  </button>
                </div>

                {formData.hasChildren && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4 pt-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Cadastro de Filhos ({formData.children.length}/5)</h4>
                      {formData.children.length < 5 && (
                        <button 
                          type="button"
                          onClick={handleAddChild}
                          className="text-xs font-bold text-[#0f49bd] flex items-center gap-1 hover:underline"
                        >
                          <Plus className="size-3" />
                          Adicionar Filho
                        </button>
                      )}
                    </div>

                    <div className="space-y-3">
                      {formData.children.map((child, index) => (
                        <div key={index} className="flex gap-3 items-end bg-slate-50 dark:bg-slate-800/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                          <div className="flex-1 space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Nome do Filho</label>
                            <input 
                              type="text"
                              value={child.name}
                              onChange={(e) => handleChildChange(index, 'name', e.target.value)}
                              className="w-full h-9 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 text-sm outline-none focus:ring-1 focus:ring-[#0f49bd]"
                              placeholder="Nome"
                            />
                          </div>
                          <div className="w-32 space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Data de Nascimento</label>
                            <input 
                              type="date"
                              value={child.birthDate}
                              onChange={(e) => handleChildChange(index, 'birthDate', e.target.value)}
                              className="w-full h-9 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 text-sm outline-none focus:ring-1 focus:ring-[#0f49bd]"
                            />
                          </div>
                          {formData.children.length > 1 && (
                            <button 
                              type="button"
                              onClick={() => handleRemoveChild(index)}
                              className="h-9 w-9 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 h-12 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] h-12 rounded-xl bg-[#0f49bd] text-white font-bold text-sm hover:bg-[#0d3ea1] transition-all shadow-lg shadow-[#0f49bd]/20"
                  >
                    Salvar Cadastro
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SummaryCard({ label, value, emoji, color, bg }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm">
      <div className={cn("size-12 rounded-full flex items-center justify-center text-2xl", bg, color)}>
        {emoji}
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}

