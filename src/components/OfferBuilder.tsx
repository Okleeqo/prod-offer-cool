import React, { useState } from 'react';
import { ClientGapInput } from './sections/ClientGapInput';
import { ServiceParameters } from './sections/ServiceParameters';
import { ProposalPreview } from './sections/ProposalPreview';
import { Tabs } from './ui/Tabs';
import { Navigation } from './ui/Navigation';
import { useProposalStore } from '../store/useProposalStore';

export function OfferBuilder() {
  const [activeTab, setActiveTab] = useState(0);
  const { gaps, services, setGaps, setServices, saveData } = useProposalStore();

  const tabs = [
    { title: 'Client Gaps', content: <ClientGapInput gaps={gaps} setGaps={setGaps} /> },
    { title: 'Service Parameters', content: <ServiceParameters services={services} setServices={setServices} /> },
    { title: 'Preview Proposal', content: <ProposalPreview gaps={gaps} services={services} /> },
  ];

  const handleSave = () => {
    saveData();
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 text-transparent bg-clip-text mb-2">
          Create Your Proposal
        </h1>
        <p className="text-gray-600 text-lg">
          Follow the steps below to build your customized financial advisory proposal
        </p>
      </div>
      
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <Navigation 
        currentStep={activeTab}
        totalSteps={tabs.length}
        onNext={() => setActiveTab(prev => Math.min(prev + 1, tabs.length - 1))}
        onPrevious={() => setActiveTab(prev => Math.max(prev - 1, 0))}
      />
    </div>
  );
}