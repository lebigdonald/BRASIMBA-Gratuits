export type ProcessType = 'DCM' | 'RH' | 'RSE';

export interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: string;
  color?: string;
}

export interface Request {
  id: string;
  process: ProcessType;
  beneficiary: string;
  status: string;
  statusColor: string;
  date: string;
}

export interface Product {
  id: string;
  sapCode: string;
  designation: string;
  conditionnement: string;
  stock: number;
  requested: number;
}
