import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Gap, type Service } from '../types';

interface ProposalState {
  gaps: Gap[];
  services: Service[];
  setGaps: (gaps: Gap[]) => void;
  setServices: (services: Service[]) => void;
  addGap: (gap: Omit<Gap, 'id'>) => void;
  addService: (service: Omit<Service, 'id'>) => void;
  removeGap: (id: number) => void;
  removeService: (id: number) => void;
  updateGap: (id: number, updates: Partial<Gap>) => void;
  updateService: (id: number, updates: Partial<Service>) => void;
  getAnalysisData: () => { gaps: Gap[]; services: Service[] };
  saveData: () => void;
}

export const useProposalStore = create<ProposalState>()(
  persist(
    (set, get) => ({
      gaps: [],
      services: [],
      
      setGaps: (gaps) => set({ gaps }),
      setServices: (services) => set({ services }),
      
      addGap: (gap) => set((state) => ({
        gaps: [...state.gaps, { ...gap, id: Date.now() }]
      })),
      
      addService: (service) => set((state) => ({
        services: [...state.services, { ...service, id: Date.now() }]
      })),
      
      removeGap: (id) => set((state) => ({
        gaps: state.gaps.filter((gap) => gap.id !== id)
      })),
      
      removeService: (id) => set((state) => ({
        services: state.services.filter((service) => service.id !== id)
      })),
      
      updateGap: (id, updates) => set((state) => ({
        gaps: state.gaps.map((gap) =>
          gap.id === id ? { ...gap, ...updates } : gap
        )
      })),
      
      updateService: (id, updates) => set((state) => ({
        services: state.services.map((service) =>
          service.id === id ? { ...service, ...updates } : service
        )
      })),
      
      getAnalysisData: () => ({
        gaps: get().gaps,
        services: get().services
      }),

      saveData: () => {
        // Data is automatically persisted by zustand/persist
        // This is just a trigger for the success notification
        const data = get().getAnalysisData();
        console.log('Data saved:', data);
      }
    }),
    {
      name: 'proposal-store'
    }
  )
);