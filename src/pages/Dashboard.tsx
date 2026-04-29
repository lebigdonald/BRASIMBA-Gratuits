/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { RECENT_REQUESTS } from '../constants';
import { StatsCards } from '../components/StatsCards';
import { RequestTable } from '../components/RequestTable';

export const Dashboard = () => {
  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 leading-tight uppercase tracking-tight">Tableau de bord</h2>
          <p className="text-sm text-gray-500 font-medium">
            {new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())} — BRASIMBA Lubumbashi
          </p>
        </div>
        <Link 
          to="/new"
          className="bg-brand hover:bg-brand-dark text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all shadow-lg shadow-brand/20 active:scale-95 text-xs uppercase tracking-widest"
        >
          <Plus size={20} />
          Nouvelle demande
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {['Tous les processus', 'Commercial DCM', 'Personnel RH', 'Mécénat RSE'].map((label, i) => (
          <button 
            key={label}
            className={cn(
              "px-4 py-2 rounded-full text-[10px] font-bold border transition-all whitespace-nowrap uppercase tracking-wider",
              i === 0 ? "bg-brand text-white border-brand shadow-md shadow-brand/10" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            )}
          >
            <div className="flex items-center gap-2">
              {i > 0 && <div className={cn("w-1.5 h-1.5 rounded-full", i === 1 ? 'bg-sky-500' : i === 2 ? 'bg-green-500' : 'bg-indigo-500')} />}
              {label}
            </div>
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Critical Alert */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-5 flex gap-4 items-start shadow-sm shadow-red-100/50 group hover:bg-red-100/50 transition-colors cursor-pointer">
        <div className="bg-red-500 text-white p-2.5 rounded-xl shadow-lg shadow-red-500/20 group-hover:scale-110 transition-transform">
          <AlertCircle size={24} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <p className="font-bold text-red-900 leading-tight uppercase tracking-tight">Escalade RSE imminente</p>
            <span className="text-[10px] font-black text-red-600 bg-red-100 px-2 py-0.5 rounded uppercase">Urgent</span>
          </div>
          <p className="text-sm font-bold text-red-800">RSE-2026-00004 - Association Espoir</p>
          <p className="text-[10px] text-red-600 mt-1 uppercase font-bold tracking-widest leading-loose italic">
            DG non répondu depuis 1h48 · Escalade DAF dans 12 min
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Table Content */}
        <div className="lg:col-span-2 space-y-6">
          <RequestTable requests={RECENT_REQUESTS} />
        </div>

        {/* Action Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col group hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-gray-900 uppercase tracking-tight">Flux Standardisés</h2>
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-brand-light group-hover:text-brand transition-colors">
                <Plus size={16} />
              </div>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Workflow Approbation', desc: 'Standard ISO-9001 • 4 Etapes', color: 'bg-blue-50 text-blue-600' },
                { title: 'Validation Technique', desc: 'Contrôle Qualité • 2 Etapes', color: 'bg-purple-50 text-purple-600' },
                { title: 'Ressources Humaines', desc: 'Onboarding • 6 Etapes', color: 'bg-green-50 text-green-600' },
                { title: 'Audit Interne', desc: 'Compliance • 3 Etapes', color: 'bg-orange-50 text-orange-600' },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:border-brand-light hover:bg-white hover:shadow-md transition-all cursor-pointer group/item flex gap-4">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0", item.color)}>
                    {item.title.split(' ').map(w => w[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm group-hover/item:text-brand transition-colors uppercase tracking-tight">{item.title}</p>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider font-bold italic">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 text-[10px] font-black text-gray-400 hover:text-brand uppercase tracking-widest text-center transition-colors">
              Gérer les modèles de flux
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
