import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, FileText, CheckCircle, ChevronRight, Info, ExternalLink, Printer, Send, Save, Edit3, AlertCircle, Loader2 } from 'lucide-react';
import SignaturePad from 'react-signature-canvas';
import { RECENT_REQUESTS } from '../constants';
import { Request } from '../types';

interface SAPFormState {
  poNumber: string;
  distributionCenter: string;
  operatorName: string;
  expiryDate: string;
  clientReference: string;
  sapClientCode: string;
  signature: string;
}

const SAPEdition: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'A éditer' | 'BC émis' | 'Clôturés'>('A éditer');
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(RECENT_REQUESTS[0]?.id || null);
  const [formData, setFormData] = useState<SAPFormState>({
    poNumber: '',
    distributionCenter: 'P015 BRAS USINE LUBUMBASHI',
    operatorName: '',
    expiryDate: '',
    clientReference: '',
    sapClientCode: '',
    signature: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SAPFormState, string>>>({});
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sigPad = useRef<SignaturePad | null>(null);

  const entriesRequested = RECENT_REQUESTS.filter(r => r.process === 'DCM');
  const selectedRequest = RECENT_REQUESTS.find(req => req.id === selectedRequestId);

  // Load draft from local storage when selected request changes
  useEffect(() => {
    if (selectedRequestId) {
      const savedDraft = localStorage.getItem(`sap-draft-${selectedRequestId}`);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        setFormData(parsed);
        if (parsed.signature && sigPad.current) {
          // SignaturePad initialization can be tricky with dataURL
          setTimeout(() => {
            if (sigPad.current) {
              sigPad.current.fromDataURL(parsed.signature);
            }
          }, 100);
        }
      } else {
        setFormData({
          poNumber: '',
          distributionCenter: 'P015 BRAS USINE LUBUMBASHI',
          operatorName: '',
          expiryDate: '',
          clientReference: '',
          sapClientCode: '',
          signature: '',
        });
        sigPad.current?.clear();
      }
      setErrors({});
    }
  }, [selectedRequestId]);

  // Auto-save logic
  useEffect(() => {
    if (!selectedRequestId) return;

    const timer = setTimeout(() => {
      setAutoSaveStatus('saving');
      localStorage.setItem(`sap-draft-${selectedRequestId}`, JSON.stringify(formData));
      setTimeout(() => setAutoSaveStatus('saved'), 500);
      setTimeout(() => {
        setAutoSaveStatus('idle');
      }, 3000);
    }, 2000); // 2 second debounce for auto-save

    return () => clearTimeout(timer);
  }, [formData, selectedRequestId]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof SAPFormState, string>> = {};

    if (!formData.poNumber) {
      newErrors.poNumber = 'Le numéro BC est obligatoire';
    } else if (!/^\d{10}$/.test(formData.poNumber)) {
      newErrors.poNumber = 'Le numéro BC doit contenir exactement 10 chiffres';
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = "La date d'échéance est obligatoire";
    }

    if (!formData.operatorName) {
      newErrors.operatorName = "Le nom de l'opérateur est obligatoire";
    }

    if (formData.sapClientCode && !/^\d+$/.test(formData.sapClientCode)) {
      newErrors.sapClientCode = 'Le code client SAP doit être numérique';
    }

    if (!formData.signature) {
      newErrors.signature = 'La signature est obligatoire';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof SAPFormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const clearSignature = () => {
    sigPad.current?.clear();
    setFormData(prev => ({ ...prev, signature: '' }));
  };

  const handleSignatureEnd = () => {
    if (sigPad.current) {
      const dataURL = sigPad.current.getTrimmedCanvas().toDataURL('image/png');
      setFormData(prev => ({ ...prev, signature: dataURL }));
      setErrors(prev => ({ ...prev, signature: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    
    // Success handling
    localStorage.removeItem(`sap-draft-${selectedRequestId}`);
    alert('Bon de commande SAP émis avec succès !');
  };

  return (
    <div className="flex flex-col h-full space-y-6 pt-4 pb-8">
      <header className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-sans tracking-tight">Édition Bon de Commande SAP</h1>
            <p className="text-sm text-gray-500">
              4 demandes validées en attente d'édition BC • Service Commande
            </p>
          </div>
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {autoSaveStatus !== 'idle' && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg shadow-sm"
                >
                  {autoSaveStatus === 'saving' ? (
                    <Loader2 className="h-3 w-3 animate-spin text-orange-600" />
                  ) : (
                    <CheckCircle className="h-3 w-3 text-green-500" />
                  )}
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    {autoSaveStatus === 'saving' ? 'Brouillon...' : 'Enregistré'}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
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
        {/* Master List (4 columns) */}
        <div className="lg:col-span-4 flex flex-col min-h-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Demandes validées</h3>
            <span className="text-[10px] text-gray-400 flex items-center gap-1 font-bold"><Info className="h-3 w-3" /> TRIPLE VALIDATION OK</span>
          </div>
          
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50 scrollbar-thin">
            {entriesRequested.map((req) => (
              <button
                key={req.id}
                onClick={() => setSelectedRequestId(req.id)}
                className={`w-full text-left p-4 flex gap-3 transition-all outline-none ${
                  selectedRequestId === req.id ? 'bg-orange-50/30 border-l-4 border-orange-500' : 'hover:bg-gray-50'
                }`}
              >
                <div className={`h-11 w-11 min-w-[2.75rem] rounded-xl flex items-center justify-center font-black text-xs ${
                    req.process === 'DCM' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'bg-green-100 text-green-700 shadow-sm'
                }`}>
                  {req.beneficiary.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[10px] font-mono font-bold text-gray-400">{req.id}</span>
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-tighter">{req.process}</span>
                  </div>
                  <h4 className="text-sm font-black text-gray-900 truncate tracking-tight">{req.beneficiary}</h4>
                  <p className="text-[10px] text-gray-500 mt-1 font-bold">
                    {req.products.length} produits • {req.products.reduce((acc, p) => acc + p.requested, 0)} casiers
                  </p>
                </div>
                <div className="ml-auto flex flex-col items-end justify-between py-1">
                   <span className="text-[10px] text-gray-400 font-bold">20/04</span>
                   {selectedRequestId === req.id && <ChevronRight className="h-4 w-4 text-orange-500" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail Form (8 columns) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          {selectedRequest ? (
            <>
              <div className="p-6 border-b border-gray-100 flex flex-wrap gap-8 items-start bg-gray-50/20">
                 <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-3 mb-2">
                       <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-black uppercase tracking-widest">{selectedRequest.process}</span>
                       <span className="text-green-600 text-[10px] font-black flex items-center gap-1 uppercase tracking-widest">
                         <CheckCircle className="h-3 w-3 shadow-sm" /> Validation ✓
                       </span>
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 mb-1 tracking-tighter">{selectedRequest.beneficiary}</h2>
                    <p className="text-xs text-gray-500 font-bold opacity-60">Animation commerciale • {selectedRequest.applicant}</p>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                    <div>
                       <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Demandeur</p>
                       <p className="text-xs font-black text-gray-600">{selectedRequest.applicant}</p>
                    </div>
                    <div>
                       <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Catégorie</p>
                       <p className="text-xs font-black text-gray-600">Promotionnel</p>
                    </div>
                    <div>
                       <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Validé CdG</p>
                       <p className="text-xs font-black text-gray-600">19/04 • 09:30</p>
                    </div>
                    <div>
                       <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Validé DG</p>
                       <p className="text-xs font-black text-gray-600">20/04 • 11:15</p>
                    </div>
                 </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-thin">
                {/* Product Section */}
                <section>
                   <div className="flex items-center justify-between mb-5">
                      <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Articles à commander</h3>
                      <span className="text-[10px] px-2 py-1 bg-gray-100 rounded-lg text-gray-500 font-black uppercase tracking-tighter">
                        {selectedRequest.products.reduce((acc, p) => acc + p.requested, 0)} casiers total
                      </span>
                   </div>
                   <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50/50">
                          <tr>
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Code SAP</th>
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Désignation</th>
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Cond.</th>
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Qté</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {selectedRequest.products.map((p, idx) => (
                             <tr key={idx} className="group hover:bg-gray-50/50 transition-colors">
                               <td className="px-6 py-4 font-mono font-bold text-gray-900 text-xs">{p.sapCode}</td>
                               <td className="px-6 py-4 text-xs font-black text-gray-700 uppercase tracking-tight">{p.designation}</td>
                               <td className="px-6 py-4 text-center text-[10px] text-gray-500 font-black tracking-widest uppercase">{p.conditionnement}</td>
                               <td className="px-6 py-4 text-right font-black text-gray-900 text-sm">{p.requested}</td>
                             </tr>
                          ))}
                        </tbody>
                      </table>
                   </div>
                </section>

                {/* SAP Info Section */}
                <section className="bg-orange-50/20 rounded-3xl p-8 border border-orange-100 space-y-6">
                   <div className="flex items-start gap-4 mb-2">
                       <div className="bg-orange-600 p-2.5 rounded-xl shadow-lg shadow-orange-100">
                          <FileText className="h-5 w-5 text-white" />
                       </div>
                       <div className="flex-1">
                          <h4 className="text-base font-black text-gray-900 tracking-tight">Saisie des données SAP</h4>
                          <p className="text-[10px] text-orange-600 mt-1 uppercase font-black tracking-widest opacity-80">Informations obligatoires pour émission BC</p>
                       </div>
                   </div>

                   <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-4 text-xs text-blue-700 leading-relaxed font-bold">
                      <ExternalLink className="h-5 w-5 shrink-0 text-blue-400" />
                      <span>Ouvrir SAP → Transaction <span className="font-black text-blue-800 underline decoration-blue-200">ME21N</span> → Créer le PO → Copier le numéro BC généré çi-dessous.</span>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-2">
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center justify-between">
                          Numéro Bon de Commande SAP <span className="text-red-500">*</span>
                        </label>
                        <input 
                           type="text" 
                           name="poNumber"
                           value={formData.poNumber}
                           onChange={handleInputChange}
                           placeholder="Ex: 5100540835" 
                           className={`w-full h-14 bg-white border rounded-2xl px-6 text-base font-mono font-black focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none shadow-sm transition-all placeholder:text-gray-200 ${
                             errors.poNumber ? 'border-red-500 bg-red-50/30' : 'border-gray-100'
                           }`}
                        />
                        {errors.poNumber ? (
                          <p className="text-[10px] text-red-500 flex items-center gap-1.5 font-black animate-pulse">
                            <AlertCircle className="h-4 w-4" /> {errors.poNumber}
                          </p>
                        ) : (
                          <p className="text-[10px] text-gray-400 font-bold opacity-60">Doit contenir exactement 10 caractères numériques</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Centre de distribution</label>
                        <input 
                           type="text" 
                           name="distributionCenter"
                           value={formData.distributionCenter}
                           readOnly
                           className="w-full h-12 bg-gray-50 border border-gray-50 rounded-2xl px-5 text-[11px] font-black text-gray-400 uppercase tracking-widest shadow-inner cursor-not-allowed"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Nom Opérateur SAP <span className="text-red-500">*</span></label>
                        <input 
                           type="text" 
                           name="operatorName"
                           value={formData.operatorName}
                           onChange={handleInputChange}
                           placeholder="Fifi Mukonkole" 
                           className={`w-full h-12 bg-white border rounded-2xl px-5 text-xs font-black focus:ring-4 focus:ring-orange-500/10 outline-none transition-all ${
                             errors.operatorName ? 'border-red-500 bg-red-50/30' : 'border-gray-100'
                           }`}
                        />
                        {errors.operatorName && <p className="text-[10px] text-red-500 font-black">{errors.operatorName}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Date Échéance <span className="text-red-500">*</span></label>
                        <input 
                           type="date" 
                           name="expiryDate"
                           value={formData.expiryDate}
                           onChange={handleInputChange}
                           className={`w-full h-12 bg-white border rounded-2xl px-5 text-xs font-black focus:ring-4 focus:ring-orange-500/10 outline-none transition-all ${
                             errors.expiryDate ? 'border-red-500 bg-red-50/30' : 'border-gray-100'
                           }`}
                        />
                        {errors.expiryDate && <p className="text-[10px] text-red-500 font-black">{errors.expiryDate}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Référence client</label>
                        <input 
                           type="text" 
                           name="clientReference"
                           value={formData.clientReference}
                           onChange={handleInputChange}
                           placeholder="Ex : N°61935 BARCELOS" 
                           className="w-full h-12 bg-white border border-gray-100 rounded-2xl px-5 text-xs font-black focus:ring-4 focus:ring-orange-500/10 outline-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Code Client SAP</label>
                        <input 
                           type="text" 
                           name="sapClientCode"
                           value={formData.sapClientCode}
                           onChange={handleInputChange}
                           placeholder="Ex : 48583" 
                           className={`w-full h-12 bg-white border rounded-2xl px-5 text-xs font-black focus:ring-4 focus:ring-orange-500/10 outline-none transition-all ${
                             errors.sapClientCode ? 'border-red-500 bg-red-50/30' : 'border-gray-100'
                           }`}
                        />
                        {errors.sapClientCode && <p className="text-[10px] text-red-500 font-black">{errors.sapClientCode}</p>}
                      </div>
                   </div>

                   {/* Signature Wall */}
                   <div className="pt-6 space-y-4">
                       <div className="flex items-center justify-between">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                            <Edit3 className="h-4 w-4 text-orange-600" /> Signature Électronique <span className="text-red-500">*</span>
                          </label>
                          <button 
                            onClick={clearSignature}
                            className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-red-100 transition-colors"
                          >
                            Réinitialiser
                          </button>
                       </div>
                       <div className={`relative border-2 border-dashed rounded-3xl overflow-hidden bg-white shadow-inner transition-all hover:border-orange-200 group ${
                         errors.signature ? 'border-red-500 bg-red-50' : 'border-gray-200'
                       }`}>
                          <SignaturePad
                            ref={sigPad}
                            canvasProps={{
                              className: "w-full h-40 cursor-crosshair"
                            }}
                            onEnd={handleSignatureEnd}
                          />
                          {!formData.signature && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity">
                               <Send className="h-8 w-8 text-gray-400" />
                               <span className="text-[10px] font-black uppercase tracking-[0.3em] mt-3">Signer dans cet espace</span>
                            </div>
                          )}
                       </div>
                       {errors.signature && (
                         <p className="text-[10px] text-red-500 font-black flex items-center gap-1.5">
                           <AlertCircle className="h-4 w-4" /> {errors.signature}
                         </p>
                       )}
                   </div>
                </section>
              </div>

              <div className="p-8 bg-white border-t border-gray-100 flex gap-5">
                 <button 
                   onClick={() => alert(`Brouillon forcé : ${selectedRequest.id}`)}
                   className="flex-1 h-16 bg-white border border-gray-100 text-gray-400 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-gray-50 hover:text-gray-900 transition-all active:scale-95 flex items-center justify-center gap-3"
                 >
                    <Save className="h-5 w-5" /> Brouillon
                 </button>
                 <button 
                   onClick={handleSubmit}
                   disabled={isSubmitting}
                   className="flex-[2] h-16 bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-orange-100 hover:bg-orange-700 hover:shadow-orange-200 transition-all active:scale-95 hover:-translate-y-0.5 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                 >
                    {isSubmitting ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <Printer className="h-6 w-6" />
                    )}
                    <span>{isSubmitting ? 'Traitement SAP...' : 'Émettre le BC SAP'}</span>
                 </button>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center opacity-30 text-center gap-5 p-12">
               <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                  <FileText className="h-10 w-10 text-gray-300" />
               </div>
               <div>
                  <p className="font-black text-gray-900 uppercase tracking-widest text-sm mb-1">Aucune sélection</p>
                  <p className="text-xs text-gray-400 font-bold">Sélectionner une demande dans la liste de gauche pour traiter l'édition SAP</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SAPEdition;
