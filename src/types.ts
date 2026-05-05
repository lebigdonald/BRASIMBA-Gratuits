/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ProcessType = 'DCM' | 'RH' | 'RSE';

export interface ApprovalStep {
  label: string;
  role: string;
  status: 'pending' | 'completed' | 'current';
  date?: string;
}

export interface RequestHistory {
  status: string;
  updatedBy: string;
  updatedAt: string;
  comment?: string;
}

export interface Request {
  id: string;
  process: ProcessType;
  beneficiary: string;
  status: string;
  statusColor: string;
  date: string;
  description?: string;
  applicant: string;
  approvalSteps: ApprovalStep[];
  history: RequestHistory[];
  products: Product[];
  isUrgent?: boolean;
  type: 'Commercial' | 'Personnel' | 'Mécénat';
  sapDetails?: {
    poNumber?: string;
    distributionCenter?: string;
    operatorName?: string;
    expiryDate?: string;
    clientReference?: string;
    sapClientCode?: string;
    signature?: string;
  };
}

export interface Product {
  id: string;
  sapCode: string;
  designation: string;
  conditionnement: string;
  stock: number;
  requested: number;
}

export interface UserPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  approvalAlerts: boolean;
}
