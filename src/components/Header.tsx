/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 md:px-8 sticky top-0 z-20">
      <div className="flex items-center gap-4 flex-1">
        <button className="md:hidden p-2 text-gray-500 hover:bg-gray-50 rounded-lg">
          <Menu size={20} />
        </button>
        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Rechercher une demande..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-brand/10 focus:border-brand outline-none transition-all font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Link 
          to="/settings" 
          className="p-2 text-gray-400 hover:text-brand rounded-full hover:bg-brand-light relative transition-colors"
        >
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white shadow-sm" />
        </Link>
        <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block" />
        <div className="flex items-center gap-3 pl-2">
          <div className="hidden md:block text-right">
            <p className="text-xs font-bold text-gray-900 leading-none">Francis Kabamba</p>
            <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-tight font-bold">DCM Admin</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center font-bold shadow-lg shadow-brand/20 ring-2 ring-brand/5 active:scale-95 transition-transform cursor-pointer">
            FK
          </div>
        </div>
      </div>
    </header>
  );
};
