import { useState } from 'react';
import { Gap } from '../types';
import { detectGapsFromData } from '../services/openai';

export function useAutoGapDetection(setGaps: React.Dispatch<React.SetStateAction<Gap[]>>) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const detectGaps = async (data?: string) => {
    if (isAnalyzing) return;

    setIsAnalyzing(true);
    try {
      const detectedGaps = await detectGapsFromData(data);
      setGaps(detectedGaps);
    } catch (error) {
      console.error('Error detecting gaps:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    detectGaps,
    isAnalyzing
  };
}