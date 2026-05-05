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
  LogOut,
  History,
  FileBadge,
  BarChart2
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

export const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  const activeTab = path === '' ? 'dashboard' : path;

  const getRoleInfo = () => {
    switch(activeTab) {
      case 'approvals':
        return { role: 'Contrôle de Gestion', color: 'bg-orange-50 text-orange-900 border-orange-100' };
      case 'sap-edition':
        return { role: 'Service Commande', color: 'bg-orange-50 text-orange-900 border-orange-100' };
      case 'new':
        return { role: 'Demandeur DCM', color: 'bg-orange-50 text-orange-900 border-orange-100' };
      default:
        return { role: 'Demandeur DCM', color: 'bg-orange-50 text-orange-900 border-orange-100' };
    }
  };

  const roleInfo = getRoleInfo();

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord', path: '/' },
    { id: 'new', icon: FileText, label: 'Nouvelle demande', path: '/new' },
    { id: 'approvals', icon: CheckSquare, label: 'Approbations', path: '/approvals', badge: 5 },
    { id: 'my-requests', icon: FileBadge, label: 'Mes demandes', path: '/my-requests', badge: 2 },
    { id: 'sap-edition', icon: FileText, label: 'Édition BC SAP', path: '/sap-edition', badge: 4 },
    { id: 'history', icon: History, label: 'Historique', path: '/history' },
    { id: 'settings', icon: Settings, label: 'Paramètres', path: '/settings' },
  ];

  const processusItems = [
    { id: 'dcm', label: 'Commercial (DCM)', color: 'bg-blue-500' },
    { id: 'rh', label: 'Personnel (RH)', color: 'bg-green-500' },
    { id: 'rse', label: 'Mécénat (RSE)', color: 'bg-orange-500' },
  ];

  const rapportItems = [
    { id: 'analytics', label: 'Analytique', icon: BarChart2 }
  ];

  return (
    <aside className="w-64 border-r border-gray-200 bg-white flex flex-col h-screen fixed left-0 top-0 overflow-y-auto hidden md:flex z-40">
      <div className="p-4 flex items-center gap-3 border-b border-gray-100 mb-4 bg-white sticky top-0 z-50">
        <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-100">B</div>
        <div>
          <h1 className="text-sm font-black text-gray-900 leading-tight tracking-tighter">BRASIMBA</h1>
          <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black opacity-50">Gestion des gratuits</p>
        </div>
      </div>

      <div className="px-4 mb-4">
        <div className={cn("p-3 rounded-xl border transition-all duration-300", roleInfo.color)}>
          <p className="text-[9px] uppercase font-black opacity-60 mb-1 tracking-widest">Rôle actif</p>
          <p className="text-xs font-black">{roleInfo.role}</p>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1 pb-6">
        <p className="px-3 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 mt-4">Menu</p>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all transition-transform active:scale-95",
                activeTab === item.id || (item.id === 'dashboard' && activeTab === 'dashboard') 
                  ? "bg-orange-50 text-orange-600 shadow-sm" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                {item.label}
              </div>
              {item.badge && (
                <span className={cn(
                  "text-[10px] font-black px-1.5 py-0.5 rounded-lg",
                  activeTab === item.id ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-400"
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>

        <div className="pt-8">
          <p className="px-3 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Processus</p>
          <div className="space-y-1">
            {processusItems.map((item) => (
              <button
                key={item.id}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50 transition-colors group"
              >
                <div className={cn("w-2 h-2 rounded-full ring-2 ring-offset-2 ring-transparent group-hover:ring-offset-1", item.color)} />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-8">
          <p className="px-3 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Rapports</p>
          <div className="space-y-1">
            {rapportItems.map((item) => (
              <button
                key={item.id}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-100 bg-gray-50/30">
        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-black text-red-500 hover:bg-red-50 transition-all active:scale-95">
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
};
