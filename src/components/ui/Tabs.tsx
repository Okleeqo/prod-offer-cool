import React from 'react';

interface Tab {
  title: string;
  content: React.ReactNode;
}

interface Props {
  tabs: Tab[];
  activeTab: number;
  setActiveTab: (index: number) => void;
}

export function Tabs({ tabs, activeTab, setActiveTab }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="border-b border-gray-100">
        <div className="flex p-2 gap-2 bg-gray-50/50">
          {tabs.map((tab, index) => (
            <button
              key={tab.title}
              onClick={() => setActiveTab(index)}
              className={`
                relative flex-1 px-8 py-4 text-base font-medium rounded-xl transition-all duration-300
                ${index === activeTab
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg transform hover:translate-y-[-1px]'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60 hover:shadow-md'}
                group
              `}
            >
              {/* Background Glow Effect */}
              {index === activeTab && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl blur opacity-20 -z-10"></div>
              )}

              {/* Tab Content */}
              <div className="flex flex-col items-center space-y-1">
                <span className={`
                  ${index === activeTab 
                    ? 'text-white' 
                    : 'text-gray-700 group-hover:text-emerald-600'} 
                  transition-colors duration-200
                `}>
                  {tab.title}
                </span>
                
                {/* Active Indicator Dot */}
                <div className={`
                  h-1.5 w-1.5 rounded-full transition-all duration-300 
                  ${index === activeTab 
                    ? 'bg-white scale-100' 
                    : 'bg-emerald-500 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100'}
                `}></div>
              </div>

              {/* Hover Gradient Border */}
              <div className={`
                absolute inset-0 rounded-xl border-2 border-transparent transition-all duration-300
                ${!index === activeTab && 'group-hover:border-emerald-100'}
              `}></div>
            </button>
          ))}
        </div>
      </div>
      <div className="p-8">
        {tabs[activeTab].content}
      </div>
    </div>
  );
}