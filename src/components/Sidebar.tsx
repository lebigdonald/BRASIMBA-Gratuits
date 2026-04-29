/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  CheckSquare, 
  Settings,
  LogOut 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

export const Sidebar = () => {
  const location = useLocation();
  const activeTab = location.pathname.split('/')[1] || 'dashboard';

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord', path: '/' },
    { id: 'new', icon: FileText, label: 'Nouvelle demande', path: '/new' },
    { id: 'my-requests', icon: FileText, label: 'Mes demandes', path: '/my-requests', badge: 4 },
    { id: 'approvals', icon: CheckSquare, label: 'Approbations', path: '/approvals', badge: 5 },
    { id: 'settings', icon: Settings, label: 'Paramètres', path: '/settings' },
  ];

  const processusItems = [
    { id: 'dcm', label: 'Commercial (DCM)', color: 'bg-sky-500' },
    { id: 'rh', label: 'Personnel (RH)', color: 'bg-green-500' },
    { id: 'rse', label: 'Mécénat (RSE)', color: 'bg-indigo-500' },
  ];

  return (
    <aside className="w-64 border-r border-gray-200 bg-white flex flex-col h-screen fixed left-0 top-0 overflow-y-auto hidden md:flex">
      <div className="p-4 flex items-center gap-3 border-b border-gray-100 mb-4">
        <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center text-white font-bold text-xl uppercase">B</div>
        <div>
          <h1 className="text-sm font-bold text-gray-900 leading-tight uppercase">BRASIMBA</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Gestion des gratuits</p>
        </div>
      </div>

      <div className="px-4 mb-4">
        <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
          <p className="text-[10px] uppercase text-orange-600 font-bold mb-1 font-mono">Agent Connecté</p>
          <p className="text-sm font-bold text-orange-950">Francis Kabamba</p>
        </div>
      </div>

      <nav className="flex-1 px-2 space-y-1">
        <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Menu</p>
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold transition-all",
              (activeTab === item.id || (item.id === 'dashboard' && activeTab === '')) 
                ? "bg-brand-light text-brand shadow-sm" 
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon size={18} />
              {item.label}
            </div>
            {item.badge && (
              <span className="bg-brand text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                {item.badge}
              </span>
            )}
          </Link>
        ))}

        <div className="pt-6">
          <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Filtres Rapides</p>
          {processusItems.map((item) => (
            <button
              key={item.id}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <div className={cn("w-2 h-2 rounded-full", item.color)} />
              {item.label}
            </button>
          ))}
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-100">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold text-red-600 hover:bg-red-50 transition-colors">
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
};
