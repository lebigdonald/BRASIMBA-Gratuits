/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  CheckSquare, 
  History, 
  BarChart3, 
  Plus, 
  Bell, 
  Search, 
  ChevronRight,
  AlertCircle,
  Clock,
  Package,
  User,
  LogOut,
  Building2,
  Users,
  Heart,
  ArrowRight,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { cn } from './lib/utils';
import { Request, Product, ProcessType } from './types';

// --- Mock Data ---
const RECENT_REQUESTS: Request[] = [
  { id: 'DG-2026-00018', process: 'DCM', beneficiary: 'MKT Even & Spon', status: 'Val. R.DCM', statusColor: 'bg-orange-100 text-orange-700', date: '12/04' },
  { id: 'RH-2026-00009', process: 'RH', beneficiary: 'Mukeba Jean', status: 'Val. CdG', statusColor: 'bg-yellow-100 text-yellow-700', date: '14/04' },
  { id: 'RSE-2026-00004', process: 'RSE', beneficiary: 'Asso. Espoir', status: 'Att. DG (2h!)', statusColor: 'bg-red-100 text-red-700', date: '20/04' },
  { id: 'DG-2026-00017', process: 'DCM', beneficiary: 'Bureau DCM', status: 'BC Édité', statusColor: 'bg-pink-100 text-pink-700', date: '11/04' },
  { id: 'RH-2026-00008', process: 'RH', beneficiary: 'Kabila Séraphine', status: 'Clôturé', statusColor: 'bg-green-100 text-green-700', date: '07/04' },
  { id: 'DG-2026-00016', process: 'DCM', beneficiary: 'Barcelos OUV', status: 'Clôturé', statusColor: 'bg-green-100 text-green-700', date: '08/04' },
];

const CHART_DATA = [
  { name: 'COMMERCIAL', value: 18, color: '#0ea5e9' },
  { name: 'PERSONNEL', value: 9, color: '#22c55e' },
  { name: 'MÉCÉNAT', value: 4, color: '#6366f1' },
];

// --- Components ---

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord', badge: null },
    { id: 'new', icon: FileText, label: 'Nouvelle demande', badge: null },
    { id: 'my-requests', icon: FileText, label: 'Mes demandes', badge: 4 },
    { id: 'approvals', icon: CheckSquare, label: 'Approbations', badge: 5 },
  ];

  const processusItems = [
    { id: 'dcm', label: 'Commercial (DCM)', color: 'bg-sky-500' },
    { id: 'rh', label: 'Personnel (RH)', color: 'bg-green-500' },
    { id: 'rse', label: 'Mécénat (RSE)', color: 'bg-indigo-500' },
  ];

  return (
    <aside className="w-64 border-r border-gray-200 bg-white flex flex-col h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-4 flex items-center gap-3 border-b border-gray-100 mb-4">
        <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center text-white font-bold text-xl">B</div>
        <div>
          <h1 className="text-sm font-bold text-gray-900 leading-tight uppercase">BRASIMBA</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Gestion des gratuits</p>
        </div>
      </div>

      <div className="px-4 mb-4">
        <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
          <p className="text-[10px] uppercase text-orange-600 font-bold mb-1">Rôle actif</p>
          <p className="text-sm font-semibold text-orange-950">Agent DCM</p>
        </div>
      </div>

      <nav className="flex-1 px-2 space-y-1">
        <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Menu</p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              activeTab === item.id 
                ? "bg-brand-light text-brand" 
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon size={18} />
              {item.label}
            </div>
            {item.badge && (
              <span className="bg-brand text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </button>
        ))}

        <div className="pt-6">
          <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Processus</p>
          {processusItems.map((item) => (
            <button
              key={item.id}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <div className={cn("w-2 h-2 rounded-full", item.color)} />
              {item.label}
            </button>
          ))}
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-100">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors">
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
};

const Header = ({ onNewRequest }: { onNewRequest: () => void }) => {
  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-8">
        <nav className="flex items-center gap-1">
          {['Tableau de bord', 'Nouvelle demande', 'Approbations', 'Historique'].map((label, i) => (
            <button 
              key={label}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                i === 0 ? "bg-brand text-white shadow-sm shadow-brand/20" : "text-gray-500 hover:text-gray-900"
              )}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white font-bold">FK</div>
      </div>
    </header>
  );
};

const Dashboard = ({ onNewRequest }: { onNewRequest: () => void }) => {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 leading-tight uppercase tracking-tight">Tableau de bord</h2>
          <p className="text-sm text-gray-500">Lundi 20 avril 2026 — BRASIMBA Lubumbashi</p>
        </div>
        <button 
          onClick={onNewRequest}
          className="bg-brand hover:bg-brand-dark text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold transition-all shadow-lg shadow-brand/20 active:scale-95"
        >
          <Plus size={20} />
          Nouvelle demande
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {['Tous les processus', 'Commercial DCM', 'Personnel RH', 'Mécénat RSE'].map((label, i) => (
          <button 
            key={label}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-bold border transition-all",
              i === 0 ? "bg-brand text-white border-brand shadow-md shadow-brand/10" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            )}
          >
            <div className="flex items-center gap-2">
              {i > 0 && <div className={cn("w-1.5 h-1.5 rounded-full", i === 1 ? 'bg-sky-500' : i === 2 ? 'bg-green-500' : 'bg-indigo-500')} />}
              {label}
            </div>
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        {[
          { label: 'EN ATTENTE VALIDATION', value: '5', trend: '+2 depuis hier', color: 'border-orange-500' },
          { label: 'DEMANDES CE MOIS', value: '31', trend: 'DCM-18 / RH-9 / RSE-4', color: 'border-blue-500' },
          { label: 'CLÔTURÉES CE MOIS', value: '22', trend: 'Taux 71%', color: 'border-green-500' },
          { label: 'DÉLAI MOYEN', value: '7h', trend: 'Cibles : 24h / 24h / 2h', color: 'border-indigo-500' },
        ].map((stat, i) => (
          <div key={i} className={cn("bg-white p-5 rounded-xl border border-gray-100 shadow-sm border-l-4", stat.color)}>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900 tracking-tight">{stat.value}</span>
              <span className="text-[12px] font-medium text-gray-500">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Alert */}
      <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-4 items-start shadow-sm shadow-red-100/50">
        <div className="bg-red-500 text-white p-2 rounded-lg shadow-lg shadow-red-500/20">
          <AlertCircle size={20} />
        </div>
        <div>
          <p className="font-bold text-red-900 leading-tight">Escalade RSE imminente — RSE-2026-00004 - Association Espoir</p>
          <p className="text-xs text-red-700 mt-1">DG non répondu depuis 1h48 · Escalade DAF dans 12 min</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Table */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Demandes récentes</h3>
            <button className="text-xs font-bold text-brand hover:underline flex items-center gap-1">
              Voir tout <ChevronRight size={14} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="px-6 py-3">Réf ID</th>
                  <th className="px-6 py-3">Processus</th>
                  <th className="px-6 py-3">Demandeur</th>
                  <th className="px-6 py-3">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {RECENT_REQUESTS.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                    <td className="px-6 py-4 text-xs font-mono font-bold text-gray-600">{req.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{req.beneficiary}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">M. Lefebvre</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-1 rounded-full",
                        req.process === 'DCM' ? 'bg-sky-100 text-sky-700' : req.process === 'RH' ? 'bg-green-100 text-green-700' : 'bg-indigo-100 text-indigo-700'
                      )}>
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Charts/Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">Types de Processus</h2>
              <button className="p-1 hover:bg-gray-50 rounded text-gray-400 hover:text-gray-600">
                <Plus size={16} />
              </button>
            </div>
            <div className="space-y-3">
              {[
                { title: 'Workflow Approbation', desc: 'Standard ISO-9001 • 4 Etapes' },
                { title: 'Validation Technique', desc: 'Contrôle Qualité • 2 Etapes' },
                { title: 'Ressources Humaines', desc: 'Onboarding • 6 Etapes' },
                { title: 'Audit Interne', desc: 'Compliance • 3 Etapes' },
              ].map((item, i) => (
                <div key={i} className="p-3 bg-gray-50 border border-gray-100 rounded-lg hover:border-brand-light transition-all cursor-pointer group">
                  <p className="font-medium text-gray-800 text-sm group-hover:text-brand transition-colors">{item.title}</p>
                  <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">À approuver</h3>
              <button className="text-xs font-bold text-brand hover:underline">Tout voir</button>
            </div>
            <div className="space-y-3">
              {[
                { id: 'RSE-00004', label: 'Asso. Espoir', time: '1h48', urgent: true },
                { id: 'DG-2026-00018', label: 'Even & Spon', time: '2h', urgent: false },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                  <div className="w-9 h-9 rounded-md bg-orange-50 text-brand flex items-center justify-center font-bold text-[10px]">
                    {item.id.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-900 truncate">{item.id}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-gray-500">{item.time}</span>
                      {item.urgent && <span className="w-1 h-1 rounded-full bg-red-500" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProcessSelector = ({ onSelect }: { onSelect: (type: ProcessType) => void }) => {
  const types = [
    {
      id: 'DCM' as ProcessType,
      category: 'DCM · ANIMATION COMMERCIALE',
      title: 'Gratuits Commercial',
      description: 'Mise à disposition de produits dans le cadre d\'une animation commerciale — promo, développement, HORECA, distributeurs.',
      icon: Building2,
      iconColor: 'bg-sky-50 text-sky-600',
      borderColor: 'border-sky-500',
      bullets: [
        'Initié par un Agent DCM',
        'Sélection produits depuis le catalogue SAP',
        'Circuit : Resp.DCM → CdG → DG → Service Commande'
      ],
      delay: 'Délai DG : 24 heures max',
      delayColor: 'bg-sky-50 text-sky-700',
      buttonColor: 'bg-sky-600 hover:bg-sky-700'
    },
    {
      id: 'RH' as ProcessType,
      category: 'RH · DONS SOCIAUX',
      title: 'Gratuit Personnel',
      description: 'Don social accordé à un agent dans le cadre d\'un événement familial — mariage, naissance, décès ou autre événement reconnu.',
      icon: Users,
      iconColor: 'bg-green-50 text-green-600',
      borderColor: 'border-green-500',
      bullets: [
        'Initié par un Agent RH',
        'Pièce justificative obligatoire à joindre',
        'Circuit : DRH → CdG → DG → Distributeur'
      ],
      delay: 'Délai DG : 24 heures max',
      delayColor: 'bg-green-50 text-green-700',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    },
    {
      id: 'RSE' as ProcessType,
      category: 'RSE · MÉCÉNAT',
      title: 'Mécénat Eau Cristal',
      description: 'Don d\'Eau Cristal à une association externe ou dans le cadre d\'un événement ciblé. Cadre ISO 26000 — Soutien aux communautés.',
      icon: Heart,
      iconColor: 'bg-indigo-50 text-indigo-600',
      borderColor: 'border-indigo-500',
      bullets: [
        'Initié par le Responsable RSE',
        'Nom association + quantité + date événement',
        'Circuit : DG → Service Fête → Directrice Events'
      ],
      delay: 'Délai DG : 2 heures seulement',
      delayColor: 'bg-orange-50 text-orange-700',
      buttonColor: 'bg-indigo-600 hover:bg-indigo-700'
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-[calc(100vh-64px)] animate-in zoom-in-95 fade-in duration-500">
      <div className="text-center mb-12">
        <span className="px-3 py-1 bg-orange-50 text-brand text-[10px] font-bold rounded-full border border-orange-100 inline-flex items-center gap-2 mb-4">
          <Clock size={12} /> NOUVELLE DEMANDE
        </span>
        <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Quel type de demande ?</h2>
        <p className="text-gray-500 max-w-lg mx-auto">Sélectionnez le processus correspondant à votre demande. Le formulaire s'adaptera automatiquement.</p>
      </div>

      <div className="grid grid-cols-3 gap-8 w-full max-w-6xl">
        {types.map((type) => (
          <div key={type.id} className={cn("bg-white rounded-2xl shadow-sm border-t-4 p-8 flex flex-col transition-all hover:shadow-xl hover:-translate-y-1 group", type.borderColor)}>
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6", type.iconColor)}>
              <type.icon size={24} />
            </div>
            
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{type.category}</p>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{type.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">{type.description}</p>
            
            <ul className="space-y-3 mb-8 flex-1">
              {type.bullets.map((bullet, i) => (
                <li key={i} className="flex gap-2 text-xs font-medium text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5" />
                  {bullet}
                </li>
              ))}
            </ul>

            <div className={cn("px-4 py-2.5 rounded-lg flex items-center gap-3 mb-6 font-bold text-[10px] uppercase tracking-wide", type.delayColor)}>
              <Clock size={14} />
              {type.delay}
            </div>

            <button 
              onClick={() => onSelect(type.id)}
              className={cn("w-full py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]", type.buttonColor)}
            >
              Commencer la demande
              <ArrowRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const RequestForm = ({ type, onBack }: { type: ProcessType, onBack: () => void }) => {
  const [step, setStep] = useState(2);
  const [products, setProducts] = useState<Product[]>([
    { id: '1', sapCode: '100452', designation: 'SIMBA 33CL VP C/24', conditionnement: 'C/24', stock: 1240, requested: 10 },
    { id: '2', sapCode: '100489', designation: 'TEMBO 33CL VP C/24', conditionnement: 'C/24', stock: 420, requested: 5 },
    { id: '3', sapCode: '200112', designation: 'EAU CRISTAL 1.5L PET C/6', conditionnement: 'C/6', stock: 2100, requested: 12 },
  ]);

  const steps = [
    { n: 1, label: 'Informations demandeur', desc: 'Azure AD pré-rempli' },
    { n: 2, label: 'Produits SAP', desc: 'Catalogue + quantités' },
    { n: 3, label: 'Commentaires', desc: 'Optionnel' },
    { n: 4, label: 'Soumission', desc: 'Circuit validation' },
  ];

  const totalCasiers = products.reduce((acc, p) => acc + p.requested, 0);

  return (
    <div className="flex bg-gray-50 min-h-[calc(100vh-64px)] animate-in slide-in-from-right-8 fade-in duration-500">
      {/* Stepper Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 p-8 pt-12 space-y-8 min-h-screen flex flex-col shrink-0">
        <div className="flex gap-2 mb-4">
          <span className="px-2 py-0.5 bg-sky-100 text-sky-700 text-[10px] font-bold rounded uppercase">Commercial DCM</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 leading-tight">Nouvelle demande</h2>
          <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mt-1">Screen_FormulaireDCM</p>
        </div>

        <div className="space-y-8 relative flex-1">
          <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-100" />
          {steps.map((s) => (
            <div key={s.n} className="flex gap-4 relative z-10">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                step > s.n ? "bg-green-500 text-white" : step === s.n ? "bg-brand text-white shadow-lg shadow-brand/20 scale-110" : "bg-white border-2 border-gray-100 text-gray-300"
              )}>
                {step > s.n ? <CheckSquare size={16} /> : s.n}
              </div>
              <div>
                <p className={cn("text-xs font-bold leading-tight", step === s.n ? "text-gray-900" : "text-gray-400")}>{s.label}</p>
                <p className="text-[10px] text-gray-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-12 space-y-12">
          {/* Section 1 */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
            <div className="flex items-center gap-4 border-b border-gray-50 pb-6 mb-6">
              <div className="w-8 h-8 bg-sky-50 text-sky-600 rounded-lg flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-bold text-gray-900">Informations du demandeur</h3>
                <p className="text-[10px] text-gray-600 uppercase tracking-wider font-bold">Azure AD Active Sync Service</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Nom du demandeur <span className="text-red-500">*</span></label>
                <input readOnly value="Francis Kabamba" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-bold text-gray-700 cursor-not-allowed" />
                <p className="text-[10px] text-gray-300 italic">Identité vérifiée par authentification Azure</p>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Catégorie demandeur <span className="text-red-500">*</span></label>
                <select className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-bold text-gray-700 outline-none focus:border-brand">
                  <option>Commercial Bières (CB)</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Bénéficiaire <span className="text-red-500">*</span></label>
                <input placeholder="Ex : MKT Even & Spon" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-bold text-gray-700 outline-none focus:border-brand" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Catégorie bénéficiaire <span className="text-red-500">*</span></label>
                <select className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-bold text-gray-700 outline-none focus:border-brand">
                  <option>Sélectionner...</option>
                </select>
              </div>
              <div className="col-span-2 space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Motif de la demande <span className="text-red-500">*</span></label>
                <textarea rows={3} placeholder="Justification détaillée..." className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-bold text-gray-700 outline-none focus:border-brand" />
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
            <div className="flex items-center gap-4 border-b border-gray-50 pb-6 mb-6">
              <div className="w-8 h-8 bg-brand-light text-brand rounded-lg flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-bold text-gray-900 uppercase">Catalogue des Produits SAP</h3>
                <p className="text-[10px] text-gray-600">Sélectionnez les articles et ajustez les quantités</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input placeholder="Code SAP ou Désignation..." className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-brand outline-none" />
              </div>
              <button className="bg-brand text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-dark transition-all">
                <Plus size={20} />
                Ajouter produit
              </button>
            </div>

            <div className="overflow-hidden border border-gray-200 rounded-xl">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Article SAP</th>
                    <th className="px-6 py-4 text-center">Qté</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map((p) => (
                    <tr key={p.id} className="text-sm">
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-900">{p.designation}</p>
                        <p className="text-[10px] text-gray-400 font-mono">SAP: {p.sapCode} · {p.conditionnement} · En stock: {p.stock}</p>
                      </td>
                      <td className="px-6 py-4">
                        <input 
                          type="number" 
                          value={p.requested} 
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setProducts(products.map(item => item.id === p.id ? { ...item, requested: isNaN(val) ? 0 : val } : item));
                          }}
                          className="w-16 mx-auto text-center border border-gray-200 rounded py-1.5 font-bold text-gray-700 outline-none focus:border-brand" 
                        />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-300 hover:text-red-500 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bg-brand text-white p-5 flex justify-between items-center shadow-inner">
                <div>
                  <p className="text-[10px] font-bold uppercase opacity-80 tracking-widest mb-1">Résumé de la demande</p>
                  <p className="text-lg font-bold">TOTAL À METTRE À DISPOSITION</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold leading-none">{totalCasiers} Casiers</p>
                  <p className="text-[10px] uppercase font-bold opacity-80 mt-1 tracking-widest">{totalCasiers} CASIERS QUANTITÉ TOTALE</p>
                </div>
              </div>
            </div>
          </section>

          <footer className="flex justify-between items-center pt-8">
            <button onClick={onBack} className="text-xs font-bold text-gray-400 hover:text-brand uppercase tracking-widest transition-colors">
              Retour au menu
            </button>
            <div className="flex gap-4">
              <button className="px-8 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all uppercase tracking-widest">
                Brouillon
              </button>
              <button className="px-10 py-3 rounded-xl bg-brand text-white text-sm font-bold flex items-center gap-2 hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 uppercase tracking-widest">
                Soumettre demande
                <ArrowRight size={18} />
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [view, setView] = useState<'dashboard' | 'process_select' | 'form'>('dashboard');
  const [selectedProcess, setSelectedProcess] = useState<ProcessType | null>(null);

  const handleNewRequestAction = () => {
    setView('process_select');
    setActiveTab('new');
  };

  const handleProcessSelect = (type: ProcessType) => {
    setSelectedProcess(type);
    setView('form');
  };

  const handleBackToDashboard = () => {
    setView('dashboard');
    setActiveTab('dashboard');
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans selection:bg-brand/10 selection:text-brand">
      <Sidebar activeTab={activeTab} setActiveTab={(t) => {
        setActiveTab(t);
        if (t === 'dashboard') setView('dashboard');
        if (t === 'new') setView('process_select');
      }} />
      
      <main className="flex-1 ml-64 flex flex-col min-h-screen relative">
        <Header onNewRequest={handleNewRequestAction} />
        
        <div className="flex-1 overflow-x-hidden">
          <AnimatePresence mode="wait">
            {view === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Dashboard onNewRequest={handleNewRequestAction} />
              </motion.div>
            )}

            {view === 'process_select' && (
              <motion.div
                key="process_select"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProcessSelector onSelect={handleProcessSelect} />
              </motion.div>
            )}

            {view === 'form' && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <RequestForm type={selectedProcess!} onBack={handleBackToDashboard} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
