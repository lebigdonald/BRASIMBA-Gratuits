import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, ChevronRight, Filter, AlertTriangle, Clock, Search } from 'lucide-react';
import { RECENT_REQUESTS } from '../constants';
import { Request } from '../types';

const Approvals: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Toutes' | 'Commercial' | 'Personnel' | 'Mécénat'>('Toutes');
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  const filteredRequests = RECENT_REQUESTS.filter(req => 
    activeTab === 'Toutes' || req.type === activeTab
  );

  const selectedRequest = RECENT_REQUESTS.find(req => req.id === selectedRequestId);

  const tabs = [
    { name: 'Toutes', count: RECENT_REQUESTS.length, color: 'bg-orange-600 text-white' },
    { name: 'Commercial', count: RECENT_REQUESTS.filter(r => r.type === 'Commercial').length, color: 'bg-white text-gray-700 border border-gray-200' },
    { name: 'Personnel', count: RECENT_REQUESTS.filter(r => r.type === 'Personnel').length, color: 'bg-white text-gray-700 border border-gray-200' },
    { name: 'Mécénat', count: RECENT_REQUESTS.filter(r => r.type === 'Mécénat').length, color: 'bg-white text-gray-700 border border-gray-200' },
  ];

  return (
    <div className="space-y-6 pt-4">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-900 font-sans tracking-tight">File d'approbation</h1>
        <p className="text-sm text-gray-500">
          {filteredRequests.length} demandes en attente de votre validation — Lundi 20 avril 2026
        </p>
      </header>

      {/* Escalation Alert */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-center gap-3">
        <div className="bg-red-100 p-2 rounded-full">
          <AlertTriangle className="h-5 w-5 text-red-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-red-800">
            Escalade RSE imminente — RSE-2026-00004 • Association Espoir
          </h3>
          <p className="text-xs text-red-600">
            DG sans réponse depuis 1h48 • Escalade automatique DAF dans 12 minutes
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.name 
              ? 'bg-orange-600 text-white shadow-md' 
              : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300'
            }`}
          >
            {tab.name}
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
              activeTab === tab.name ? 'bg-orange-700 text-white' : 'bg-gray-100 text-gray-500'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List of Requests */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center bg-transparent border-b border-gray-100 pb-2">
            <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2 uppercase tracking-wider">
              À approuver <span className="text-gray-400 font-normal normal-case">({filteredRequests.length} demandes en attente)</span>
            </h2>
            <div className="flex items-center gap-4">
               <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Search className="h-4 w-4" />
               </button>
               <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Filter className="h-4 w-4" />
               </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredRequests.map((req) => (
              <motion.div
                layoutId={req.id}
                key={req.id}
                onClick={() => setSelectedRequestId(req.id)}
                className={`bg-white rounded-xl shadow-sm border p-4 transition-all cursor-pointer group relative overflow-hidden ${
                  selectedRequestId === req.id ? 'ring-2 ring-orange-500 border-transparent bg-orange-50/10' : 'border-gray-200 hover:shadow-md'
                }`}
              >
                {/* Process accent line */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 flex flex-col items-center justify-center p-0 ${
                  req.process === 'DCM' ? 'bg-blue-500' : req.process === 'RH' ? 'bg-green-500' : 'bg-orange-500'
                }`} />

                <div className="flex gap-4">
                  <div className={`h-10 w-10 min-w-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    req.process === 'DCM' ? 'bg-blue-100 text-blue-700' : req.process === 'RH' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {req.beneficiary.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono font-medium text-gray-500">{req.id}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-tight ${
                             req.process === 'DCM' ? 'bg-blue-100 text-blue-700' : req.process === 'RH' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                          }`}>{req.process}</span>
                          {req.isUrgent && (
                            <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-red-100 text-red-700 font-bold uppercase">
                              <AlertTriangle className="h-3 w-3" /> Urgent
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors truncate">
                          {req.beneficiary} • {req.applicant}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          {req.status} • {req.products.length} produits • {req.products.reduce((acc, p) => acc + (p.requested || 0), 0)} casiers
                        </p>
                      </div>
                      
                      <div className="text-right flex flex-col items-end">
                         <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1 uppercase">
                           <div className={`h-2 w-2 rounded-full ${
                             req.process === 'DCM' ? 'bg-blue-400' : req.process === 'RH' ? 'bg-green-400' : 'bg-orange-400'
                           }`} /> {req.status}
                         </span>
                         <div className="mt-2 text-[10px] text-gray-400 flex flex-col items-end">
                            <span className="flex items-center gap-1 font-medium"><Clock className="h-3 w-3" /> il y a 2h</span>
                            {req.isUrgent ? (
                              <span className="text-red-500 font-bold flex items-center gap-1 mt-1 animate-pulse"><AlertTriangle className="h-3 w-3" /> 12 min</span>
                            ) : (
                              <span className="text-green-600 font-bold flex items-center gap-1 mt-1 whitespace-nowrap">✓ 22h rest.</span>
                            )}
                         </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                       <button className="flex-1 py-1.5 px-3 bg-green-50 text-green-700 rounded-lg text-xs font-bold border border-green-200 hover:bg-green-100 transition-colors flex items-center justify-center gap-1">
                          <CheckCircle className="h-3.5 w-3.5" /> Approuver
                       </button>
                       <button className="flex-1 py-1.5 px-3 bg-red-50 text-red-700 rounded-lg text-xs font-bold border border-red-200 hover:bg-red-100 transition-colors flex items-center justify-center gap-1">
                          <XCircle className="h-3.5 w-3.5" /> Rejeter
                       </button>
                       <button className="py-1.5 px-3 bg-white text-gray-600 rounded-lg text-xs font-bold border border-gray-200 hover:border-gray-300 transition-colors">
                          Détail
                       </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Pane - Detail View Placeholder / Summary */}
        <div className="hidden lg:block">
           <div className="sticky top-4 bg-white rounded-2xl border border-gray-200 shadow-sm h-[calc(100vh-12rem)] overflow-hidden flex flex-col">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-gray-900">Détail de la demande</h3>
                {selectedRequest && (
                   <button className="text-gray-400 hover:text-gray-600">
                     <ChevronRight className="h-5 w-5" />
                   </button>
                )}
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50/50">
                {selectedRequest ? (
                  <div className="w-full space-y-6">
                    <div className="flex flex-col items-center gap-3">
                       <div className={`h-16 w-16 rounded-full flex items-center justify-center text-xl font-bold ${
                          selectedRequest.process === 'DCM' ? 'bg-blue-100 text-blue-700' : selectedRequest.process === 'RH' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                       }`}>
                          {selectedRequest.beneficiary.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                       </div>
                       <h4 className="text-lg font-bold text-gray-900">{selectedRequest.beneficiary}</h4>
                       <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">{selectedRequest.id}</span>
                    </div>

                    <div className="space-y-4 text-left w-full">
                       <div className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                          <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Description</p>
                          <p className="text-sm text-gray-700">Demande de produits pour l'événement annuel des mères.</p>
                       </div>

                       <div className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                          <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Produits</p>
                          <div className="space-y-2">
                            {selectedRequest.products.map((p, idx) => (
                              <div key={idx} className="flex justify-between items-center text-xs">
                                <span className="text-gray-600">{p.designation}</span>
                                <span className="font-bold text-gray-900">x{p.requested}</span>
                              </div>
                            ))}
                          </div>
                       </div>
                    </div>

                    <div className="pt-4 flex flex-col gap-2">
                       <button className="w-full py-3 bg-orange-600 text-white rounded-xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-700 transition-all">
                          Valider la demande
                       </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 opacity-50 flex flex-col items-center">
                    <div className="text-4xl text-gray-400">👆</div>
                    <p className="text-sm text-gray-500 font-medium">Cliquer sur une demande pour voir le détail et les actions disponibles</p>
                  </div>
                )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Approvals;
