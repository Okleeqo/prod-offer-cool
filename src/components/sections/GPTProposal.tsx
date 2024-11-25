import React from 'react';
import { Bot, Loader, Download, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Props {
  analysis: string | null;
  isAnalyzing: boolean;
  error?: string | null;
  onGenerate: () => void;
}

export function GPTProposal({ analysis, isAnalyzing, error, onGenerate }: Props) {
  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-amber-800 mb-2">OpenAI API Key Required</h3>
          <p className="text-amber-700">
            To use the AI proposal generator, please add your OpenAI API key to the .env file:
          </p>
          <pre className="mt-2 bg-amber-100 p-2 rounded text-sm">
            VITE_OPENAI_API_KEY=your-openai-api-key-here
          </pre>
          <p className="mt-2 text-amber-700">
            You can get your API key from{' '}
            <a
              href="https://platform.openai.com/account/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-800 underline"
            >
              OpenAI's dashboard
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-2 rounded-lg">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">AI-Powered Proposal Generator</h2>
            <p className="text-sm text-gray-500">Generate comprehensive proposals using GPT-4</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={onGenerate}
            disabled={isAnalyzing}
            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl shadow-md text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <Loader className="h-5 w-5 mr-2 animate-spin" />
                Generating Proposal...
              </>
            ) : (
              <>
                <Bot className="h-5 w-5 mr-2" />
                Generate Proposal
              </>
            )}
          </button>
          {analysis && (
            <button
              onClick={() => {
                const blob = new Blob([analysis], { type: 'text/markdown' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'financial-proposal.md';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Proposal
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {!analysis && !isAnalyzing && !error && (
        <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-200">
          <div className="text-center">
            <Bot className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Generate Your Proposal</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Click the generate button to create a comprehensive financial proposal based on your identified gaps and services.
            </p>
          </div>
        </div>
      )}

      {analysis && (
        <div className="prose prose-amber max-w-none mt-8 bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
          <ReactMarkdown>{analysis}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}