/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  FileText,
  History as HistoryIcon
} from 'lucide-react';
import { RECENT_REQUESTS } from '../constants';
import { cn } from '../lib/utils';

export const RequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const request = RECENT_REQUESTS.find(r => r.id === id);

  if (!request) {
    return (
      <div className="p-12 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2 uppercase">Demande non trouvée</h2>
        <button onClick={() => navigate('/')} className="text-brand font-bold uppercase tracking-widest text-xs hover:underline">
          Retour au tableau de bord
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in slide-in-from-right-4 duration-500 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 border-b border-gray-100 pb-6 mb-2">
        <button 
          onClick={() => navigate('/')} 
          className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 active:scale-95 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight uppercase">{request.id}</h2>
            <span className={cn(
              "text-[10px] font-bold px-2 py-0.5 rounded-full ring-1 ring-inset uppercase tracking-widest",
              request.statusColor
            )}>
              {request.status}
            </span>
          </div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider italic">
            Flux {request.process} • Soumis le {request.date}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Approval Steps Tracking */}
          <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-brand-light text-brand rounded-xl flex items-center justify-center font-bold">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 uppercase">Suivi du flux d'approbation</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Temps réel - Circuit Validation BRASIMBA</p>
              </div>
            </div>

            <div className="relative pl-10 space-y-10">
              <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-gray-100" />
              {request.approvalSteps.map((step, i) => (
                <div key={i} className="relative">
                  <div className={cn(
                    "absolute -left-10 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center transition-all shadow-sm",
                    step.status === 'completed' ? "bg-green-500 text-white z-10" :
                    step.status === 'current' ? "bg-brand text-white z-10 animate-pulse ring-4 ring-brand/10" :
                    "bg-gray-100 text-gray-400 z-0"
                  )}>
                    {step.status === 'completed' ? <CheckCircle2 size={16} /> : i + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <p className={cn(
                        "text-sm font-bold uppercase tracking-tight",
                        step.status === 'pending' ? "text-gray-400" : "text-gray-900"
                      )}>
                        {step.label}
                      </p>
                      {step.date && (
                        <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded italic">
                          {step.date}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">
                      Rôle: {step.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SAP Details (if available) */}
          {request.sapDetails && (
            <section className="bg-orange-50/20 rounded-3xl p-8 border border-orange-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-orange-100">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 uppercase">Informations SAP (BC Émis)</h3>
                  <p className="text-[10px] text-orange-600 font-bold uppercase tracking-widest">Édition Service Commande</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/50 p-6 rounded-2xl border border-orange-50">
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">N° Bon de Commande</p>
                  <p className="text-sm font-mono font-black text-gray-900">{request.sapDetails.poNumber}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Opérateur SAP</p>
                  <p className="text-sm font-black text-gray-700">{request.sapDetails.operatorName}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Date Échéance</p>
                  <p className="text-sm font-black text-gray-700">{request.sapDetails.expiryDate}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Centre Distribution</p>
                  <p className="text-sm font-black text-gray-700">{request.sapDetails.distributionCenter}</p>
                </div>
                {request.sapDetails.sapClientCode && (
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Code Client SAP</p>
                    <p className="text-sm font-black text-gray-700">{request.sapDetails.sapClientCode}</p>
                  </div>
                )}
                {request.sapDetails.signature && (
                  <div className="md:col-span-2 pt-4 border-t border-orange-50">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Signature Responsable</p>
                    <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-center">
                       <img src={request.sapDetails.signature} alt="Signature" className="max-h-20 opacity-80" />
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Historical Changes */}
          <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
                <HistoryIcon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 uppercase">Historique des changements</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Audit Trail - Actions consignées</p>
              </div>
            </div>

            <div className="space-y-4">
              {request.history.map((item, i) => (
                <div key={i} className="flex gap-4 p-5 bg-gray-50/50 rounded-2xl border border-gray-100 group hover:bg-white hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-white rounded-2xl border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-brand transition-colors shadow-sm shrink-0 font-bold uppercase tracking-tighter italic">
                    {item.updatedBy.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-xs font-bold text-gray-900 uppercase tracking-tight">{item.status}</p>
                      <span className="text-[10px] font-mono text-gray-400 italic">{item.updatedAt}</span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-bold mb-2 uppercase tracking-widest">
                      Par {item.updatedBy}
                    </p>
                    {item.comment && (
                      <p className="text-[11px] text-gray-700 bg-white p-3 rounded-xl border border-gray-100 italic leading-relaxed">
                        "{item.comment}"
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-8">
          <section className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 border-b pb-4">Détails Demandeur</h4>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 shadow-inner">
                  <User size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Demandeur Principal</p>
                  <p className="text-sm font-bold text-gray-900 leading-tight">{request.applicant}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 shadow-inner">
                  <FileText size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Bénéficiaire Final</p>
                  <p className="text-sm font-bold text-gray-900 leading-tight">{request.beneficiary}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-brand rounded-3xl p-8 text-white shadow-xl shadow-brand/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <Clock className="mb-4 opacity-50" size={32} />
            <h4 className="text-xs font-bold uppercase tracking-widest mb-1 opacity-80">Rappel Logistique</h4>
            <p className="text-2xl font-black mb-4 uppercase tracking-tight">Délai DG: 24H</p>
            <p className="text-[10px] leading-relaxed opacity-90 uppercase font-bold tracking-wider italic">
              Toutes les demandes de gratuits commerciaux doivent être validées sous 24h par la Direction Générale avant expédition.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
