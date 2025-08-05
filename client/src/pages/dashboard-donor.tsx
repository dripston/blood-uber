import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Loader2, User } from "lucide-react";

export default function DashboardDonor() {
  const { data: donor, isLoading } = useQuery({
    queryKey: ["/api/donors/user/user2"],
  });

  const { data: matches } = useQuery({
    queryKey: ["/api/matches/donor/donor1"],
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
        <h2 className="text-3xl font-bold text-gray-900 tracking-tighter mb-2">Donor Dashboard</h2>
        <p className="text-gray-600 tracking-tighter">Your upcoming donations and assigned patients</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Upcoming Donation */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blood-tertiary rounded-full flex items-center justify-center mr-4">
                <Clock className="text-blood-primary" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 tracking-tighter">Next Donation</h3>
                <p className="text-gray-600 tracking-tighter">Scheduled appointment</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium text-blood-primary tracking-tighter">December 15, 2024</p>
              <p className="text-gray-600 tracking-tighter">10:30 AM</p>
              <p className="text-gray-600 tracking-tighter">Apollo Hospital, Bangalore</p>
            </div>
          </CardContent>
        </Card>

        {/* Donation History */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold text-gray-900 tracking-tighter mb-4">Donation Impact</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blood-primary tracking-tighter">
                  {donor?.totalDonations || "0"}
                </div>
                <div className="text-sm text-gray-600 tracking-tighter">Total Donations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blood-secondary tracking-tighter">24</div>
                <div className="text-sm text-gray-600 tracking-tighter">Lives Impacted</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assigned Patients */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold text-gray-900 tracking-tighter mb-4">Assigned Patients</h3>
          <div className="space-y-4">
            {matches?.map((match: any) => (
              <div key={match.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blood-tertiary rounded-full flex items-center justify-center mr-3">
                      <User className="text-blood-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 tracking-tighter">
                        {match.patientUser ? `${match.patientUser.firstName} ${match.patientUser.lastName}` : "Patient"}
                      </h4>
                      <p className="text-sm text-gray-600 tracking-tighter">
                        {match.patientUser?.bloodGroup} Blood Type
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium tracking-tighter ${
                    match.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {match.status === 'confirmed' ? 'Compatible' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Fallback patients when no matches */}
            {(!matches || matches.length === 0) && (
              <>
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blood-tertiary rounded-full flex items-center justify-center mr-3">
                        <User className="text-blood-primary" size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 tracking-tighter">Sarah Johnson</h4>
                        <p className="text-sm text-gray-600 tracking-tighter">B+ Blood Type</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium tracking-tighter">
                      Compatible
                    </span>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blood-tertiary rounded-full flex items-center justify-center mr-3">
                        <User className="text-blood-primary" size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 tracking-tighter">Michael Chen</h4>
                        <p className="text-sm text-gray-600 tracking-tighter">B+ Blood Type</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium tracking-tighter">
                      Pending
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Healthcare Cartoon */}
      <div className="mt-8 text-center">
        <div className="w-80 h-60 mx-auto bg-blood-neutral rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-blood-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-blood-primary font-semibold tracking-tighter">Healthcare Illustration</p>
            <p className="text-gray-600 text-sm tracking-tighter">Donors helping patients</p>
          </div>
        </div>
        <p className="text-gray-600 tracking-tighter mt-4">Making a difference, one donation at a time</p>
      </div>
    </div>
  );
}
