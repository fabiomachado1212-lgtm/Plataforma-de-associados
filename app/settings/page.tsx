'use client';

import * as React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { UserPlus, Mail, Lock, Briefcase, ShieldCheck, Save, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess(false);

    // Mock registration logic
    setTimeout(() => {
      // Save user to localStorage for login persistence
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      };
      localStorage.setItem('registeredUsers', JSON.stringify([...existingUsers, newUser]));

      setIsLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', password: '', role: '' });
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-[#f6f6f8] dark:bg-[#101622]">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <Header title="Configurações do Sistema" />
        
        <div className="p-8 space-y-8 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-1"
          >
            <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">Configurações</h1>
            <p className="text-slate-500 dark:text-slate-400">Gerencie as preferências do sistema e usuários administrativos.</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8">
            {/* User Registration Section */}
            <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center gap-3">
                <div className="bg-[#0f49bd]/10 p-2 rounded-lg">
                  <UserPlus className="size-5 text-[#0f49bd]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Cadastrar Novo Usuário</h2>
                  <p className="text-xs text-slate-500">Adicione um novo administrador para gerenciar a associação.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {success && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 p-4 rounded-xl flex items-center gap-3 text-green-700 dark:text-green-400 text-sm font-bold"
                  >
                    <ShieldCheck className="size-5 shrink-0" />
                    <p>Usuário cadastrado com sucesso! As credenciais foram enviadas por e-mail.</p>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nome Completo</label>
                    <div className="relative">
                      <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                      <input 
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-11 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#0f49bd] outline-none transition-all"
                        placeholder="Ex: Maria Oliveira"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">E-mail</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                      <input 
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-11 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#0f49bd] outline-none transition-all"
                        placeholder="maria@exemplo.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Senha Temporária</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                      <input 
                        required
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full h-11 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#0f49bd] outline-none transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Cargo na Associação</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                      <select 
                        required
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full h-11 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#0f49bd] outline-none transition-all appearance-none"
                      >
                        <option value="" disabled>Selecione um cargo</option>
                        <option value="Presidente">Presidente</option>
                        <option value="Vice-Presidente">Vice-Presidente</option>
                        <option value="Secretário">Secretário(a)</option>
                        <option value="Tesoureiro">Tesoureiro(a)</option>
                        <option value="Conselheiro">Conselheiro(a)</option>
                        <option value="Admin">Administrador de TI</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button 
                    disabled={isLoading}
                    type="submit"
                    className="h-12 px-8 bg-[#0f49bd] hover:bg-[#0d3ea1] text-white rounded-xl font-bold text-sm flex items-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-[#0f49bd]/20"
                  >
                    {isLoading ? (
                      <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Save className="size-4" />
                        <span>Salvar Novo Usuário</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </section>

            {/* Other Settings Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 opacity-60">
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl">
                  <AlertCircle className="size-6 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Backup do Sistema</p>
                  <p className="text-xs text-slate-500">Configurações de backup automático.</p>
                </div>
              </div>
              <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 opacity-60">
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl">
                  <ShieldCheck className="size-6 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Logs de Auditoria</p>
                  <p className="text-xs text-slate-500">Histórico de ações administrativas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
