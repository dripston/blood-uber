// Enhanced storage with comprehensive features for demo
export class EnhancedStorage {
  constructor() {
    // Using in-memory storage for demo - no MongoDB required
  }

  // Current user session
  currentUser = {
    id: "user1",
    username: "john_patient",
    email: "john@example.com",
    firstName: "John",
    lastName: "Doe",
    phone: "+91 98765 43210",
    bloodGroup: "B+",
    userType: "patient",
    location: "Bangalore, Karnataka",
    availability: "Weekdays 9 AM - 5 PM",
    isVerified: true,
    coordinates: { lat: 12.9716, lng: 77.5946 }
  };

  // Enhanced sample data with ML predictions and blockchain features
  async getUser(id: string) {
    return this.currentUser;
  }

  async getUserByEmail(email: string) {
    return this.currentUser;
  }

  async createUser(user: any) {
    return { ...user, id: "user1" };
  }

  async updateUser(id: string, updates: any) {
    Object.assign(this.currentUser, updates);
    return this.currentUser;
  }

  async getDonor(id: string) {
    return {
      id: "donor1",
      userId: "user2",
      lastDonationDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      totalDonations: "8",
      isActive: true,
      currentTokens: "120",
      totalTokensEarned: "850",
      badgeLevel: "hero"
    };
  }

  async getDonorByUserId(userId: string) {
    return this.getDonor("donor1");
  }

  async createDonor(donor: any) {
    return { ...donor, id: "donor1" };
  }

  async getDonorsByBloodGroup(bloodGroup: string) {
    return [
      {
        id: "donor1",
        userId: "user2",
        lastDonationDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        totalDonations: "8",
        isActive: true,
        currentTokens: "120",
        totalTokensEarned: "850",
        badgeLevel: "hero",
        user: {
          id: "user2",
          firstName: "Emily",
          lastName: "Watson",
          email: "emily@example.com",
          phone: "+91 98765 43211",
          bloodGroup: "B+",
          location: "Bangalore, Karnataka",
          coordinates: { lat: 12.9756, lng: 77.5986 }
        }
      },
      {
        id: "donor2",
        userId: "user3",
        lastDonationDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        totalDonations: "5",
        isActive: true,
        currentTokens: "75",
        totalTokensEarned: "500",
        badgeLevel: "lifesaver",
        user: {
          id: "user3",
          firstName: "James",
          lastName: "Rodriguez",
          email: "james@example.com",
          phone: "+91 98765 43212",
          bloodGroup: "B+",
          location: "Bangalore, Karnataka",
          coordinates: { lat: 12.9656, lng: 77.6046 }
        }
      }
    ];
  }

  async getPatient(id: string) {
    return {
      id: "patient1",
      userId: "user1",
      condition: "thalassemia",
      urgencyLevel: "medium",
      nextRequiredDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      hemoglobinLevel: "8.5",
      weight: "65",
      age: "28",
      medicalHistory: "Beta thalassemia major, regular transfusions since childhood"
    };
  }

  async getPatientByUserId(userId: string) {
    return this.getPatient("patient1");
  }

  async createPatient(patient: any) {
    return { ...patient, id: "patient1" };
  }

  async getMatchesByPatientId(patientId: string) {
    const donors = await this.getDonorsByBloodGroup("B+");
    return donors.map((donor, index) => ({
      id: `match${index + 1}`,
      donorId: donor.id,
      patientId,
      matchScore: (95 + Math.random() * 5).toFixed(0),
      status: index === 0 ? "confirmed" : "pending",
      scheduledDate: index === 0 ? new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) : null,
      distanceKm: (1 + Math.random() * 4).toFixed(1),
      compatibilityScore: (90 + Math.random() * 10).toFixed(0),
      donor,
      donorUser: donor.user
    }));
  }

  async getMatchesByDonorId(donorId: string) {
    const patient = await this.getPatient("patient1");
    return [{
      id: "match1",
      donorId,
      patientId: "patient1",
      matchScore: "98",
      status: "confirmed",
      scheduledDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      distanceKm: "2.3",
      compatibilityScore: "95",
      patient,
      patientUser: this.currentUser
    }];
  }

  async createMatch(match: any) {
    return { ...match, id: "match1" };
  }

  async updateMatch(id: string, updates: any) {
    return { id, ...updates };
  }

  async getMessagesBetweenUsers(user1Id: string, user2Id: string) {
    return [
      {
        id: "1",
        senderId: "user2",
        recipientId: "user1",
        content: "Hi! I received your match request. I'm available for donation next week. When would be convenient for you?",
        timestamp: new Date(Date.now() - 60000),
        isRead: true
      },
      {
        id: "2",
        senderId: "user1",
        recipientId: "user2",
        content: "Thank you so much! Tuesday afternoon would work perfectly for me. Should we meet at Apollo Hospital?",
        timestamp: new Date(Date.now() - 30000),
        isRead: true
      }
    ];
  }

  async createMessage(message: any) {
    return { ...message, id: "new_msg", timestamp: new Date() };
  }

  async getConversationsForUser(userId: string) {
    return [
      {
        user: { id: "user2", firstName: "Emily", lastName: "Watson", userType: "donor" },
        lastMessage: { id: "1", content: "Thanks for the update...", timestamp: new Date() }
      }
    ];
  }

  // Enhanced features
  async getDonationHistory(donorId: string) {
    return [
      {
        id: "donation1",
        donorId,
        patientId: "patient1",
        donationDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        amount: "450ml",
        hospital: "Apollo Hospital",
        status: "completed",
        healthMetrics: { hemoglobin: "13.5", bloodPressure: "120/80", weight: "70", temperature: "98.6" },
        tokensEarned: "15",
        patient: { firstName: "John", lastName: "Doe", bloodGroup: "B+" }
      },
      {
        id: "donation2",
        donorId,
        patientId: "patient2",
        donationDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        amount: "450ml",
        hospital: "Fortis Hospital",
        status: "completed",
        healthMetrics: { hemoglobin: "14.0", bloodPressure: "118/78", weight: "69", temperature: "98.4" },
        tokensEarned: "15",
        patient: { firstName: "Sarah", lastName: "Kumar", bloodGroup: "B+" }
      }
    ];
  }

  async createDonationHistory(donation: any) {
    return { ...donation, id: "donation_new" };
  }

  async getDonorBadges(donorId: string) {
    return [
      {
        id: "badge1",
        donorId,
        badgeType: "lifesaver",
        earnedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        donationCount: "5",
        description: "Completed 5 successful donations"
      },
      {
        id: "badge2",
        donorId,
        badgeType: "hero",
        earnedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        donationCount: "8",
        description: "Reached 8 donations milestone"
      }
    ];
  }

  async createDonorBadge(badge: any) {
    return { ...badge, id: "badge_new" };
  }

  async getBlockchainTokens(donorId: string) {
    return [
      {
        id: "token1",
        donorId,
        tokenAmount: "15",
        earnedFrom: "donation",
        transactionHash: "0x123abc...",
        earnedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      },
      {
        id: "token2",
        donorId,
        tokenAmount: "5",
        earnedFrom: "milestone",
        transactionHash: "0x456def...",
        earnedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      }
    ];
  }

  async createBlockchainToken(token: any) {
    return { ...token, id: "token_new" };
  }

  async getDonorRewards() {
    return [
      {
        id: "reward1",
        rewardType: "health_checkup",
        rewardValue: "Free Health Checkup",
        provider: "Apollo Hospitals",
        description: "Complete health checkup including blood tests",
        tokensRequired: "50",
        isActive: true
      },
      {
        id: "reward2",
        rewardType: "medical_consultation",
        rewardValue: "Free Doctor Consultation",
        provider: "Fortis Healthcare",
        description: "One-time consultation with specialist",
        tokensRequired: "30",
        isActive: true
      },
      {
        id: "reward3",
        rewardType: "insurance_discount",
        rewardValue: "10% Insurance Discount",
        provider: "HDFC ERGO",
        description: "Discount on health insurance premium",
        tokensRequired: "100",
        isActive: true
      }
    ];
  }

  async getMLPrediction(patientId: string) {
    return {
      id: "prediction1",
      patientId,
      nextRequiredDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      urgencyScore: "7",
      predictedAmount: "450ml",
      confidenceLevel: "92",
      factorsConsidered: ["Current hemoglobin level", "Previous transfusion history", "Body weight", "Age"],
      recommendations: [
        "Schedule transfusion within next 7 days",
        "Monitor hemoglobin levels closely",
        "Ensure proper hydration before transfusion",
        "Consider iron chelation therapy review"
      ]
    };
  }

  async createMLPrediction(prediction: any) {
    return { ...prediction, id: "prediction_new" };
  }

  async getLeaderboard() {
    return [
      {
        id: "user2",
        firstName: "Emily",
        lastName: "Watson",
        totalDonations: "8",
        totalTokens: "850",
        badgeLevel: "hero",
        rank: 1,
        location: "Bangalore"
      },
      {
        id: "user3",
        firstName: "James",
        lastName: "Rodriguez",
        totalDonations: "5",
        totalTokens: "500",
        badgeLevel: "lifesaver",
        rank: 2,
        location: "Bangalore"
      },
      {
        id: "user4",
        firstName: "Sarah",
        lastName: "Kumar",
        totalDonations: "3",
        totalTokens: "300",
        badgeLevel: "novice",
        rank: 3,
        location: "Bangalore"
      }
    ];
  }
}

export const storage = new EnhancedStorage();