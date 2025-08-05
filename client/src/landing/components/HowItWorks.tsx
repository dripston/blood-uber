import React, { useEffect, useRef } from 'react';
import { UserPlus, Search, Heart } from 'lucide-react';

// Extend window to avoid TypeScript errors
declare global {
  interface Window {
    THREE: any;
    VANTA: any;
  }
}

const HowItWorks = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
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

      // Initialize Vanta
      if ((window as any).VANTA && vantaRef.current) {
        vantaEffect.current = (window as any).VANTA.FOG({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0xF2A5BE,
          midtoneColor: 0xfecaca,
          lowlightColor: 0xfefafa,
          speed: 4.0,
          zoom: 0.8,
        });
      }
    };

    loadVanta();

    return () => {
      if (vantaEffect.current && vantaEffect.current.destroy) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  const steps = [
    {
      icon: UserPlus,
      title: 'Sign Up',
      description:
        'Create your profile with blood type, location, and preferences. Our secure onboarding takes just 2 minutes.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Search,
      title: 'Get Matched',
      description:
        'Our AI instantly finds perfect matches based on compatibility, proximity, and urgency using advanced algorithms.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Heart,
      title: 'Save Lives',
      description:
        'Donate at verified centers, earn BlockCoins, and receive real-time updates on your life-saving impact.',
      color: 'from-pink-500 to-rose-600',
    },
  ];

  return (
    <div className="relative px-6 sm:px-6 lg:px-8 py-6">
      {/* Vanta Background */}


      {/* Content */}
      <div
  className="py-20 bg-gradient-to-br mb-10 rounded-3xl relative overflow-hidden"
  style={{
    borderRadius: '5rem',
    boxShadow:
      '0 35px 60px -12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    zIndex: 1,
  }}
>
  {/* Vanta Background */}
  <div
    ref={vantaRef}
    className="absolute inset-0 w-full h-full"
    style={{ zIndex: 0 }}
  />


<div className="relative z-10">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tighter">
          How It Works
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto tracking-tighter">
          Save lives in three simple steps. Our streamlined process makes
          blood donation easier, smarter, and more rewarding than ever before.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
        {steps.map((step, index) => (
          <div key={index} className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg border-4 border-pink-100 mb-6 relative">
              <span className="text-3xl font-bold text-red-800">{index + 1}</span>
            </div>

            <div
              className={`inline-flex items-center justify-center w-20 h-20 bg-white ${step.color} rounded-3xl mb-6 shadow-2xl hover:scale-110 transition-transform duration-300`}
            >
              <step.icon className="w-6 h-6 text-zinc-900" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tighter">
              {step.title}
            </h3>

            <p className="text-gray-600 leading-relaxed max-w-sm mx-auto tracking-tighter">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <button className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 tracking-tighter mb-10">
          Start Saving Lives Today
        </button>
      </div>
    </div>
  </div>
</div>
</div>
  );
};

export default HowItWorks;
