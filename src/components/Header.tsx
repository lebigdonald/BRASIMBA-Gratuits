/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  
  const getPageTitle = () => {
    switch(path) {
      case 'new': return 'Nouvelle demande';
      case 'approvals': return 'Approbations';
      case 'sap-edition': return 'Édition BC SAP';
      case 'settings': return 'Paramètres';
      case 'my-requests': return 'Mes demandes';
      default: return 'Tableau de bord';
    }
  };

  return (
    <header className="h-16 border-b border-gray-100 bg-white/80 backdrop-blur-md flex items-center justify-between px-6 md:px-10 sticky top-0 z-30">
      <div className="flex items-center gap-6 flex-1">
        <button className="md:hidden p-2 text-gray-500 hover:bg-gray-50 rounded-xl transition-colors">
          <Menu size={20} />
        </button>
        <div className="hidden lg:flex items-center gap-2">
           <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">{getPageTitle()}</span>
        </div>
        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} strokeWidth={2.5} />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all font-bold placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link 
          to="/settings" 
          className="p-2.5 text-gray-400 hover:text-orange-600 rounded-xl hover:bg-orange-50 relative transition-all active:scale-95 group"
        >
          <Bell size={18} strokeWidth={2.5} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-orange-600 rounded-full border-2 border-white shadow-sm transition-transform group-hover:scale-110" />
        </Link>
        <div className="w-px h-6 bg-gray-100 mx-2 hidden sm:block" />
        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right">
            <p className="text-xs font-black text-gray-900 leading-none">Francis Kabamba</p>
            <p className="text-[9px] text-orange-600 mt-1 uppercase tracking-widest font-black opacity-60">Admin DCM</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black text-xs shadow-lg shadow-orange-100 ring-4 ring-orange-50 active:scale-95 transition-transform cursor-pointer">
            FK
          </div>
        </div>
      </div>
    </header>
  );
};
