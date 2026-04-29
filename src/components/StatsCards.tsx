/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { cn } from '../lib/utils';

interface StatItem {
  label: string;
  value: string;
  trend: string;
  color: string;
}

export const StatsCards = () => {
  const stats: StatItem[] = [
    { label: 'EN ATTENTE VALIDATION', value: '5', trend: '+2 depuis hier', color: 'border-orange-500' },
    { label: 'DEMANDES CE MOIS', value: '31', trend: 'DCM-18 / RH-9 / RSE-4', color: 'border-blue-500' },
    { label: 'CLÔTURÉES CE MOIS', value: '22', trend: 'Taux 71%', color: 'border-green-500' },
    { label: 'DÉLAI MOYEN', value: '7h', trend: 'Cibles : 24h / 24h / 2h', color: 'border-indigo-500' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, i) => (
        <div 
          key={i} 
          className={cn(
            "bg-white p-5 rounded-2xl border border-gray-100 shadow-sm border-l-4 transition-all hover:shadow-md hover:-translate-y-1 group", 
            stat.color
          )}
        >
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 group-hover:text-gray-500 transition-colors">{stat.label}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900 tracking-tight">{stat.value}</span>
            <span className="text-[12px] font-bold text-gray-500 uppercase tracking-tight">{stat.trend}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
