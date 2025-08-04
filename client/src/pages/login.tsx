import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Users, Shield, Zap } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !userType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, userType }),
      });
      const data = await response.json();
      console.log("Login response:", data);
      if (data.success) {
        toast({
          title: "Welcome to Blood Uber!",
          description: "Login successful. Redirecting to your dashboard...",
        });
        setTimeout(() => {
          // Check if user needs to complete health details
          if (!data.user.healthDetailsCompleted) {
            setLocation(`/health-details/${userType}/${data.user.id}`);
          } else {
            setLocation(data.redirectTo);
          }
        }, 1000);
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Hero content */}
        <div className="text-center lg:text-left space-y-6">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tighter text-pink-900">Blood Uber</h1>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter text-gray-900 leading-tight">
            Connecting Lives Through
            <span className="text-pink-600 block">Smart Blood Donation</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-md mx-auto lg:mx-0">
            Advanced platform for thalassemia patients and donors featuring AI-powered scheduling, 
            blockchain rewards, and real-time matching.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-pink-100">
              <Users className="h-8 w-8 text-pink-600 mb-2" />
              <h3 className="font-semibold text-gray-900">Smart Matching</h3>
              <p className="text-sm text-gray-600">AI-powered donor-patient compatibility</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-pink-100">
              <Shield className="h-8 w-8 text-pink-600 mb-2" />
              <h3 className="font-semibold text-gray-900">Blockchain Rewards</h3>
              <p className="text-sm text-gray-600">Earn tokens for every donation</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-pink-100">
              <Zap className="h-8 w-8 text-pink-600 mb-2" />
              <h3 className="font-semibold text-gray-900">ML Predictions</h3>
              <p className="text-sm text-gray-600">Personalized transfusion scheduling</p>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <Card className="w-full max-w-md mx-auto shadow-lg border-pink-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold tracking-tighter text-gray-900">
              Welcome Back
            </CardTitle>
            <CardDescription>
              Sign in to access your personalized dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-pink-200 focus:border-pink-500"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="userType">Account Type</Label>
                <Select value={userType} onValueChange={setUserType}>
                  <SelectTrigger className="border-pink-200 focus:border-pink-500">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="patient">Patient (Need Blood)</SelectItem>
                    <SelectItem value="donor">Donor (Give Blood)</SelectItem>
                    <SelectItem value="both">Both Patient & Donor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Demo accounts available with sample data
              </p>
              <div className="mt-2 space-y-1 text-xs text-gray-500">
                <p>Patient: john@example.com</p>
                <p>Donor: emily@example.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}