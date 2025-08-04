import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapComponent } from "@/components/map";
import { CalendarCheck, Loader2 } from "lucide-react";

export default function DashboardPatient() {
  const { data: patient, isLoading } = useQuery({
    queryKey: ["/api/patients/user/user1"],
  });

  const { data: matches } = useQuery({
    queryKey: ["/api/matches/patient/patient1"],
  });

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
        <h2 className="text-3xl font-bold text-gray-900 tracking-tighter mb-2">Patient Dashboard</h2>
        <p className="text-gray-600 tracking-tighter">Manage your donors and schedule donations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Scheduling Status Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blood-tertiary rounded-full flex items-center justify-center mr-4">
                <CalendarCheck className="text-blood-primary" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 tracking-tighter">Donation Scheduling</h3>
                <p className="text-gray-600 tracking-tighter">Current status</p>
              </div>
            </div>
            <div className="flex items-center">
              <Loader2 className="h-5 w-5 animate-spin text-blood-primary mr-3" />
              <p className="text-lg font-medium text-blood-primary tracking-tighter">Scheduling your donors…</p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold text-gray-900 tracking-tighter mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blood-primary tracking-tighter">
                  {matches?.length || 0}
                </div>
                <div className="text-sm text-gray-600 tracking-tighter">Active Requests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blood-secondary tracking-tighter">12</div>
                <div className="text-sm text-gray-600 tracking-tighter">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map Section */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold text-gray-900 tracking-tighter mb-4">Your Location</h3>
          <MapComponent
            center={[12.9716, 77.5946]}
            zoom={13}
            markers={[
              {
                position: [12.9716, 77.5946],
                popup: '<strong>Your Location</strong><br>Bangalore, Karnataka'
              }
            ]}
          />
          <p className="text-sm text-gray-600 tracking-tighter mt-2 flex items-center">
            <span className="w-2 h-2 bg-blood-primary rounded-full mr-2"></span>
            Bangalore, Karnataka - Your current location
          </p>
        </CardContent>
      </Card>

      {/* Medical Illustration */}
      <div className="mt-8 text-center">
        <div className="w-80 h-60 mx-auto bg-blood-neutral rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-blood-primary rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-blood-primary font-semibold tracking-tighter">Medical Illustration</p>
            <p className="text-gray-600 text-sm tracking-tighter">Blood donation process</p>
          </div>
        </div>
        <p className="text-gray-600 tracking-tighter mt-4">Connecting patients with life-saving donors</p>
      </div>
    </div>
  );
}
