import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, FileText, CheckCircle, ChevronRight, Info, ExternalLink, Printer, Send, Save, Edit3 } from 'lucide-react';
import { RECENT_REQUESTS } from '../constants';
import { Request } from '../types';

const SAPEdition: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'A éditer' | 'BC émis' | 'Clôturés'>('A éditer');
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(RECENT_REQUESTS[0]?.id || null);

  const entriesRequested = RECENT_REQUESTS.filter(r => r.process === 'DCM'); // Simplified logic for demo
  const selectedRequest = RECENT_REQUESTS.find(req => req.id === selectedRequestId);

  return (
    <div className="flex flex-col h-full space-y-6 pt-4 pb-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-900 font-sans tracking-tight">Édition Bon de Commande SAP</h1>
        <p className="text-sm text-gray-500">
          4 demandes validées en attente d'édition BC • Service Commande
        </p>
      </header>

      {/* Primary Tabs */}
      <div className="flex gap-4 border-b border-gray-100 pb-2">
         {['A éditer', 'BC émis', 'Clôturés'].map((tab) => (
           <button
             key={tab}
             onClick={() => setActiveTab(tab as any)}
             className={`px-4 py-2 text-sm font-bold transition-all relative ${
               activeTab === tab ? 'text-orange-600' : 'text-gray-400 hover:text-gray-600'
             }`}
           >
             {tab}
             <span className={`ml-2 px-1.5 py-0.5 rounded text-[10px] ${
               activeTab === tab ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'
             }`}>
               {tab === 'A éditer' ? '4' : tab === 'BC émis' ? '12' : '8'}
             </span>
             {activeTab === tab && (
               <motion.div 
                 layoutId="activeTabUnderline" 
                 className="absolute bottom-0 left-0 right-0 h-1 bg-orange-600 rounded-t-full" 
               />
             )}
           </button>
         ))}
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        {/* Master List (3 columns) */}
        <div className="lg:col-span-4 flex flex-col min-h-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Demandes validées</h3>
            <span className="text-[10px] text-gray-400 flex items-center gap-1"><Info className="h-3 w-3" /> Triple validation complète</span>
          </div>
          
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50 scrollbar-thin">
            {entriesRequested.map((req) => (
              <button
                key={req.id}
                onClick={() => setSelectedRequestId(req.id)}
                className={`w-full text-left p-4 flex gap-3 transition-all outline-none ${
                  selectedRequestId === req.id ? 'bg-blue-50/50 border-l-4 border-blue-500' : 'hover:bg-gray-50'
                }`}
              >
                <div className={`h-10 w-10 min-w-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    req.process === 'DCM' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                }`}>
                  {req.beneficiary.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 pr-4">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[10px] font-mono text-gray-400">{req.id}</span>
                    <span className="text-[10px] font-bold text-blue-500 uppercase">{req.process}</span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 truncate">{req.beneficiary}</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">{req.products.length} produits • {req.products[0]?.conditionnement || 'casier'}</p>
                </div>
                <div className="ml-auto flex flex-col items-end justify-between py-1">
                   <span className="text-[10px] text-gray-400">20/04/2026</span>
                   {selectedRequestId === req.id && <ChevronRight className="h-4 w-4 text-blue-500" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail Form (8 columns) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          {selectedRequest ? (
            <>
              <div className="p-6 border-b border-gray-100 flex flex-wrap gap-6 items-start">
                 <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-bold">{selectedRequest.process}</span>
                       <span className="text-green-600 text-[10px] font-bold flex items-center gap-1 uppercase">
                         <CheckCircle className="h-3 w-3" /> Triple validation ✓
                       </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedRequest.beneficiary}</h2>
                    <p className="text-xs text-gray-500">Animation commerciale • Agent F. Kabamba • 20/04/2026</p>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-[10px]">
                    <div>
                       <p className="font-bold text-gray-400 uppercase">Demandeur</p>
                       <p className="font-medium text-gray-700">{selectedRequest.applicant}</p>
                    </div>
                    <div>
                       <p className="font-bold text-gray-400 uppercase">Catégorie bénéf.</p>
                       <p className="font-medium text-gray-700">Animation</p>
                    </div>
                    <div>
                       <p className="font-bold text-gray-400 uppercase">Validé par R.DCM</p>
                       <p className="font-medium text-gray-700">19/04 • 09:30</p>
                    </div>
                    <div>
                       <p className="font-bold text-gray-400 uppercase">Validé par DG</p>
                       <p className="font-medium text-gray-700">20/04 • 11:15</p>
                    </div>
                 </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin">
                {/* Product Section */}
                <section>
                   <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-gray-900">Produits à commander</h3>
                      <span className="text-[10px] p-1.5 bg-gray-50 rounded text-gray-400">4 casiers total</span>
                   </div>
                   <div className="border border-gray-100 rounded-xl overflow-hidden">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase">Code SAP</th>
                            <th className="px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase">Désignation</th>
                            <th className="px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase text-center">Cond.</th>
                            <th className="px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase text-right">Qté</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {selectedRequest.products.map((p, idx) => (
                             <tr key={idx} className="text-xs group hover:bg-gray-50 transition-colors">
                               <td className="px-4 py-3 font-mono font-bold text-gray-900">{p.sapCode}</td>
                               <td className="px-4 py-3 font-medium text-gray-700 uppercase">{p.designation}</td>
                               <td className="px-4 py-3 text-center text-gray-500 font-mono tracking-tighter">{p.conditionnement}</td>
                               <td className="px-4 py-3 text-right font-bold text-gray-900">{p.requested}</td>
                             </tr>
                          ))}
                        </tbody>
                      </table>
                   </div>
                </section>

                {/* SAP Info Section */}
                <section className="bg-orange-50/30 rounded-2xl p-6 border border-orange-100 space-y-4">
                   <div className="flex items-start gap-4 mb-2">
                       <div className="bg-orange-100 p-2 rounded-lg">
                          <FileText className="h-5 w-5 text-orange-600" />
                       </div>
                       <div className="flex-1">
                          <h4 className="text-sm font-bold text-orange-900">Créer le Bon de Commande SAP</h4>
                          <p className="text-[10px] text-orange-600 mt-0.5 uppercase font-bold tracking-tight">Saisir le numéro BC après création dans SAP • Centre P015 BRAS USINE LUBUMBASHI</p>
                       </div>
                   </div>

                   <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center gap-3 text-xs text-blue-700">
                      <ExternalLink className="h-4 w-4" />
                      <span>Ouvrir SAP → Transaction <span className="font-bold">ME21N</span> → Créer la commande → Copier le numéro BC généré ci-dessous.</span>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-2">
                      <div className="md:col-span-2 space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">Numéro Bon de Commande SAP <span className="text-red-500">*</span></label>
                        <input 
                           type="text" 
                           placeholder="51005XXXXX" 
                           className="w-full h-12 bg-white border border-gray-200 rounded-lg px-4 text-sm font-mono font-bold focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none shadow-inner"
                        />
                        <p className="text-[10px] text-gray-400 italic">Format : 10 chiffres • Ex : 5100540835</p>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Type de commande</label>
                        <select className="w-full h-11 bg-white border border-gray-200 rounded-lg px-4 text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer">
                           <option>Gratuité Facturée</option>
                           <option>Echantillon</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Centre de distribution</label>
                        <input 
                           type="text" 
                           value="P015 BRAS USINE LUBUMBASHI" 
                           disabled
                           className="w-full h-11 bg-gray-50 border border-gray-100 rounded-lg px-4 text-xs font-medium text-gray-500 uppercase"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Nom de l'opérateur SAP</label>
                        <input 
                           type="text" 
                           placeholder="Fifi Mukonkole" 
                           className="w-full h-11 bg-white border border-gray-200 rounded-lg px-4 text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Date d'échéance SAP <span className="text-red-500">*</span></label>
                        <input 
                           type="date" 
                           className="w-full h-11 bg-white border border-gray-200 rounded-lg px-4 text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Référence client</label>
                        <input 
                           type="text" 
                           placeholder="Ex : N°61935 BARCELOS OUV" 
                           className="w-full h-11 bg-white border border-gray-200 rounded-lg px-4 text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Code client SAP</label>
                        <input 
                           type="text" 
                           placeholder="Ex : 48583" 
                           className="w-full h-11 bg-white border border-gray-200 rounded-lg px-4 text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                   </div>

                   {/* Signature Wall */}
                   <div className="pt-4 space-y-2">
                       <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                         <span className="flex items-center gap-1"><Edit3 className="h-3 w-3" /> Signature Responsable DCM</span> <span className="text-red-500">*</span>
                       </label>
                       <div className="h-24 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all text-gray-400 text-xs gap-2">
                          <Send className="h-4 w-4" /> Cliquer pour apposer la signature électronique
                       </div>
                   </div>
                </section>
              </div>

              <div className="p-6 bg-white border-t border-gray-100 flex gap-4">
                 <button className="flex-1 h-12 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                    <Save className="h-5 w-5" /> Enregistrer brouillon
                 </button>
                 <button className="flex-[2] h-12 bg-orange-600 text-white rounded-xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-700 transition-all flex items-center justify-center gap-2">
                    <Printer className="h-5 w-5" /> Émettre le BC SAP
                 </button>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center opacity-30 text-center gap-4">
               <FileText className="h-20 w-20" />
               <p className="font-bold">Sélectionner une demande à traiter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SAPEdition;
