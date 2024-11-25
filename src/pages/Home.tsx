import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Bot, 
  Shield, 
  ChevronRight 
} from 'lucide-react';

export function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: TrendingUp,
      title: 'Financial Gap Analysis',
      description: 'Identify and analyze key financial challenges and opportunities in your business.'
    },
    {
      icon: DollarSign,
      title: 'Custom Service Packages',
      description: 'Create tailored service offerings with detailed deliverables and pricing.'
    },
    {
      icon: Bot,
      title: 'AI-Powered Proposals',
      description: 'Generate comprehensive proposals automatically using advanced AI technology.'
    },
    {
      icon: Clock,
      title: 'Time-Saving Templates',
      description: 'Pre-built service templates for common financial advisory needs.'
    },
    {
      icon: Shield,
      title: 'Best Practices',
      description: 'Industry-standard methodologies and proven financial strategies.'
    },
    {
      icon: BarChart3,
      title: 'Professional Formatting',
      description: 'Beautifully formatted proposals ready for client presentation.'
    }
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="py-20 text-center">
        <h1 className="text-5xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            VitaminCFO
          </span>{' '}
          <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
            OfferLab
          </span>
        </h1>
        <p className="mt-6 text-xl text-emerald-800 max-w-3xl mx-auto">
          Create comprehensive, data-driven financial proposals tailored to your client's needs in minutes. 
          Powered by AI for maximum efficiency.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={() => navigate('/builder')}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center"
          >
            Start Building
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
          <button className="px-8 py-4 bg-white text-emerald-700 rounded-xl font-medium border border-emerald-200 hover:bg-emerald-50 transition-all duration-200">
            Watch Demo
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-emerald-900">
            Everything you need to create winning proposals
          </h2>
          <p className="mt-4 text-lg text-emerald-700">
            Streamline your financial advisory workflow with our comprehensive toolset
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-emerald-100 hover:border-emerald-200 transition-all duration-200 hover:shadow-lg group"
              >
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-3 w-fit group-hover:scale-110 transition-transform duration-200">
                  <Icon className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-emerald-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-emerald-700">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-emerald-900">
                Ready to transform your financial advisory practice?
              </h2>
              <p className="mt-4 text-lg text-emerald-700">
                Start creating professional, data-driven proposals that win more clients and showcase your expertise.
              </p>
              <button
                onClick={() => navigate('/builder')}
                className="mt-8 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center"
              >
                Get Started Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}