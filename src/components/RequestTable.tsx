/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Request } from '../types';

interface RequestTableProps {
  requests: Request[];
}

export const RequestTable = ({ requests }: RequestTableProps) => {
  const [filterDate, setFilterDate] = useState('');

  const filteredRequests = requests.filter(req => {
    if (!filterDate) return true;
    return req.date === filterDate;
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      <div className="p-5 border-b border-gray-50 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <h3 className="font-bold text-gray-900 uppercase tracking-tight">Demandes récentes</h3>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input 
              type="date" 
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-[10px] font-bold text-gray-600 outline-none focus:ring-2 focus:ring-brand/10 focus:border-brand uppercase"
            />
          </div>
          {filterDate && (
            <button 
              onClick={() => setFilterDate('')}
              className="text-[10px] font-bold text-red-500 hover:underline uppercase"
            >
              Effacer
            </button>
          )}
        </div>
        <Link to="/my-requests" className="text-xs font-bold text-brand hover:underline flex items-center gap-1 uppercase tracking-wider">
          Voir tout <ChevronRight size={14} />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
              <th className="px-6 py-4">Réf ID</th>
              <th className="px-6 py-4">Bénéficiaire</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Statut</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-6 py-4 text-xs font-mono font-bold text-gray-600">{req.id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-800">{req.beneficiary}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-500">{req.date}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-[10px] font-bold px-2.5 py-1 rounded-full ring-1 ring-inset",
                      req.process === 'DCM' ? 'bg-sky-50 text-sky-700 ring-sky-200' : 
                      req.process === 'RH' ? 'bg-green-50 text-green-700 ring-green-200' : 
                      'bg-indigo-50 text-indigo-700 ring-indigo-200'
                    )}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      to={`/requests/${req.id}`}
                      className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-gray-400 hover:text-brand transition-all inline-block"
                    >
                      <ChevronRight size={18} />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500 italic">
                  Aucune demande trouvée pour cette date.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
