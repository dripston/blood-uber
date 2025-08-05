import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Donor",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      text: "Blood Uber made donating so easy! The AI matching is incredible - I was matched with a recipient within minutes. The blockchain rewards make me feel even better about helping save lives.",
      rating: 5
    },
    {
      name: "Dr. Michael Chen",
      role: "Hospital Administrator",
      image: "https://images.pexels.com/photos/612608/pexels-photo-612608.jpeg?auto=compress&cs=tinysrgb&w=400",
      text: "As a hospital admin, Blood Uber has revolutionized our blood supply management. The ML predictions help us maintain optimal inventory levels and the real-time matching saves precious time.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Blood Recipient",
      image: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400",
      text: "I received life-saving blood through Blood Uber during my emergency surgery. The platform connected me with donors instantly. I'm forever grateful for this amazing technology.",
      rating: 5
    },
    {
      name: "James Thompson",
      role: "First-time Donor",
      image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400",
      text: "I was nervous about donating blood, but Blood Uber's app guided me through everything. The community support and seeing my impact in real-time motivated me to become a regular donor.",
      rating: 5
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Stories from Our Community
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from donors, recipients, and healthcare professionals who are part of 
            the Blood Uber revolution - transforming lives one donation at a time.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-pink-100 hover:-translate-y-1"
            >
              <Quote className="w-12 h-12 text-pink-400 mb-6" />
              
              <p className="text-gray-700 text-lg leading-relaxed mb-8 italic">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center space-x-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg"
                />
                
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600">
                    {testimonial.role}
                  </p>
                  
                  <div className="flex space-x-1 mt-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;