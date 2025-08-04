import React from 'react';
import { UserPlus, Search, Heart } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up",
      description: "Create your profile with blood type, location, and preferences. Our secure onboarding takes just 2 minutes.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Search,
      title: "Get Matched",
      description: "Our AI instantly finds perfect matches based on compatibility, proximity, and urgency using advanced algorithms.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Heart,
      title: "Save Lives",
      description: "Donate at verified centers, earn BlockCoins, and receive real-time updates on your life-saving impact.",
      color: "from-pink-500 to-rose-600"
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-pink-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tighter">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto tracking-tighter">
            Save lives in three simple steps. Our streamlined process makes blood donation 
            easier, smarter, and more rewarding than ever before.
          </p>
        </div>
        
        <div className="relative">
          {/* Connection lines */}
          <div className=""></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  {/* Step number */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg border-4 border-pink-100 mb-6 relative z-10">
                    <span className="text-3xl font-bold text-pink-600">{index + 1}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${step.color} rounded-3xl mb-6 shadow-lg hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tighter">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed max-w-sm mx-auto tracking-tighter">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 tracking-tighter">
            Start Saving Lives Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;