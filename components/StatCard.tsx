'use client';

import * as React from 'react';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  trend?: {
    value: string;
    isUp: boolean;
  };
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
}

export function StatCard({ label, value, trend, icon: Icon, iconColor = "text-[#0f49bd]", iconBg = "bg-[#0f49bd]/10" }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">{label}</span>
        <div className={cn("p-2 rounded-lg", iconBg)}>
          <Icon className={cn("size-5", iconColor)} />
        </div>
      </div>
      <div className="flex items-end gap-2">
        <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
        {trend && (
          <span className={cn(
            "text-sm font-bold flex items-center mb-1",
            trend.isUp ? "text-green-600" : "text-red-500"
          )}>
            {trend.isUp ? <TrendingUp className="size-3 mr-1" /> : <TrendingDown className="size-3 mr-1" />}
            {trend.value}
          </span>
        )}
      </div>
    </div>
  );
}
