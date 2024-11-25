import { useState, useCallback } from 'react';
import { useProposalStore } from '../store/useProposalStore';
import { generateProposal } from '../services/openai';

export function useGPTAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const getAnalysisData = useProposalStore((state) => state.getAnalysisData);

  const analyzeProposal = useCallback(async () => {
    if (isAnalyzing) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const data = getAnalysisData();
      const proposal = await generateProposal(data.gaps, data.services);
      setAnalysis(proposal);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to generate proposal';
      setError(message);
      console.error('Proposal Generation Error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [isAnalyzing, getAnalysisData]);

  return {
    isAnalyzing,
    analysis,
    error,
    analyzeProposal
  };
}