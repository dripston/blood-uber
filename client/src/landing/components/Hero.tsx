import React, { useEffect, useRef } from 'react';
import { Heart, ArrowRight } from 'lucide-react';

// Type declarations for global objects
declare global {
  interface Window {
    THREE: any;
    VANTA: any;
  }
}

const Hero = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    // Load Vanta.js scripts dynamically
    const loadVanta = async () => {
      // Load Three.js
      if (!(window as any).THREE) {
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
        document.head.appendChild(threeScript);
        
        await new Promise((resolve) => {
          threeScript.onload = resolve;
        });
      }

      // Load Vanta Fog
      if (!(window as any).VANTA) {
        const vantaScript = document.createElement('script');
        vantaScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.fog.min.js';
        document.head.appendChild(vantaScript);
        
        await new Promise((resolve) => {
          vantaScript.onload = resolve;
        });
      }

      // Initialize Vanta effect
      if ((window as any).VANTA && vantaRef.current) {
        vantaEffect.current = (window as any).VANTA.FOG({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          highlightColor: 0xF2A5BE, // Lighter version of B9375D
          midtoneColor: 0xfecaca, // Light red
          lowlightColor: 0xfefafa,
          speed: 4.0,
          zoom: 0.8
        });
      }
    };

    loadVanta();

    // Cleanup function
    return () => {
      if (vantaEffect.current && vantaEffect.current.destroy) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  return (
    <div className="px-6 sm:px-6 ml-0 lg:px-8 py-6 ">
    <div className="relative p-10 min-h-screen ml-0 flex max-w-8xl items-center justify-center  overflow-hidden tracking-tighter rounded-3xl"style={{ borderRadius: '5rem',boxShadow: '0 35px 60px -12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' }}>
      {/* Vanta.js Background */}
      <div 
        ref={vantaRef}
        className="absolute inset-0 w-full h-full rounded-lg"
        style={{ zIndex: 2 }}/>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] rounded-lg" style={{ zIndex: 2 }} />
      
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200/30 rounded-full animate-pulse" style={{ zIndex: 2 }}></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-rose-200/30 rounded-full animate-pulse delay-1000" style={{ zIndex: 2 }}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-300/20 rounded-full animate-bounce delay-500" style={{ zIndex: 2 }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ zIndex: 10 }}>
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-pink-100">
            <span className="text-2xl font-bold text-gray-800">Blood Uber</span>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tighter">
          Connecting Lives Through
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-700 block">
            Smart Blood Donation
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed font-medium tracking-tighter">
          Revolutionary AI-powered platform that intelligently schedules donations, 
          rewards donors with blockchain tokens, and provides real-time matching 
          between donors and recipients for life-saving impact.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center tracking-tighter">
          <button className="group bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 tracking-tighter">
            <a href='/login'>Get Started</a>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 tracking-tighter" />
          </button>
          
          <button className="text-gray-800 px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-300/50 hover:border-pink-300 hover:text-pink-600 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg">
            Learn More
          </button>
        </div>
        
        <div className="mt-16 mb-4 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-pink-100/50 hover:scale-105 hover:bg-white/90 hover:shadow-lg transition-all duration-300 shadow-md">
            <div className="text-4xl font-bold text-pink-600 mb-2">10,000+</div>
            <div className="text-gray-700 font-medium">Lives Saved</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-pink-100/50 hover:scale-105 hover:bg-white/90 hover:shadow-lg transition-all duration-300 shadow-md">
            <div className="text-4xl font-bold text-pink-600 mb-2">50,000+</div>
            <div className="text-gray-700 font-medium">Active Donors</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-pink-100/50 hover:scale-105 hover:bg-white/90 hover:shadow-lg transition-all duration-300 shadow-md">
            <div className="text-4xl font-bold text-pink-600 mb-2">98%</div>
            <div className="text-gray-700 font-medium">Match Success Rate</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Hero;