import { Link, useLocation } from "wouter";
import { Heart, UserCheck, Users, Settings, Bot, MessageCircle, User } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/dashboard-patient", label: "Patient Dashboard", icon: User },
    { path: "/dashboard-donor", label: "Donor Dashboard", icon: UserCheck },
    { path: "/my-donors", label: "My Donors", icon: Users },
    { path: "/profile", label: "Profile", icon: Settings },
    { path: "/chat-ai", label: "AI Chat", icon: Bot },
    { path: "/messages", label: "Messages", icon: MessageCircle },
  ];

  const isActive = (path: string) => location === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blood-primary rounded-lg flex items-center justify-center">
              <Heart className="text-white" size={20} />
            </div>
            <h1 className="text-2xl font-bold text-blood-primary tracking-tighter">Blood Uber</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} href={item.path}>
                  <div
                    className={`px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer tracking-tighter ${
                      isActive(item.path)
                        ? "bg-blood-primary text-white"
                        : "text-gray-600 hover:bg-blood-tertiary hover:text-blood-primary"
                    }`}
                  >
                    <Icon className="inline mr-2" size={16} />
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </nav>
          
          <div className="md:hidden">
            <button className="p-2 rounded-md text-gray-600 hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
