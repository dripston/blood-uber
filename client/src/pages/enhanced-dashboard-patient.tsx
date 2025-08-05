import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Heart, MapPin, Zap, Brain, Activity, Shield, Trophy, Clock, Users } from "lucide-react";
import { format } from "date-fns";

export default function EnhancedDashboardPatient() {
  const { data: patient, isLoading: patientLoading } = useQuery({
    queryKey: ["/api/patients/user/user1"],
  });

  const { data: matches, isLoading: matchesLoading } = useQuery({
    queryKey: ["/api/matches/patient/patient1"],
  });

  const { data: mlPrediction, isLoading: mlLoading } = useQuery({
    queryKey: ["/api/ml-prediction/patient1"],
  });

  const { data: leaderboard, isLoading: leaderboardLoading } = useQuery({
    queryKey: ["/api/leaderboard"],
  });

  if (patientLoading || matchesLoading || mlLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  const urgencyColor = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800", 
    high: "bg-red-100 text-red-800"
  };

  const nextTransfusion = mlPrediction?.nextRequiredDate ? new Date(mlPrediction.nextRequiredDate) : null;
  const daysUntilTransfusion = nextTransfusion ? Math.ceil((nextTransfusion.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-gray-900">Patient Dashboard</h1>
          <p className="text-gray-600 mt-1">Your personalized health and donation management center</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={`${urgencyColor[(patient as any)?.urgencyLevel || 'medium']} border-0`}>
            {((patient as any)?.urgencyLevel || 'medium').toUpperCase()} PRIORITY
          </Badge>
          <Badge variant="outline" className="border-pink-200 text-pink-700">
            <Heart className="h-3 w-3 mr-1" />
            {(patient as any)?.bloodGroup || 'B+'}
          </Badge>
        </div>
      </div>

      {/* AI Prediction Alert */}
      {mlPrediction && (
        <Card className="border-l-4 border-l-blue-500 bg-blue-50">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg text-blue-900">AI Health Prediction</CardTitle>
              <Badge variant="secondary" className="ml-auto">
                {(mlPrediction as any)?.confidenceLevel || '92'}% Confidence
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-blue-900">Next Transfusion</p>
                <p className="text-2xl font-bold text-blue-700">
                  {daysUntilTransfusion} days
                </p>
                <p className="text-sm text-blue-600">
                  {nextTransfusion && format(nextTransfusion, "MMM dd, yyyy")}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-900">Urgency Score</p>
                <div className="flex items-center gap-2">
                  <Progress value={parseInt((mlPrediction as any)?.urgencyScore || '7') * 10} className="flex-1" />
                  <span className="text-sm font-bold text-blue-700">{(mlPrediction as any)?.urgencyScore || '7'}/10</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-900">Predicted Amount</p>
                <p className="text-xl font-bold text-blue-700">{(mlPrediction as any)?.predictedAmount || '450ml'}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm font-medium text-blue-900 mb-2">AI Recommendations</p>
              <div className="space-y-1">
                {((mlPrediction as any)?.recommendations || []).map((rec: string, index: number) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-blue-700">
                    <Zap className="h-3 w-3 mt-0.5 text-blue-500" />
                    {rec}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="matches">Smart Matches</TabsTrigger>
          <TabsTrigger value="health">Health Tracking</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-pink-600" />
                  Health Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Hemoglobin</span>
                  <span className="font-medium">{(patient as any)?.hemoglobinLevel || '8.5'} g/dL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Weight</span>
                  <span className="font-medium">{(patient as any)?.weight || '65'} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Age</span>
                  <span className="font-medium">{(patient as any)?.age || '28'} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Condition</span>
                  <Badge variant="outline" className="text-xs">
                    {(patient as any)?.condition || 'thalassemia'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Next Appointment */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-pink-600" />
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-2xl font-bold text-pink-600">{daysUntilTransfusion}</p>
                  <p className="text-sm text-gray-600">days until next transfusion</p>
                  {nextTransfusion && (
                    <p className="text-xs text-gray-500 mt-2">
                      {format(nextTransfusion, "EEEE, MMM dd")}
                    </p>
                  )}
                </div>
                <Button className="w-full mt-4 bg-pink-600 hover:bg-pink-700">
                  Schedule Appointment
                </Button>
              </CardContent>
            </Card>

            {/* Active Matches */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-pink-600" />
                  Active Matches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-2xl font-bold text-pink-600">{(matches as any)?.length || 0}</p>
                  <p className="text-sm text-gray-600">compatible donors found</p>
                </div>
                <div className="mt-4 space-y-2">
                  {((matches as any) || []).slice(0, 2).map((match: any) => (
                    <div key={match.id} className="flex items-center justify-between text-sm">
                      <span>{match.donorUser?.firstName}</span>
                      <Badge variant="outline" className="text-xs">
                        {match.matchScore}% match
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="matches" className="space-y-6">
          <div className="grid gap-4">
            {((matches as any) || []).map((match: any) => (
              <Card key={match.id} className="transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                          <Heart className="h-5 w-5 text-pink-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {match.donorUser?.firstName} {match.donorUser?.lastName}
                          </h3>
                          <p className="text-sm text-gray-600">{match.donorUser?.location}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-xs text-gray-500">Match Score</p>
                          <div className="flex items-center gap-2">
                            <Progress value={parseInt(match.matchScore)} className="flex-1" />
                            <span className="text-sm font-medium">{match.matchScore}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Distance</p>
                          <p className="text-sm font-medium">{match.distanceKm} km</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Compatibility</p>
                          <p className="text-sm font-medium">{match.compatibilityScore}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Status</p>
                          <Badge variant={match.status === 'confirmed' ? 'default' : 'outline'} className="text-xs">
                            {match.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
                        Connect
                      </Button>
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-pink-600" />
                  Health Metrics Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Activity className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>Health metrics visualization</p>
                    <p className="text-sm">Track hemoglobin, weight, and vitals</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-pink-600" />
                  Transfusion History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">Previous Transfusion</p>
                      <p className="text-sm text-gray-600">Apollo Hospital - 450ml</p>
                    </div>
                    <p className="text-sm text-gray-500">30 days ago</p>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">Before That</p>
                      <p className="text-sm text-gray-600">Fortis Hospital - 450ml</p>
                    </div>
                    <p className="text-sm text-gray-500">60 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="community" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-pink-600" />
                Community Leaderboard
              </CardTitle>
              <CardDescription>Top donors in your area making a difference</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard?.map((donor: any, index: number) => (
                  <div key={donor.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded">
                    <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-pink-600">#{donor.rank}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{donor.firstName} {donor.lastName}</p>
                      <p className="text-sm text-gray-600">{donor.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{donor.totalDonations} donations</p>
                      <div className="flex items-center gap-1">
                        <Shield className="h-3 w-3 text-yellow-500" />
                        <span className="text-xs text-gray-600">{donor.totalTokens} tokens</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {donor.badgeLevel}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}