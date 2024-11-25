import React, { useCallback, useState } from 'react';
import { Download, Send, Sparkles } from 'lucide-react';
import { type Gap, type Service } from '../../types';
import { GPTProposal } from './GPTProposal';
import { useGPTAnalysis } from '../../hooks/useGPTAnalysis';

interface Props {
  gaps: Gap[];
  services: Service[];
}

export function ProposalPreview({ gaps, services }: Props) {
  const [activeTab, setActiveTab] = useState<'summary' | 'gpt'>('summary');
  const { isAnalyzing, analysis, error, analyzeProposal } = useGPTAnalysis();
  
  const totalValue = useCallback(() => {
    return services.reduce((sum, service) => {
      const price = parseFloat(service.price.replace(/[^0-9.-]+/g, ""));
      return isNaN(price) ? sum : sum + price;
    }, 0);
  }, [services]);

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('summary')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeTab === 'summary'
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Summary View
        </button>
        <button
          onClick={() => setActiveTab('gpt')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeTab === 'gpt'
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          GPT Proposal
        </button>
      </div>

      {activeTab === 'gpt' ? (
        <GPTProposal
          analysis={analysis}
          isAnalyzing={isAnalyzing}
          error={error}
          onGenerate={analyzeProposal}
        />
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Strategic Financial Advisory Proposal</h2>
            <div className="space-x-4">
              <button 
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                onClick={() => console.log('Download PDF')}
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </button>
              <button 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                onClick={() => console.log('Send Proposal')}
              >
                <Send className="h-4 w-4 mr-2" />
                Send Proposal
              </button>
            </div>
          </div>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Executive Summary</h3>
              <p className="text-gray-600">
                Based on our comprehensive analysis, we have identified several key areas where our strategic financial advisory services can drive significant value for your organization.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Identified Gaps & Challenges</h3>
              <div className="space-y-4">
                {gaps.map(gap => (
                  <div key={gap.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{gap.description}</h4>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        gap.priority === 'high' ? 'bg-red-100 text-red-800' :
                        gap.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {gap.priority.charAt(0).toUpperCase() + gap.priority.slice(1)} Priority
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{gap.impact}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Services & Solutions</h3>
              <div className="space-y-4">
                {services.map(service => (
                  <div key={service.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{service.name}</h4>
                      <div className="text-right">
                        <span className="text-gray-900 font-medium">${service.price}</span>
                        <span className="text-gray-500 text-sm block">per {service.frequency}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">{service.description}</p>
                    <div className="text-sm text-gray-500">
                      <strong>Key Deliverables:</strong> {service.deliverables}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="border-t border-gray-200 pt-4 mt-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Total Investment</h3>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gray-900">
                      ${totalValue().toLocaleString()}
                    </span>
                    <span className="text-gray-500 text-sm block">per month</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}