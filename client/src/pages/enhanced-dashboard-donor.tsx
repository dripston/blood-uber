import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Shield, Trophy, Coins, Calendar, MapPin, Zap, Star, Gift, Award, Clock, Users, Activity } from "lucide-react";
import { format } from "date-fns";

export default function EnhancedDashboardDonor() {
  const { data: donor, isLoading: donorLoading } = useQuery({
    queryKey: ["/api/donors/user/user2"],
  });

  const { data: matches, isLoading: matchesLoading } = useQuery({
    queryKey: ["/api/matches/donor/donor1"],
  });

  const { data: donationHistory, isLoading: historyLoading } = useQuery({
    queryKey: ["/api/donation-history/donor1"],
  });

  const { data: badges, isLoading: badgesLoading } = useQuery({
    queryKey: ["/api/donor-badges/donor1"],
  });

  const { data: tokens, isLoading: tokensLoading } = useQuery({
    queryKey: ["/api/blockchain-tokens/donor1"],
  });

  const { data: rewards, isLoading: rewardsLoading } = useQuery({
    queryKey: ["/api/donor-rewards"],
  });

  const { data: leaderboard, isLoading: leaderboardLoading } = useQuery({
    queryKey: ["/api/leaderboard"],
  });

  if (donorLoading || matchesLoading || historyLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  const badgeColors = {
    novice: "bg-gray-100 text-gray-800",
    lifesaver: "bg-green-100 text-green-800", 
    hero: "bg-blue-100 text-blue-800",
    champion: "bg-purple-100 text-purple-800",
    legend: "bg-yellow-100 text-yellow-800"
  };

  const nextDonationEligible = donor?.lastDonationDate ? 
    new Date(new Date(donor.lastDonationDate).getTime() + 56 * 24 * 60 * 60 * 1000) : null;
  const daysUntilEligible = nextDonationEligible ? 
    Math.max(0, Math.ceil((nextDonationEligible.getTime() - Date.now()) / (1000 * 60 * 60 * 24))) : 0;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-gray-900">Donor Dashboard</h1>
          <p className="text-gray-600 mt-1">Your impact center with blockchain rewards and analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={`${badgeColors[donor?.badgeLevel || 'novice']} border-0`}>
            <Award className="h-3 w-3 mr-1" />
            {donor?.badgeLevel?.toUpperCase()}
          </Badge>
          <Badge variant="outline" className="border-pink-200 text-pink-700">
            <Heart className="h-3 w-3 mr-1" />
            {donor?.totalDonations} donations
          </Badge>
        </div>
      </div>

      {/* Blockchain Wallet */}
      <Card className="border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-yellow-600" />
              <CardTitle className="text-xl text-yellow-900">Blockchain Wallet</CardTitle>
            </div>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              Verified Donor
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Coins className="h-6 w-6 text-yellow-600" />
                <span className="text-3xl font-bold text-yellow-700">{donor?.currentTokens || 0}</span>
              </div>
              <p className="text-sm text-yellow-700">Current Tokens</p>
              <p className="text-xs text-yellow-600">Available for rewards</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="h-6 w-6 text-orange-600" />
                <span className="text-3xl font-bold text-orange-700">{donor?.totalTokensEarned || 0}</span>
              </div>
              <p className="text-sm text-orange-700">Total Earned</p>
              <p className="text-xs text-orange-600">Lifetime blockchain tokens</p>
            </div>
            <div className="text-center">
              <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                <Gift className="h-4 w-4 mr-2" />
                Redeem Rewards
              </Button>
              <p className="text-xs text-yellow-600 mt-1">Exchange tokens for benefits</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="matches">Patient Matches</TabsTrigger>
          <TabsTrigger value="history">Donation History</TabsTrigger>
          <TabsTrigger value="rewards">Blockchain Rewards</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Donation Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pink-600" />
                  Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-pink-600">{donor?.totalDonations || 0}</p>
                  <p className="text-sm text-gray-600">Total Donations</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">
                    {(parseInt(donor?.totalDonations || "0") * 3.5).toFixed(1)}L
                  </p>
                  <p className="text-sm text-gray-600">Blood Donated</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-green-600">
                    {parseInt(donor?.totalDonations || "0") * 3}
                  </p>
                  <p className="text-sm text-gray-600">Lives Saved</p>
                </div>
              </CardContent>
            </Card>

            {/* Next Eligibility */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-pink-600" />
                  Next Donation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  {daysUntilEligible > 0 ? (
                    <>
                      <p className="text-2xl font-bold text-orange-600">{daysUntilEligible}</p>
                      <p className="text-sm text-gray-600">days until eligible</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {nextDonationEligible && format(nextDonationEligible, "MMM dd, yyyy")}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-2xl font-bold text-green-600">Ready!</p>
                      <p className="text-sm text-gray-600">You can donate now</p>
                      <Button size="sm" className="mt-2 bg-green-600 hover:bg-green-700">
                        Find Patients
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Badge Progress */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-pink-600" />
                  Badge Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <Badge className={`${badgeColors[donor?.badgeLevel || 'novice']} mb-2`}>
                      {donor?.badgeLevel || 'novice'}
                    </Badge>
                    <p className="text-sm text-gray-600">Current Level</p>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress to Champion</span>
                      <span>{donor?.totalDonations}/15</span>
                    </div>
                    <Progress value={(parseInt(donor?.totalDonations || "0") / 15) * 100} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Matches */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-pink-600" />
                  Patient Matches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-2xl font-bold text-pink-600">{matches?.length || 0}</p>
                  <p className="text-sm text-gray-600">active matches</p>
                </div>
                <div className="mt-4 space-y-2">
                  {matches?.slice(0, 2).map((match: any) => (
                    <div key={match.id} className="flex items-center justify-between text-sm">
                      <span>{match.patientUser?.firstName}</span>
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
            {matches?.map((match: any) => (
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
                            {match.patientUser?.firstName} {match.patientUser?.lastName}
                          </h3>
                          <p className="text-sm text-gray-600">{match.patientUser?.location}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {match.patient?.urgencyLevel} priority
                        </Badge>
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
                          <p className="text-xs text-gray-500">Tokens Earned</p>
                          <p className="text-sm font-medium text-yellow-600">+15 tokens</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Scheduled</p>
                          <p className="text-sm font-medium">
                            {match.scheduledDate ? format(new Date(match.scheduledDate), "MMM dd") : "Pending"}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
                        Accept Match
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div className="grid gap-4">
            {donationHistory?.map((donation: any) => (
              <Card key={donation.id} className="transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Heart className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{donation.hospital}</h3>
                          <p className="text-sm text-gray-600">
                            Donated to {donation.patient?.firstName} {donation.patient?.lastName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {format(new Date(donation.donationDate), "EEEE, MMM dd, yyyy")}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Amount</p>
                          <p className="font-medium">{donation.amount}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Your Hemoglobin</p>
                          <p className="font-medium">{donation.healthMetrics?.hemoglobin} g/dL</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Blood Pressure</p>
                          <p className="font-medium">{donation.healthMetrics?.bloodPressure}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Tokens Earned</p>
                          <div className="flex items-center gap-1">
                            <Coins className="h-3 w-3 text-yellow-500" />
                            <span className="font-medium text-yellow-600">{donation.tokensEarned}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Status</p>
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                            {donation.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="h-5 w-5 text-yellow-600" />
                  Token Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tokens?.map((token: any) => (
                    <div key={token.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <Zap className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div>
                          <p className="font-medium">+{token.tokenAmount} tokens</p>
                          <p className="text-sm text-gray-600">From {token.earnedFrom}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {format(new Date(token.earnedAt), "MMM dd")}
                        </p>
                        {token.transactionHash && (
                          <p className="text-xs text-gray-400">TX: {token.transactionHash.slice(0, 8)}...</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-pink-600" />
                  Available Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {rewards?.map((reward: any) => (
                    <div key={reward.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex-1">
                        <p className="font-medium">{reward.rewardValue}</p>
                        <p className="text-sm text-gray-600">{reward.provider}</p>
                        <p className="text-xs text-gray-500">{reward.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-2">
                          <Coins className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">{reward.tokensRequired}</span>
                        </div>
                        <Button 
                          size="sm" 
                          disabled={parseInt(donor?.currentTokens || "0") < parseInt(reward.tokensRequired)}
                          className="bg-pink-600 hover:bg-pink-700"
                        >
                          Redeem
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-pink-600" />
                Top Donors This Month
              </CardTitle>
              <CardDescription>Compete with fellow donors and climb the rankings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard?.map((donor: any, index: number) => (
                  <div key={donor.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-yellow-100' : index === 1 ? 'bg-gray-100' : index === 2 ? 'bg-orange-100' : 'bg-gray-50'
                    }`}>
                      {index < 3 ? (
                        <Trophy className={`h-5 w-5 ${
                          index === 0 ? 'text-yellow-600' : index === 1 ? 'text-gray-600' : 'text-orange-600'
                        }`} />
                      ) : (
                        <span className="text-sm font-bold text-gray-600">#{donor.rank}</span>
                      )}
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