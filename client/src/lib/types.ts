export interface DonorWithUser {
  id: string;
  userId: string;
  lastDonationDate: Date | null;
  totalDonations: string;
  isActive: boolean;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    bloodGroup: string;
    location: string;
    availability: string | null;
  };
}

export interface MatchWithDetails {
  id: string;
  donorId: string;
  patientId: string;
  matchScore: string;
  status: string;
  scheduledDate: Date | null;
  createdAt: Date;
  donor?: any;
  donorUser?: any;
  patient?: any;
  patientUser?: any;
}

export interface ConversationItem {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    userType: string;
  };
  lastMessage: {
    id: string;
    content: string;
    timestamp: Date;
  };
}

export interface ChatMessage {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}
