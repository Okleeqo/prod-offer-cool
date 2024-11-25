import React from 'react';
import { BarChart3, Settings, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Modern Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center">
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-2 rounded-lg shadow-lg">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div className="ml-3 flex items-center">
                  <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    VitaminCFO
                  </span>
                  <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent ml-2">
                    OfferLab
                  </span>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/builder" className="text-emerald-700 hover:text-emerald-600 transition-colors text-sm font-medium">
                  Offer Builder
                </Link>
                <a href="#" className="text-emerald-700 hover:text-emerald-600 transition-colors text-sm font-medium">
                  Templates
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-emerald-600 hover:text-emerald-500 transition-colors relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                </button>
                <button className="p-2 text-emerald-600 hover:text-emerald-500 transition-colors">
                  <Settings className="h-5 w-5" />
                </button>
                <div className="h-6 w-px bg-emerald-100"></div>
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-emerald-50 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center text-white font-medium">
                    JD
                  </div>
                  <span className="text-sm font-medium text-emerald-800">John Doe</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}