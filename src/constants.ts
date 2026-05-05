/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request, Product } from './types';

export const RECENT_REQUESTS: Request[] = [
  { 
    id: 'DG-2026-00018', 
    process: 'DCM', 
    beneficiary: 'MKT Even & Spon', 
    status: 'Val. R.DCM', 
    statusColor: 'bg-orange-100 text-orange-700', 
    date: '2026-04-12',
    applicant: 'Francis Kabamba',
    approvalSteps: [
      { label: 'Initiation', role: 'Agent DCM', status: 'completed', date: '2026-04-12 08:30' },
      { label: 'Validation DCM', role: 'Resp. DCM', status: 'current' },
      { label: 'Contrôle Gestion', role: 'CdG', status: 'pending' },
      { label: 'Approbation Finale', role: 'DG', status: 'pending' }
    ],
    history: [
      { status: 'Soumis', updatedBy: 'Francis Kabamba', updatedAt: '2026-04-12 08:30', comment: 'Demande urgente pour événement' }
    ],
    products: [
      { id: '1', sapCode: '2934', designation: 'BOOSTER GIN TONIC 50CL VC C20', conditionnement: 'C20', stock: 50, requested: 1 },
      { id: '2', sapCode: '3041', designation: 'EAU CRISTAL PET 1.5L C12', conditionnement: 'C12', stock: 100, requested: 3 }
    ],
    type: 'Commercial',
    isUrgent: false,
    sapDetails: {
      poNumber: '5100540835',
      distributionCenter: 'P015 BRAS USINE LUBUMBASHI',
      operatorName: 'Fifi Mukonkole',
      expiryDate: '2026-05-30',
      clientReference: 'N°61935 BARCELOS OUV',
      sapClientCode: '48583',
      signature: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
    }
  },
  { 
    id: 'RH-2026-00009', 
    process: 'RH', 
    beneficiary: 'Mukeba Jean', 
    status: 'Val. CdG', 
    statusColor: 'bg-yellow-100 text-yellow-700', 
    date: '2026-04-14',
    applicant: 'Marie RH',
    approvalSteps: [
      { label: 'Initiation', role: 'Agent RH', status: 'completed', date: '2026-04-14 10:15' },
      { label: 'Validation DRH', role: 'DRH', status: 'completed', date: '2026-04-14 14:00' },
      { label: 'Contrôle Gestion', role: 'CdG', status: 'current' },
      { label: 'Approbation Finale', role: 'DG', status: 'pending' }
    ],
    history: [
      { status: 'Soumis', updatedBy: 'Marie RH', updatedAt: '2026-04-14 10:15' },
      { status: 'Validé DRH', updatedBy: 'Directeur RH', updatedAt: '2026-04-14 14:00', comment: 'Dossier familial complet' }
    ],
    products: [
      { id: '3', sapCode: '5001', designation: 'BOOSTER GIN TONIC 50CL VC C20', conditionnement: 'C20', stock: 10, requested: 1 }
    ],
    type: 'Personnel',
    isUrgent: false
  },
  { 
    id: 'RSE-2026-00004', 
    process: 'RSE', 
    beneficiary: 'Asso. Espoir', 
    status: 'Att. DG', 
    statusColor: 'bg-red-100 text-red-700', 
    date: '2026-04-20',
    applicant: 'Sarah RSE',
    approvalSteps: [
      { label: 'Initiation', role: 'Resp. RSE', status: 'completed', date: '2026-04-20 09:00' },
      { label: 'Approbation Finale', role: 'DG', status: 'current' }
    ],
    history: [
      { status: 'Soumis', updatedBy: 'Sarah RSE', updatedAt: '2026-04-20 09:00', comment: 'Don social annuel' }
    ],
    products: [
      { id: '4', sapCode: '6001', designation: 'EAU CRISTAL PET 1.5L C12', conditionnement: 'C12', stock: 50, requested: 1 }
    ],
    type: 'Mécénat',
    isUrgent: true
  },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', sapCode: '100452', designation: 'SIMBA 33CL VP C/24', conditionnement: 'C/24', stock: 1240, requested: 0 },
  { id: '2', sapCode: '100489', designation: 'TEMBO 33CL VP C/24', conditionnement: 'C/24', stock: 420, requested: 0 },
  { id: '3', sapCode: '200112', designation: 'EAU CRISTAL 1.5L PET C/6', conditionnement: 'C/6', stock: 2100, requested: 0 },
];
