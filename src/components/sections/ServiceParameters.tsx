import React from 'react';
import { PlusCircle, X, TrendingUp, DollarSign, BarChart2, Package, Target, Wallet, LineChart } from 'lucide-react';
import { type Service } from '../../types';

interface Props {
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
}

const serviceTemplates = [
  {
    name: "Profitability Enhancement Program",
    description: "Comprehensive analysis and optimization of profitability metrics",
    deliverables: [
      "Monthly profit analysis",
      "Margin optimization",
      "Roadmap",
      "Pricing strategy review",
      "Cost reduction recommendations"
    ],
    price: "4,500",
    frequency: "monthly",
    icon: TrendingUp,
    iconBg: "bg-emerald-500"
  },
  {
    name: "COGS Optimization Service",
    description: "Strategic review and optimization of cost of goods sold",
    deliverables: [
      "Supplier analysis",
      "Procurement optimization",
      "Inventory management strategy",
      "Cost breakdown analysis"
    ],
    price: "3,500",
    frequency: "monthly",
    icon: DollarSign,
    iconBg: "bg-blue-500"
  },
  {
    name: "Working Capital Management",
    description: "Optimization of inventory, accounts receivable, and payable",
    deliverables: [
      "Working capital dashboard",
      "Cash conversion cycle analysis",
      "Payment terms optimization",
      "Inventory turnover strategy"
    ],
    price: "3,800",
    frequency: "monthly",
    icon: Package,
    iconBg: "bg-purple-500"
  },
  {
    name: "Expense Optimization Program",
    description: "Detailed analysis and optimization of fixed and variable expenses",
    deliverables: [
      "Expense analysis dashboard",
      "Cost-cutting recommendations",
      "Vendor negotiation strategy",
      "Efficiency metrics"
    ],
    price: "3,200",
    frequency: "monthly",
    icon: BarChart2,
    iconBg: "bg-orange-500"
  },
  {
    name: "Pricing Strategy Optimization",
    description: "Development and implementation of data-driven pricing strategies",
    deliverables: [
      "Market analysis",
      "Pricing models",
      "Competitor analysis",
      "Implementation roadmap"
    ],
    price: "4,200",
    frequency: "monthly",
    icon: Target,
    iconBg: "bg-pink-500"
  },
  {
    name: "Cash Flow Management Suite",
    description: "Comprehensive cash flow forecasting and management solution",
    deliverables: [
      "13-week cash flow forecast",
      "Working capital optimization",
      "Cash management strategy",
      "Funding recommendations"
    ],
    price: "4,800",
    frequency: "monthly",
    icon: Wallet,
    iconBg: "bg-indigo-500"
  },
  {
    name: "Performance Marketing Optimization",
    description: "ROI-focused marketing spend analysis and optimization",
    deliverables: [
      "Marketing ROI analysis",
      "Channel optimization",
      "Budget allocation strategy",
      "Performance metrics dashboard"
    ],
    price: "3,900",
    frequency: "monthly",
    icon: LineChart,
    iconBg: "bg-violet-500"
  }
];

export function ServiceParameters({ services, setServices }: Props) {
  const addService = () => {
    setServices([...services, {
      id: Date.now(),
      name: '',
      description: '',
      deliverables: '',
      frequency: 'monthly',
      price: ''
    }]);
  };

  const removeService = (id: number) => {
    setServices(services.filter(service => service.id !== id));
  };

  const updateService = (id: number, field: keyof Service, value: string) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, [field]: value } : service
    ));
  };

  const applyTemplate = (template: typeof serviceTemplates[0]) => {
    setServices([...services, { 
      id: Date.now(),
      name: template.name,
      description: template.description,
      deliverables: template.deliverables.join(', '),
      frequency: template.frequency,
      price: template.price
    }]);
  };

  return (
    <div className="space-y-12 max-w-[1440px] mx-auto">
      {/* Templates Section */}
      <div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Service Templates</h2>
          <p className="text-gray-600 mt-2">Choose from our pre-configured service packages</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {serviceTemplates.map((template, index) => {
            const Icon = template.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`p-3 rounded-xl ${template.iconBg} text-white`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                      <div className="text-sm text-gray-500">per {template.frequency}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">${template.price}</div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{template.description}</p>

                  <div className="space-y-3">
                    <div className="text-sm font-medium text-gray-700">Deliverables:</div>
                    <ul className="space-y-2">
                      {template.deliverables.map((item, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => applyTemplate(template)}
                    className="mt-6 w-full px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl font-medium transition-colors duration-200"
                  >
                    Select Package
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Services Section */}
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Custom Services</h2>
            <p className="text-gray-600 mt-2">Configure your own service offerings</p>
          </div>
          <button
            onClick={addService}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Service
          </button>
        </div>

        <div className="space-y-6">
          {services.map(service => (
            <div key={service.id} className="group bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Service Name
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          type="text"
                          value={service.name}
                          onChange={(e) => updateService(service.id, 'name', e.target.value)}
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                          placeholder="e.g., Financial Strategy Review"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="text"
                              value={service.price}
                              onChange={(e) => updateService(service.id, 'price', e.target.value)}
                              className="block w-full pl-7 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                              placeholder="2,500"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                          <select
                            value={service.frequency}
                            onChange={(e) => updateService(service.id, 'frequency', e.target.value)}
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                          >
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="annually">Annually</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <textarea
                        value={service.description}
                        onChange={(e) => updateService(service.id, 'description', e.target.value)}
                        rows={2}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                        placeholder="Describe the service offering and its value proposition"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Deliverables
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <textarea
                        value={service.deliverables}
                        onChange={(e) => updateService(service.id, 'deliverables', e.target.value)}
                        rows={2}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                        placeholder="List specific deliverables, meetings, and tangible outputs"
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeService(service.id)}
                    className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg focus:outline-none transition-all duration-200"
                    aria-label="Remove service"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {services.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <PlusCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No custom services added</h3>
              <p className="text-gray-500 mb-4">Add a custom service or use a template above</p>
              <button
                onClick={addService}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-emerald-600 bg-emerald-50 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Add First Service
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}