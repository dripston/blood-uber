import React from 'react';
import { Brain, Coins, Zap, Shield, Clock, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "Smart Matching",
      description: "AI algorithms instantly match donors with recipients based on blood type, location, urgency, and medical compatibility for optimal outcomes."
    },
    {
      icon: Coins,
      title: "Blockchain Rewards",
      description: "Earn BloodCoins for every donation - a secure, blockchain-based reward system that recognizes your life-saving contributions."
    },
    {
      icon: Zap,
      title: "ML Predictions",
      description: "Machine learning predicts blood demand patterns, optimizes inventory levels, and prevents shortages before they occur."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Bank-level encryption and HIPAA compliance ensure your medical data remains private and secure at all times."
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Get instant notifications about urgent needs, donation appointments, and impact updates in real-time."
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Track your donation impact, see lives you've helped save, and connect with a community of life-savers."
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-white to-pink-25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tighter">
            Revolutionizing Blood Donation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto tracking-tighter">
            Our cutting-edge platform combines artificial intelligence, blockchain technology, 
            and machine learning to create the most efficient blood donation ecosystem ever built.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-pink-100 hover:border-pink-200 hover:-translate-y-2"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-pink-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-300 tracking-tighter">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed tracking-tighter">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;