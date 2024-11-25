export interface Gap {
  id: number;
  description: string;
  impact: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Service {
  id: number;
  name: string;
  description: string;
  deliverables: string;
  frequency: 'weekly' | 'monthly' | 'quarterly' | 'annually';
  price: string;
}