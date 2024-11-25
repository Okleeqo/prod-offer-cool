import React from 'react';
import { PlusCircle, X, AlertTriangle, Lightbulb, ArrowRight, Upload, Bot } from 'lucide-react';
import { type Gap } from '../../types';
import { useAutoGapDetection } from '../../hooks/useAutoGapDetection';

interface Props {
  gaps: Gap[];
  setGaps: React.Dispatch<React.SetStateAction<Gap[]>>;
}

export function ClientGapInput({ gaps, setGaps }: Props) {
  const { detectGaps, isAnalyzing } = useAutoGapDetection(setGaps);

  const addGap = () => {
    setGaps([...gaps, { id: Date.now(), description: '', impact: '', priority: 'medium' }]);
  };

  const removeGap = (id: number) => {
    setGaps(gaps.filter(gap => gap.id !== id));
  };

  const updateGap = (id: number, field: keyof Gap, value: string) => {
    setGaps(gaps.map(gap => 
      gap.id === id ? { ...gap, [field]: value } : gap
    ));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result as string;
        await detectGaps(text);
      };
      reader.readAsText(file);
    }
  };

  const gapExamples = [
    "Inconsistent cash flow forecasting",
    "Lack of real-time financial visibility",
    "Manual reporting processes",
    "Inefficient budgeting system"
  ];

  return (
    <div className="space-y-8">
      {/* Auto-Detection Card */}
      <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-2xl p-8 shadow-lg border border-amber-100/20">
        <div className="flex items-start space-x-6">
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl p-3 shadow-md">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Gap Detection</h3>
            <p className="text-gray-600 mb-6">Upload financial documents or data to automatically identify potential gaps:</p>
            
            <div className="flex items-center space-x-4">
              <label className="flex-1">
                <input
                  type="file"
                  className="hidden"
                  accept=".txt,.csv,.xlsx,.pdf"
                  onChange={handleFileUpload}
                  disabled={isAnalyzing}
                />
                <div className="flex items-center justify-center px-6 py-4 border-2 border-dashed border-amber-200 rounded-xl hover:border-amber-400 transition-colors cursor-pointer bg-white/50">
                  <Upload className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    {isAnalyzing ? 'Analyzing...' : 'Upload Financial Documents'}
                  </span>
                </div>
              </label>
              
              <button
                onClick={() => detectGaps()}
                disabled={isAnalyzing}
                className="px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Bot className="h-5 w-5" />
                <span>Quick Scan</span>
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              Supported formats: CSV, Excel, PDF, or plain text files containing financial data
            </p>
          </div>
        </div>
      </div>

      {/* Introduction Card */}
      <div className="bg-gradient-to-br from-emerald-50 via-white to-green-50 rounded-2xl p-8 shadow-lg border border-emerald-100/20 backdrop-blur-sm">
        <div className="flex items-start space-x-6">
          <div className="bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl p-3 shadow-md">
            <Lightbulb className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Identifying Financial Gaps</h3>
            <p className="text-gray-600 mb-6 text-lg">Start by identifying key financial and operational challenges your client faces. Consider areas like:</p>
            <div className="grid grid-cols-2 gap-4">
              {gapExamples.map((example, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white/50 p-3 rounded-xl shadow-sm border border-emerald-50 backdrop-blur-sm group hover:bg-white hover:shadow-md transition-all duration-200">
                  <ArrowRight className="h-5 w-5 text-emerald-500 group-hover:text-emerald-600 transition-colors" />
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{example}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gaps List */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">Client Gaps Analysis</h2>
            <p className="text-gray-500">Document and prioritize financial challenges</p>
          </div>
          <button
            onClick={addGap}
            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl shadow-md text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 transform hover:scale-105"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Gap
          </button>
        </div>
        
        <div className="space-y-6">
          {gaps.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl border-2 border-dashed border-gray-200">
              <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4 animate-bounce" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No gaps identified</h3>
              <p className="text-gray-500 mb-6">Start by adding the first financial gap for your client</p>
              <button
                onClick={addGap}
                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-emerald-600 bg-emerald-50 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 transform hover:scale-105"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Add First Gap
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {gaps.map(gap => (
                <div key={gap.id} className="group bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100/80 transition-all duration-200 transform hover:-translate-y-1">
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Gap Description</label>
                          <input
                            type="text"
                            value={gap.description}
                            onChange={(e) => updateGap(gap.id, 'description', e.target.value)}
                            className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm transition-all duration-200 hover:border-emerald-300 placeholder-gray-400"
                            placeholder="Describe the financial gap or challenge"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Business Impact</label>
                            <textarea
                              value={gap.impact}
                              onChange={(e) => updateGap(gap.id, 'impact', e.target.value)}
                              rows={3}
                              className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm transition-all duration-200 hover:border-emerald-300 placeholder-gray-400 resize-none"
                              placeholder="How does this gap affect business operations?"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                            <select
                              value={gap.priority}
                              onChange={(e) => updateGap(gap.id, 'priority', e.target.value)}
                              className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm transition-all duration-200 hover:border-emerald-300 bg-white"
                            >
                              <option value="low">Low Priority</option>
                              <option value="medium">Medium Priority</option>
                              <option value="high">High Priority</option>
                            </select>
                            <div className="mt-3">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                gap.priority === 'high' ? 'bg-red-100 text-red-800' :
                                gap.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                                'bg-green-100 text-green-800'
                              } transition-colors duration-200`}>
                                {gap.priority.charAt(0).toUpperCase() + gap.priority.slice(1)} Priority
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => removeGap(gap.id)}
                        className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg focus:outline-none transition-all duration-200"
                        aria-label="Remove gap"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}