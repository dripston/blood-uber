import { z } from "zod";

// Zod schemas for validation
export const userSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(1),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
  bloodGroup: z.string().min(1),
  userType: z.enum(["patient", "donor", "both"]),
  location: z.string().min(1),
  availability: z.string().optional(),
  isVerified: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
});

export const donorSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  lastDonationDate: z.date().optional(),
  totalDonations: z.string().default("0"),
  isActive: z.boolean().default(true),
  currentTokens: z.string().default("0"),
  totalTokensEarned: z.string().default("0"),
  badgeLevel: z.enum(["novice", "lifesaver", "hero", "champion", "legend"]).default("novice"),
});

export const patientSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  condition: z.string().default("thalassemia"),
  urgencyLevel: z.enum(["low", "medium", "high"]).default("medium"),
  nextRequiredDate: z.date().optional(),
  hemoglobinLevel: z.string().optional(),
  weight: z.string().optional(),
  age: z.string().optional(),
  medicalHistory: z.string().optional(),
});

export const donationHistorySchema = z.object({
  id: z.string().optional(),
  donorId: z.string(),
  patientId: z.string(),
  donationDate: z.date(),
  amount: z.string().default("450ml"),
  hospital: z.string(),
  status: z.enum(["completed", "pending", "cancelled"]).default("completed"),
  healthMetrics: z.object({
    hemoglobin: z.string().optional(),
    bloodPressure: z.string().optional(),
    weight: z.string().optional(),
    temperature: z.string().optional(),
  }).optional(),
  tokensEarned: z.string().default("10"),
  createdAt: z.date().default(() => new Date()),
});

export const donorBadgeSchema = z.object({
  id: z.string().optional(),
  donorId: z.string(),
  badgeType: z.enum(["lifesaver", "hero", "champion", "legend"]),
  earnedAt: z.date().default(() => new Date()),
  donationCount: z.string(),
  description: z.string().optional(),
});

export const blockchainTokenSchema = z.object({
  id: z.string().optional(),
  donorId: z.string(),
  tokenAmount: z.string(),
  earnedFrom: z.enum(["donation", "referral", "milestone", "bonus"]),
  transactionHash: z.string().optional(),
  earnedAt: z.date().default(() => new Date()),
});

export const donorRewardSchema = z.object({
  id: z.string().optional(),
  donorId: z.string(),
  rewardType: z.enum(["health_checkup", "medical_consultation", "insurance_discount", "hospital_voucher"]),
  rewardValue: z.string(),
  provider: z.string(),
  description: z.string(),
  tokensRequired: z.string(),
  redeemedAt: z.date().optional(),
  expiresAt: z.date().optional(),
  isActive: z.boolean().default(true),
  createdAt: z.date().default(() => new Date()),
});

export const mlPredictionSchema = z.object({
  id: z.string().optional(),
  patientId: z.string(),
  nextRequiredDate: z.date(),
  urgencyScore: z.string(), // 1-10 scale
  predictedAmount: z.string().default("450ml"),
  confidenceLevel: z.string(), // percentage
  factorsConsidered: z.array(z.string()).default([]),
  recommendations: z.array(z.string()).default([]),
  createdAt: z.date().default(() => new Date()),
});

export const donorPatientMatchSchema = z.object({
  id: z.string().optional(),
  donorId: z.string(),
  patientId: z.string(),
  matchScore: z.string().default("0"),
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]).default("pending"),
  scheduledDate: z.date().optional(),
  distanceKm: z.string().optional(),
  compatibilityScore: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
});

export const messageSchema = z.object({
  id: z.string().optional(),
  senderId: z.string(),
  recipientId: z.string(),
  content: z.string().min(1),
  timestamp: z.date().default(() => new Date()),
  isRead: z.boolean().default(false),
});

// Type exports
export type User = z.infer<typeof userSchema>;
export type Donor = z.infer<typeof donorSchema>;
export type Patient = z.infer<typeof patientSchema>;
export type DonationHistory = z.infer<typeof donationHistorySchema>;
export type DonorBadge = z.infer<typeof donorBadgeSchema>;
export type BlockchainToken = z.infer<typeof blockchainTokenSchema>;
export type DonorReward = z.infer<typeof donorRewardSchema>;
export type MLPrediction = z.infer<typeof mlPredictionSchema>;
export type DonorPatientMatch = z.infer<typeof donorPatientMatchSchema>;
export type Message = z.infer<typeof messageSchema>;

// Insert types (without id and timestamps)
export type InsertUser = Omit<User, "id" | "createdAt">;
export type InsertDonor = Omit<Donor, "id">;
export type InsertPatient = Omit<Patient, "id">;
export type InsertDonationHistory = Omit<DonationHistory, "id" | "createdAt">;
export type InsertDonorBadge = Omit<DonorBadge, "id" | "earnedAt">;
export type InsertBlockchainToken = Omit<BlockchainToken, "id" | "earnedAt">;
export type InsertDonorReward = Omit<DonorReward, "id" | "createdAt">;
export type InsertMLPrediction = Omit<MLPrediction, "id" | "createdAt">;
export type InsertDonorPatientMatch = Omit<DonorPatientMatch, "id" | "createdAt">;
export type InsertMessage = Omit<Message, "id" | "timestamp">;