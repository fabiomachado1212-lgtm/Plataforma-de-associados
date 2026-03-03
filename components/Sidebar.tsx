'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  Settings, 
  Building2,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Painel', href: '/', icon: LayoutDashboard },
  { name: 'Gestão de associados', href: '/associados', icon: Users },
  { name: 'Financeiro', href: '/finance', icon: Wallet },
  { name: 'Configurações', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [username, setUsername] = React.useState('Admin');
  const [userRole, setUserRole] = React.useState('Administrador');

  React.useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('userRole');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    router.push('/login');
  };

  return (
    <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen sticky top-0 shrink-0">
      <div id="sidebar-header" className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-[#0f49bd] size-12 rounded-lg flex items-center justify-center text-white shrink-0 overflow-hidden">
            {/* 
              Para usar o logo real, salve a imagem como /public/logo.png 
              e substitua o componente Building2 por:
              <img src="/logo.png" alt="Logo AMBC" className="size-full object-cover" />
            */}
            <Building2 className="size-7" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-slate-900 dark:text-white text-sm font-black leading-tight">AMBC</h1>
            <p className="text-slate-500 dark:text-slate-400 text-[10px] font-medium uppercase tracking-wider leading-tight">Assoc. Moradores do Bairro Califórnia</p>
          </div>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
                  isActive 
                    ? "bg-[#0f49bd]/10 text-[#0f49bd] font-semibold" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                <item.icon className={cn("size-5", isActive ? "text-[#0f49bd]" : "text-slate-400 group-hover:text-slate-600")} />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div 
            className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center border border-slate-200 dark:border-slate-700"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA-W1dTgXCIx1Dlio7yS5Wlf6N-nz9fUZ8YLq6_JnWeRbrnMM8tlI8CdDAJqhme7vYa9XsR_zQF_nBW2FDnoVEfWLjEB_aeDNpFXO77pJ7PCGihBmhvkoSVMkSzBY6IRQJjBBXf4vSbRuaru4SNc_ARaDj-UJOHZ0qIp7eoH2BdhvzoTWiu3SEQPWdygU1YDHwgLtEQGvpkIvC1KgLowkCsm7MxM5fEX18_PWllHnxO8bLQnQHHV2Ete8YJc0sIRQOqfDMfCJC63PWf")' }}
          />
          <div className="flex flex-col overflow-hidden">
            <p className="text-xs text-slate-500 truncate">{userRole}</p>
            <p className="text-sm font-bold truncate text-slate-900 dark:text-white capitalize">{username}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="ml-auto text-slate-400 hover:text-red-500 transition-colors"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
