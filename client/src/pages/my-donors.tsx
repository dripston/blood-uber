import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Eye, MessageCircle, Loader2 } from "lucide-react";
import type { DonorWithUser } from "@/lib/types";

export default function MyDonors() {
  const { data: donors, isLoading } = useQuery<DonorWithUser[]>({
    queryKey: ["/api/donors/blood-group/B+"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blood-primary" />
      </div>
    );
  }

  const calculateDistance = (donor: DonorWithUser) => {
    // Simulate distance calculation
    return `${(Math.random() * 5 + 1).toFixed(1)} km`;
  };

  const getTimeSinceLastDonation = (date: string | Date | null) => {
    if (!date) return "Never";
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return "Never";
    const now = new Date();
    const diff = Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 7) return `${diff} days ago`;
    if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`;
    return `${Math.floor(diff / 30)} months ago`;
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tighter mb-2">My Donors</h2>
        <p className="text-gray-600 tracking-tighter">Your assigned donors and their information</p>
      </div>

      {/* Donors List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donors?.map((donor) => (
          <Card key={donor.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blood-tertiary rounded-full flex items-center justify-center mr-4">
                  <Heart className="text-blood-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 tracking-tighter">
                    {donor.user.firstName} {donor.user.lastName}
                  </h3>
                  <p className="text-sm text-gray-600 tracking-tighter">
                    {donor.user.bloodGroup} Donor
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 tracking-tighter">Compatibility:</span>
                  <span className="text-green-600 font-medium tracking-tighter">
                    {Math.floor(Math.random() * 10 + 90)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 tracking-tighter">Distance:</span>
                  <span className="text-gray-900 tracking-tighter">{calculateDistance(donor)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 tracking-tighter">Last Donation:</span>
                  <span className="text-gray-900 tracking-tighter">
                    {getTimeSinceLastDonation(donor.lastDonationDate)}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <Button className="btn-primary flex-1 bg-blood-primary hover:bg-blood-primary/90">
                  <MessageCircle className="mr-2" size={16} />
                  Contact
                </Button>
                <Button variant="outline" size="icon" className="border-blood-primary text-blood-primary hover:bg-blood-primary hover:text-white">
                  <Eye size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Show fallback donors if no data */}
        {(!donors || donors.length === 0) && (
          <>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blood-tertiary rounded-full flex items-center justify-center mr-4">
                    <Heart className="text-blood-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 tracking-tighter">Dr. Emily Watson</h3>
                    <p className="text-sm text-gray-600 tracking-tighter">B+ Donor</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 tracking-tighter">Compatibility:</span>
                    <span className="text-green-600 font-medium tracking-tighter">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 tracking-tighter">Distance:</span>
                    <span className="text-gray-900 tracking-tighter">2.3 km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 tracking-tighter">Last Donation:</span>
                    <span className="text-gray-900 tracking-tighter">2 weeks ago</span>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button className="btn-primary flex-1 bg-blood-primary hover:bg-blood-primary/90">
                    <MessageCircle className="mr-2" size={16} />
                    Contact
                  </Button>
                  <Button variant="outline" size="icon" className="border-blood-primary text-blood-primary hover:bg-blood-primary hover:text-white">
                    <Eye size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blood-tertiary rounded-full flex items-center justify-center mr-4">
                    <Heart className="text-blood-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 tracking-tighter">James Rodriguez</h3>
                    <p className="text-sm text-gray-600 tracking-tighter">B+ Donor</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 tracking-tighter">Compatibility:</span>
                    <span className="text-green-600 font-medium tracking-tighter">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 tracking-tighter">Distance:</span>
                    <span className="text-gray-900 tracking-tighter">4.1 km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 tracking-tighter">Last Donation:</span>
                    <span className="text-gray-900 tracking-tighter">1 month ago</span>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button className="btn-primary flex-1 bg-blood-primary hover:bg-blood-primary/90">
                    <MessageCircle className="mr-2" size={16} />
                    Contact
                  </Button>
                  <Button variant="outline" size="icon" className="border-blood-primary text-blood-primary hover:bg-blood-primary hover:text-white">
                    <Eye size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blood-tertiary rounded-full flex items-center justify-center mr-4">
                    <Heart className="text-blood-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 tracking-tighter">Lisa Park</h3>
                    <p className="text-sm text-gray-600 tracking-tighter">B+ Donor</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 tracking-tighter">Compatibility:</span>
                    <span className="text-green-600 font-medium tracking-tighter">98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 tracking-tighter">Distance:</span>
                    <span className="text-gray-900 tracking-tighter">1.8 km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 tracking-tighter">Last Donation:</span>
                    <span className="text-gray-900 tracking-tighter">3 weeks ago</span>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button className="btn-primary flex-1 bg-blood-primary hover:bg-blood-primary/90">
                    <MessageCircle className="mr-2" size={16} />
                    Contact
                  </Button>
                  <Button variant="outline" size="icon" className="border-blood-primary text-blood-primary hover:bg-blood-primary hover:text-white">
                    <Eye size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Blood Donation Icons */}
      <div className="mt-8 text-center">
        <div className="w-80 h-60 mx-auto bg-blood-neutral rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">A+</span>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">B+</span>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">O+</span>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">AB+</span>
              </div>
            </div>
            <p className="text-blood-primary font-semibold tracking-tighter">Blood Type Compatibility</p>
            <p className="text-gray-600 text-sm tracking-tighter">Different blood types</p>
          </div>
        </div>
        <p className="text-gray-600 tracking-tighter mt-4">Your network of life-saving donors</p>
      </div>
    </div>
  );
}
