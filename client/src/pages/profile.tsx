import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Droplet, MapPin, UserCheck, CheckCircle, Loader2 } from "lucide-react";

export default function Profile() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    bloodGroup: "A+",
    userType: "patient",
    location: "Bangalore, Karnataka",
    availability: "Available weekdays 9 AM - 5 PM, weekends flexible"
  });

  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/users/user1"],
    onSuccess: (data) => {
      if (data) {
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          bloodGroup: data.bloodGroup || "",
          userType: data.userType || "",
          location: data.location || "",
          availability: data.availability || ""
        });
      }
    }
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("PUT", "/api/users/user1", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users/user1"] });
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blood-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tighter mb-2">Profile Settings</h2>
        <p className="text-gray-600 tracking-tighter">Update your personal information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-gray-900 tracking-tighter mb-6">Personal Information</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-700 tracking-tighter">First Name</Label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Enter first name"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 tracking-tighter">Last Name</Label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Enter last name"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-700 tracking-tighter">Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter email address"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-gray-700 tracking-tighter">Phone Number</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter phone number"
                    className="mt-2"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-700 tracking-tighter">Blood Group</Label>
                    <Select value={formData.bloodGroup} onValueChange={(value) => handleInputChange("bloodGroup", value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-gray-700 tracking-tighter">User Type</Label>
                    <Select value={formData.userType} onValueChange={(value) => handleInputChange("userType", value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="patient">Patient</SelectItem>
                        <SelectItem value="donor">Donor</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-700 tracking-tighter">Location</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Enter your location"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-gray-700 tracking-tighter">Availability</Label>
                  <Textarea
                    value={formData.availability}
                    onChange={(e) => handleInputChange("availability", e.target.value)}
                    placeholder="Describe your availability (days, times, etc.)"
                    className="mt-2 h-24"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" className="tracking-tighter">
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-blood-primary hover:bg-blood-primary/90 tracking-tighter"
                    disabled={updateProfileMutation.isPending}
                  >
                    {updateProfileMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Profile Summary */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-gray-900 tracking-tighter mb-4">Profile Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Droplet className="text-blood-primary mr-3" size={16} />
                  <span className="text-gray-600 tracking-tighter">
                    Blood Type: <strong>{formData.bloodGroup}</strong>
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-blood-primary mr-3" size={16} />
                  <span className="text-gray-600 tracking-tighter">
                    Location: <strong>Bangalore</strong>
                  </span>
                </div>
                <div className="flex items-center">
                  <UserCheck className="text-blood-primary mr-3" size={16} />
                  <span className="text-gray-600 tracking-tighter">
                    Type: <strong>{formData.userType}</strong>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-gray-900 tracking-tighter mb-4">Account Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 tracking-tighter">Profile Completion</span>
                  <span className="text-green-600 font-medium tracking-tighter">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-green-600 mr-2" size={16} />
                  <span className="text-sm text-gray-600 tracking-tighter">Account Verified</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Healthcare Character */}
          <div className="text-center">
            <div className="w-full h-48 bg-blood-neutral rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-blood-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <UserCheck className="text-white" size={24} />
                </div>
                <p className="text-blood-primary font-semibold tracking-tighter">Profile Assistant</p>
                <p className="text-gray-600 text-sm tracking-tighter">Healthcare guidance</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 tracking-tighter mt-2">Keep your profile updated for better matches</p>
          </div>
        </div>
      </div>
    </div>
  );
}
