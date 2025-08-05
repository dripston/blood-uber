import React, { useState } from 'react';
import { Heart, Mail, ArrowRight, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800">
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Save Lives?
          </h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Join thousands of heroes who are already making a difference. 
            Get updates on blood drives, rewards, and life-saving opportunities.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all duration-300"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span>Join Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            {isSubscribed && (
              <div className="mt-4 text-pink-100 font-medium animate-pulse">
                🎉 Thank you for joining our life-saving community!
              </div>
            )}
          </form>
        </div>
      </div>
      
      {/* Footer Content */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <Heart className="w-8 h-8 text-pink-500 fill-current" />
                <span className="text-2xl font-bold text-white">Blood Uber</span>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                Revolutionizing blood donation through AI-powered matching, blockchain rewards, 
                and machine learning predictions to save more lives, faster.
              </p>
              
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-gray-400 hover:text-pink-500 cursor-pointer transition-colors duration-300" />
                <Twitter className="w-6 h-6 text-gray-400 hover:text-pink-500 cursor-pointer transition-colors duration-300" />
                <Instagram className="w-6 h-6 text-gray-400 hover:text-pink-500 cursor-pointer transition-colors duration-300" />
                <Linkedin className="w-6 h-6 text-gray-400 hover:text-pink-500 cursor-pointer transition-colors duration-300" />
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {['How It Works', 'Features', 'Find Centers', 'Safety', 'Rewards'].map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-300 hover:text-pink-500 transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Support</h3>
              <ul className="space-y-3">
                {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms', 'FAQ'].map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-300 hover:text-pink-500 transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Blood Uber. All rights reserved. Built with ❤️ for saving lives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;