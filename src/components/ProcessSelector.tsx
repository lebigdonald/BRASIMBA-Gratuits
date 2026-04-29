/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Building2, Users, Heart, ArrowRight, Clock } from 'lucide-react';
import { cn } from '../lib/utils';
import { ProcessType } from '../types';

interface ProcessSelectorProps {
  onSelect: (type: ProcessType) => void;
}

export const ProcessSelector = ({ onSelect }: ProcessSelectorProps) => {
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
      buttonColor: 'bg-sky-600 hover:bg-sky-700',
      shadowColor: 'shadow-sky-600/20'
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
      buttonColor: 'bg-green-600 hover:bg-green-700',
      shadowColor: 'shadow-green-600/20'
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
      buttonColor: 'bg-indigo-600 hover:bg-indigo-700',
      shadowColor: 'shadow-indigo-600/20'
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-12 animate-in zoom-in-95 fade-in duration-500 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="px-3 py-1 bg-orange-50 text-brand text-[10px] font-bold rounded-full border border-orange-100 inline-flex items-center gap-2 mb-4 animate-bounce">
          <Clock size={12} /> NOUVELLE DEMANDE
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight uppercase">Quel type de demande ?</h2>
        <p className="text-gray-500 max-w-lg mx-auto font-medium text-sm md:text-base">Sélectionnez le processus correspondant à votre demande. Le formulaire s'adaptera automatiquement.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
        {types.map((type) => (
          <div 
            key={type.id} 
            className={cn(
              "bg-white rounded-3xl shadow-sm border-t-8 p-8 flex flex-col transition-all hover:shadow-2xl hover:-translate-y-2 group", 
              type.borderColor
            )}
          >
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300", type.iconColor)}>
              <type.icon size={28} />
            </div>
            
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-mono">{type.category}</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">{type.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6 font-medium">{type.description}</p>
            
            <ul className="space-y-4 mb-8 flex-1">
              {type.bullets.map((bullet, i) => (
                <li key={i} className="flex gap-3 text-xs font-bold text-gray-600 items-start">
                  <div className="w-2 h-2 rounded-full bg-gray-200 mt-1 flex-shrink-0 group-hover:bg-brand transition-colors" />
                  {bullet}
                </li>
              ))}
            </ul>

            <div className={cn("px-4 py-3 rounded-xl flex items-center gap-3 mb-6 font-bold text-[10px] uppercase tracking-wider", type.delayColor)}>
              <Clock size={14} className="animate-pulse" />
              {type.delay}
            </div>

            <button 
              onClick={() => onSelect(type.id)}
              className={cn(
                "w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 transition-all uppercase tracking-widest text-xs active:scale-95 shadow-lg", 
                type.buttonColor,
                type.shadowColor
              )}
            >
              Initialiser le flux
              <ArrowRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
