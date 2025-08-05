import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Activity, FileText } from "lucide-react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const healthDetailsSchema = z.object({
  bloodGroup: z.string().min(1, "Blood group is required"),
  weight: z.string().min(1, "Weight is required"),
  age: z.string().min(1, "Age is required"),
  hemoglobinLevel: z.string().optional(),
  medicalConditions: z.string().optional(),
  medications: z.string().optional(),
  allergies: z.string().optional(),
  emergencyContact: z.string().min(1, "Emergency contact is required"),
  emergencyPhone: z.string().min(1, "Emergency phone is required"),
  hasChronicConditions: z.boolean().optional(),
  lastCheckupDate: z.string().optional(),
  isAvailableForDonation: z.boolean().optional(),
});

type HealthDetailsForm = z.infer<typeof healthDetailsSchema>;

interface HealthDetailsFormProps {
  userRole: "patient" | "donor";
  userId: string;
  onComplete: () => void;
}

export default function HealthDetailsForm({ userRole, userId, onComplete }: HealthDetailsFormProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<HealthDetailsForm>({
    resolver: zodResolver(healthDetailsSchema),
    defaultValues: {
      bloodGroup: "",
      weight: "",
      age: "",
      hemoglobinLevel: "",
      medicalConditions: "",
      medications: "",
      allergies: "",
      emergencyContact: "",
      emergencyPhone: "",
      hasChronicConditions: false,
      lastCheckupDate: "",
      isAvailableForDonation: userRole === "donor" ? true : false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: HealthDetailsForm) => {
      const endpoint = userRole === "patient" ? "/api/patients" : "/api/donors";
      const payload = userRole === "patient" ? {
        userId,
        condition: data.medicalConditions || "thalassemia",
        bloodGroup: data.bloodGroup,
        urgencyLevel: "medium",
        hemoglobinLevel: parseFloat(data.hemoglobinLevel || "8.5"),
        weight: parseFloat(data.weight),
        age: parseInt(data.age),
        emergencyContact: data.emergencyContact,
        emergencyPhone: data.emergencyPhone,
        medications: data.medications,
        allergies: data.allergies,
        lastCheckupDate: data.lastCheckupDate ? new Date(data.lastCheckupDate) : new Date(),
      } : {
        userId,
        bloodGroup: data.bloodGroup,
        lastDonationDate: null,
        availabilityStatus: data.isAvailableForDonation ? "available" : "unavailable",
        weight: parseFloat(data.weight),
        age: parseInt(data.age),
        emergencyContact: data.emergencyContact,
        emergencyPhone: data.emergencyPhone,
        medicalClearance: true,
        donationCount: 0,
        totalVolumeContributed: 0,
        lastHealthCheck: data.lastCheckupDate ? new Date(data.lastCheckupDate) : new Date(),
      };
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      return await response.json();
    },
    onSuccess: (data) => {
      console.log("Health details saved successfully:", data);
      toast({
        title: "Health details saved",
        description: "Your health information has been recorded successfully.",
      });
      onComplete();
      setLocation(userRole === "patient" ? "/dashboard-patient" : "/dashboard-donor");
    },
    onError: (error) => {
      console.error("Failed to save health details:", error);
      toast({
        title: "Error",
        description: "Failed to save health details. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: HealthDetailsForm) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {userRole === "patient" ? (
              <Heart className="h-12 w-12 text-pink-600" />
            ) : (
              <Activity className="h-12 w-12 text-pink-600" />
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tighter mb-2">
            Health Details
          </h1>
          <p className="text-gray-600">
            {userRole === "patient" 
              ? "Please provide your medical information to help us find the best donors for you."
              : "Please provide your health information to ensure safe donation practices."
            }
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {userRole === "patient" ? "Patient Health Information" : "Donor Health Information"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="bloodGroup"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blood Group *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select blood group" />
                            </SelectTrigger>
                          </FormControl>
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight (kg) *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="65" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="25" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Patient-specific fields */}
                {userRole === "patient" && (
                  <FormField
                    control={form.control}
                    name="hemoglobinLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hemoglobin Level (g/dL)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" placeholder="8.5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Medical Information */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="medicalConditions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {userRole === "patient" ? "Medical Conditions" : "Known Medical Conditions"}
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={userRole === "patient" 
                              ? "e.g., Thalassemia major, diabetes, etc." 
                              : "Any chronic conditions or health issues"
                            } 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="medications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Medications</FormLabel>
                        <FormControl>
                          <Textarea placeholder="List any medications you're currently taking" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="allergies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Allergies</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Any known allergies or adverse reactions" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Emergency Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="emergencyContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emergency Contact Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="emergencyPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emergency Contact Phone *</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+1 234 567 8900" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="lastCheckupDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Medical Checkup</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {userRole === "donor" && (
                    <FormField
                      control={form.control}
                      name="isAvailableForDonation"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I am currently available for blood donation
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="hasChronicConditions"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I have chronic medical conditions that may affect {userRole === "patient" ? "treatment" : "donation"}
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-4 pt-6">
                  <Button
                    type="submit"
                    className="flex-1 bg-pink-600 hover:bg-pink-700"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Saving..." : "Save Health Details"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}