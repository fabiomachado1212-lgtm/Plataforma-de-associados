'use client';

import * as React from 'react';
import { Bell, Plus, Search } from 'lucide-react';

interface HeaderProps {
  title: string;
  showSearch?: boolean;
  actionLabel?: string;
  onAction?: () => void;
}

export function Header({ title, showSearch = false, actionLabel, onAction }: HeaderProps) {
  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
      
      <div className="flex items-center gap-4">
        {showSearch && (
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="pl-9 pr-4 py-1.5 text-sm bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-1 focus:ring-[#0f49bd] w-64"
            />
          </div>
        )}
        
        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative">
          <Bell className="size-5" />
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>
        
        {actionLabel && (
          <button 
            onClick={onAction}
            className="bg-[#0f49bd] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-[#0f49bd]/90 transition-all shadow-sm"
          >
            <Plus className="size-4" />
            {actionLabel}
          </button>
        )}
      </div>
    </header>
  );
}
