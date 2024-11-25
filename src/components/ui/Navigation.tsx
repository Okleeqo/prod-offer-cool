import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Props {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
}

export function Navigation({ currentStep, totalSteps, onNext, onPrevious }: Props) {
  return (
    <div className="fixed bottom-8 inset-x-0 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 p-4 flex justify-between items-center">
        <button
          onClick={onPrevious}
          disabled={currentStep === 0}
          className={`inline-flex items-center px-6 py-3 text-sm font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
            ${currentStep === 0
              ? 'text-gray-400 bg-gray-50'
              : 'text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300'}`}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </button>

        <div className="flex items-center space-x-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? 'bg-emerald-600 scale-125'
                  : index < currentStep
                  ? 'bg-emerald-200'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <button
          onClick={onNext}
          disabled={currentStep === totalSteps - 1}
          className={`inline-flex items-center px-6 py-3 text-sm font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
            ${currentStep === totalSteps - 1
              ? 'text-gray-400 bg-gray-50'
              : 'text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-md hover:shadow-lg'}`}
        >
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </button>
      </div>
    </div>
  );
}