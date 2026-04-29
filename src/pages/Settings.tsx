/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Bell, Shield, Smartphone, Mail, Save, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export const Settings = () => {
  const [prefs, setPrefs] = useState({
    emailNotifications: true,
    pushNotifications: false,
    approvalAlerts: true,
    escalationAlerts: true
  });
  const [saved, setSaved] = useState(false);

  const toggle = (key: keyof typeof prefs) => {
    setPrefs({ ...prefs, [key]: !prefs[key] });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="border-b border-gray-100 pb-6">
        <h2 className="text-2xl font-bold text-gray-900 leading-tight uppercase tracking-tight">Paramètres du compte</h2>
        <p className="text-sm text-gray-500 font-medium">Gérez vos préférences de notification et de sécurité</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Notification Preferences */}
        <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
              <Bell size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 uppercase">Préférences de Notification</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">Personnalisez comment vous êtes alerté</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { id: 'emailNotifications', label: 'Notifications par Email', icon: Mail, desc: 'Recevoir un récapitulatif quotidien de vos demandes' },
              { id: 'pushNotifications', label: 'Notifications Push', icon: Smartphone, desc: 'Alertes en temps réel sur votre navigateur' },
              { id: 'approvalAlerts', label: 'Alertes d\'Approbation', icon: CheckCircle2, desc: 'Notifié quand une demande nécessite votre visa' },
              { id: 'escalationAlerts', label: 'Alertes d\'Escalade', icon: Shield, desc: 'Notifié en cas de retard critique sur un flux' },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between p-5 bg-gray-50/50 rounded-2xl group hover:bg-white hover:shadow-md transition-all border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-xl border border-gray-100 text-gray-400 group-hover:text-brand transition-colors shadow-sm">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <label htmlFor={item.id} className="text-sm font-bold text-gray-900 uppercase tracking-tight cursor-pointer">
                      {item.label}
                    </label>
                    <p className="text-[10px] text-gray-500 font-medium italic mt-0.5">{item.desc}</p>
                  </div>
                </div>
                <button 
                  id={item.id}
                  onClick={() => toggle(item.id as keyof typeof prefs)}
                  className={cn(
                    "w-12 h-6 rounded-full relative transition-all duration-300 ring-4",
                    prefs[item.id as keyof typeof prefs] ? "bg-brand ring-brand/10" : "bg-gray-200 ring-transparent"
                  )}
                >
                  <div className={cn(
                    "w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300 shadow-lg",
                    prefs[item.id as keyof typeof prefs] ? "left-7" : "left-1"
                  )} />
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end gap-4 items-center">
          {saved && (
            <span className="text-green-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2 animate-in fade-in slide-in-from-right-4">
              <CheckCircle2 size={16} /> Modifications enregistrées
            </span>
          )}
          <button 
            onClick={handleSave}
            className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-gray-900/10 uppercase tracking-widest text-xs active:scale-95"
          >
            <Save size={18} />
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};
