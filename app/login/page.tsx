'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Mock login logic
    setTimeout(() => {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userMatch = registeredUsers.find((u: any) => 
        (u.email === formData.username || u.name === formData.username) && u.password === formData.password
      );

      if ((formData.username === 'admin' && formData.password === 'admin123') || userMatch) {
        // In a real app, you'd set a cookie or JWT here
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', userMatch ? userMatch.name : formData.username);
        localStorage.setItem('userRole', userMatch ? userMatch.role : 'Administrador');
        router.push('/');
      } else {
        setError('Usuário ou senha inválidos. Verifique suas credenciais.');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#0a0a0a] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[440px]"
      >
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-8 pb-0 flex flex-col items-center text-center">
            <div className="bg-[#0f49bd] size-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-[#0f49bd]/20">
              <Building2 className="size-9" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Portal Administrativo</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">Associação de Moradores do Bairro Califórnia</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 p-3 rounded-lg flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-medium"
              >
                <AlertCircle className="size-4 shrink-0" />
                <p>{error}</p>
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Usuário</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input 
                  required
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#0f49bd] focus:border-transparent transition-all outline-none"
                  placeholder="Seu nome de usuário"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Senha</label>
                <button type="button" className="text-[10px] font-bold text-[#0f49bd] hover:underline uppercase tracking-wider">Esqueceu a senha?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input 
                  required
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#0f49bd] focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              disabled={isLoading}
              type="submit"
              className="w-full h-12 bg-[#0f49bd] hover:bg-[#0d3ea1] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
            >
              {isLoading ? (
                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Entrar no Sistema</span>
                  <ArrowRight className="size-4" />
                </>
              )}
            </button>
          </form>

          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-500">
              Acesso restrito a administradores autorizados.
            </p>
          </div>
        </div>
        
        <p className="text-center mt-8 text-xs text-slate-400 font-medium">
          &copy; 2026 AMBC - Todos os direitos reservados.
        </p>
      </motion.div>
    </div>
  );
}
