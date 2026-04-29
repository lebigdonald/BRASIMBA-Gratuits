/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CheckSquare, 
  Search, 
  Plus, 
  Trash2, 
  ArrowRight, 
  ChevronLeft,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';
import { ProcessType, Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface RequestFormProps {
  type: ProcessType;
  onBack: () => void;
  onSubmit: (data: any) => void;
}

export const RequestForm = ({ type, onBack, onSubmit }: RequestFormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    beneficiary: '',
    beneficiaryCategory: '',
    reason: '',
    categoryDemandeur: 'Commercial Bières (CB)',
  });
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.beneficiary) newErrors.beneficiary = 'Le bénéficiaire est requis';
    if (!formData.beneficiaryCategory) newErrors.beneficiaryCategory = 'La catégorie est requise';
    if (!formData.reason) newErrors.reason = 'Le motif est requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    if (selectedProducts.length === 0) {
      alert('Veuillez sélectionner au moins un produit.');
      return false;
    }
    const hasInvalidQty = selectedProducts.some(p => p.requested <= 0);
    if (hasInvalidQty) {
      alert('Toutes les quantités doivent être supérieures à 0.');
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
    else if (step === 3) setStep(4);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const addProduct = (p: Product) => {
    if (selectedProducts.find(item => item.id === p.id)) return;
    setSelectedProducts([...selectedProducts, { ...p, requested: 1 }]);
  };

  const updateQty = (id: string, qty: number) => {
    setSelectedProducts(selectedProducts.map(p => 
      p.id === id ? { ...p, requested: qty } : p
    ));
  };

  const removeProduct = (id: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== id));
  };

  const totalCasiers = selectedProducts.reduce((acc, p) => acc + p.requested, 0);

  const steps = [
    { n: 1, label: 'Demandeur', desc: 'Infos générales' },
    { n: 2, label: 'Produits', desc: 'Catalogue SAP' },
    { n: 3, label: 'Validation', desc: 'Récapitulatif' },
    { n: 4, label: 'Terminé', desc: 'Confirmation' },
  ];

  if (step === 4) {
    return (
      <div className="flex flex-col items-center justify-center p-12 animate-in zoom-in-95 duration-500 min-h-screen">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100">
          <CheckSquare size={40} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2 uppercase tracking-tight">Demande soumise !</h2>
        <p className="text-gray-500 mb-8 font-medium">Votre demande a été envoyée pour approbation. Réf: #DCM-2026-00042</p>
        <button 
          onClick={onBack}
          className="bg-brand text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-dark transition-all uppercase tracking-widest text-xs"
        >
          Retour au tableau de bord
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 min-h-[calc(100vh-64px)] animate-in slide-in-from-right-8 duration-500">
      {/* Stepper Sidebar */}
      <div className="w-full lg:w-72 bg-white border-r border-gray-200 p-6 md:p-8 pt-12 space-y-8 flex flex-col shrink-0">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={onBack} className="p-2 hover:bg-gray-50 rounded-lg text-gray-400">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900 leading-tight uppercase">Flux {type}</h2>
            <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mt-0.5">Demande de Gratuits</p>
          </div>
        </div>

        <div className="space-y-8 relative flex-1">
          <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-100 hidden lg:block" />
          {steps.map((s) => (
            <div key={s.n} className="flex gap-4 relative z-10 items-center lg:items-start">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all border-2",
                step > s.n ? "bg-green-500 border-green-500 text-white" : 
                step === s.n ? "bg-brand border-brand text-white shadow-lg shadow-brand/20 scale-110" : 
                "bg-white border-gray-100 text-gray-300"
              )}>
                {step > s.n ? <CheckSquare size={16} /> : s.n}
              </div>
              <div className="hidden lg:block">
                <p className={cn("text-xs font-bold leading-tight uppercase tracking-tight", step === s.n ? "text-gray-900" : "text-gray-400")}>{s.label}</p>
                <p className="text-[10px] text-gray-500 font-medium">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-8 md:space-y-12">
          {step === 1 && (
            <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
                <div className="w-10 h-10 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-bold text-gray-900 uppercase">Informations du demandeur</h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Synchronisation Active Directory</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Demandeur</label>
                  <input readOnly value="Francis Kabamba" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 cursor-not-allowed" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Catégorie demandeur</label>
                  <select 
                    value={formData.categoryDemandeur}
                    onChange={(e) => setFormData({...formData, categoryDemandeur: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:border-brand outline-none transition-all"
                  >
                    <option>Commercial Bières (CB)</option>
                    <option>Commercial Softs (CS)</option>
                    <option>Marketing / Events</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                    Bénéficiaire <span className="text-red-500">*</span>
                  </label>
                  <input 
                    placeholder="Ex : MKT Even & Spon" 
                    value={formData.beneficiary}
                    onChange={(e) => setFormData({...formData, beneficiary: e.target.value})}
                    className={cn(
                      "w-full bg-white border rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:border-brand outline-none transition-all",
                      errors.beneficiary ? "border-red-500" : "border-gray-200"
                    )}
                  />
                  {errors.beneficiary && <p className="text-[10px] text-red-500 font-bold italic">{errors.beneficiary}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Catégorie bénéficiaire <span className="text-red-500">*</span></label>
                  <select 
                    value={formData.beneficiaryCategory}
                    onChange={(e) => setFormData({...formData, beneficiaryCategory: e.target.value})}
                    className={cn(
                      "w-full bg-white border rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:border-brand outline-none transition-all",
                      errors.beneficiaryCategory ? "border-red-500" : "border-gray-200"
                    )}
                  >
                    <option value="">Sélectionner...</option>
                    <option value="HORECA">HORECA Development</option>
                    <option value="Association">Association Locale</option>
                    <option value="Distributeur">Distributeur</option>
                    <option value="Interne">Service Interne</option>
                  </select>
                  {errors.beneficiaryCategory && <p className="text-[10px] text-red-500 font-bold italic">{errors.beneficiaryCategory}</p>}
                </div>
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Motif détaillé de la demande <span className="text-red-500">*</span></label>
                  <textarea 
                    rows={4} 
                    placeholder="Justification détaillée pour validation..." 
                    value={formData.reason}
                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                    className={cn(
                      "w-full bg-white border rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:border-brand outline-none transition-all resize-none",
                      errors.reason ? "border-red-500" : "border-gray-200"
                    )}
                  />
                  {errors.reason && <p className="text-[10px] text-red-500 font-bold italic">{errors.reason}</p>}
                </div>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
                <div className="w-10 h-10 bg-brand-light text-brand rounded-xl flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-bold text-gray-900 uppercase">Catalogue des Produits SAP</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Temps réel - Entrepôt Lubumbashi</p>
                </div>
              </div>

              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand transition-colors" size={20} />
                <div className="flex gap-4">
                  <input placeholder="Rechercher par code SAP ou désignation article..." className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 text-sm font-bold focus:border-brand outline-none bg-gray-50/50" />
                  <button className="bg-gray-900 text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-black transition-all text-xs uppercase tracking-widest">
                    Rechercher
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_PRODUCTS.map(p => (
                  <button 
                    key={p.id}
                    onClick={() => addProduct(p)}
                    disabled={selectedProducts.some(item => item.id === p.id)}
                    className={cn(
                      "p-4 rounded-2xl border text-left transition-all",
                      selectedProducts.some(item => item.id === p.id) 
                        ? "bg-gray-50 border-gray-100 opacity-50 cursor-not-allowed" 
                        : "bg-white border-gray-100 hover:border-brand hover:shadow-md active:scale-95"
                    )}
                  >
                    <p className="text-xs font-bold text-gray-900 mb-1">{p.designation}</p>
                    <div className="flex justify-between items-end">
                      <p className="text-[10px] text-gray-400 font-mono">SAP: {p.sapCode}</p>
                      <p className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded uppercase">Stock: {p.stock}</p>
                    </div>
                  </button>
                ))}
              </div>

              {selectedProducts.length > 0 && (
                <div className="overflow-hidden border border-gray-100 rounded-3xl shadow-inner">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <tr>
                        <th className="px-6 py-4">Article</th>
                        <th className="px-6 py-4 text-center">Quantité</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {selectedProducts.map((p) => (
                        <tr key={p.id} className="text-sm font-bold group">
                          <td className="px-6 py-4">
                            <p className="text-gray-900">{p.designation}</p>
                            <p className="text-[10px] text-gray-400 font-mono uppercase tracking-tighter italic">Cnd: {p.conditionnement}</p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-3">
                              <button 
                                onClick={() => updateQty(p.id, Math.max(1, p.requested - 1))}
                                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 active:scale-90"
                              >-</button>
                              <input 
                                type="number" 
                                value={p.requested} 
                                onChange={(e) => updateQty(p.id, parseInt(e.target.value) || 0)}
                                className="w-12 text-center border-none font-bold text-gray-800 bg-transparent outline-none" 
                              />
                              <button 
                                onClick={() => updateQty(p.id, p.requested + 1)}
                                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 active:scale-90"
                              >+</button>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={() => removeProduct(p.id)}
                              className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="bg-brand text-white p-6 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold uppercase opacity-80 tracking-widest mb-1">Résumé Logistique</p>
                      <p className="text-lg font-bold uppercase">Volume Total à Charger</p>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-black leading-none">{totalCasiers}</p>
                      <p className="text-[10px] uppercase font-bold opacity-80 mt-1 tracking-widest italic">Casiers / Unités</p>
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}

          {step === 3 && (
            <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-bold text-gray-900 uppercase">Récapitulatif & Validation</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">Vérification des informations avant soumission</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b pb-1">Détails de la demande</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold mb-0.5">Bénéficiaire</p>
                      <p className="text-sm font-bold text-gray-900">{formData.beneficiary}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold mb-0.5">Catégorie</p>
                      <p className="text-sm font-bold text-gray-900">{formData.beneficiaryCategory}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold mb-0.5">Motif</p>
                      <p className="text-sm font-medium text-gray-700 leading-relaxed italic">"{formData.reason}"</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b pb-1">Liste des articles ({selectedProducts.length})</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {selectedProducts.map(p => (
                      <div key={p.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold text-gray-900 truncate">{p.designation}</p>
                          <p className="text-[8px] text-gray-400 font-mono">{p.sapCode}</p>
                        </div>
                        <p className="text-xs font-black text-brand ml-4">x{p.requested}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-dashed border-gray-200">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-[10px] text-gray-500 uppercase">Total Logistique</span>
                      <span className="text-lg text-gray-900 uppercase">{totalCasiers} Casiers</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-5 flex gap-4">
                <AlertCircle className="text-yellow-600 shrink-0" size={24} />
                <p className="text-[11px] text-yellow-800 font-medium leading-relaxed italic">
                  En soumettant cette demande, vous certifiez que les informations fournies sont exactes. 
                  Le flux d'approbation sera déclenché instantanément vers le Responsable DCM et le CDG. 
                  Délai moyen constaté pour ce type de flux : <span className="font-bold underline">24.5 heures</span>.
                </p>
              </div>
            </section>
          )}

          <footer className="flex justify-between items-center pt-8 border-t border-gray-100">
            <button 
              onClick={step === 1 ? onBack : prevStep} 
              className="text-xs font-bold text-gray-400 hover:text-brand uppercase tracking-widest transition-colors flex items-center gap-2 group"
            >
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              {step === 1 ? 'Annuler la demande' : 'Étape précédente'}
            </button>
            <div className="flex gap-4">
              {step < 3 ? (
                <button 
                  onClick={nextStep}
                  className="px-10 py-3.5 rounded-2xl bg-brand text-white text-xs font-bold flex items-center gap-3 hover:bg-brand-dark transition-all shadow-xl shadow-brand/20 uppercase tracking-widest active:scale-95 group"
                >
                  Continuer
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button 
                  onClick={nextStep}
                  className="px-12 py-4 rounded-2xl bg-green-600 text-white text-xs font-bold flex items-center gap-3 hover:bg-green-700 transition-all shadow-xl shadow-green-600/20 uppercase tracking-widest active:scale-95"
                >
                  Confirmer & Envoyer
                  <CheckSquare size={18} />
                </button>
              )}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
