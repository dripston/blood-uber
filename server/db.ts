import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blood-uber';

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: String,
  bloodGroup: { type: String, required: true },
  userType: { type: String, enum: ['patient', 'donor', 'both'], required: true },
  location: { type: String, required: true },
  availability: String,
  isVerified: { type: Boolean, default: false },
  coordinates: {
    lat: { type: Number, default: 12.9716 },
    lng: { type: Number, default: 77.5946 }
  }
}, { timestamps: true });

// Donor Schema
const donorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lastDonationDate: Date,
  totalDonations: { type: String, default: '0' },
  isActive: { type: Boolean, default: true },
  currentTokens: { type: String, default: '0' },
  totalTokensEarned: { type: String, default: '0' },
  badgeLevel: { type: String, enum: ['novice', 'lifesaver', 'hero', 'champion', 'legend'], default: 'novice' }
}, { timestamps: true });

// Patient Schema
const patientSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  condition: { type: String, default: 'thalassemia' },
  urgencyLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  nextRequiredDate: Date,
  hemoglobinLevel: String,
  weight: String,
  age: String,
  medicalHistory: String
}, { timestamps: true });

// Donation History Schema
const donationHistorySchema = new mongoose.Schema({
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  donationDate: { type: Date, required: true },
  amount: { type: String, default: '450ml' },
  hospital: { type: String, required: true },
  status: { type: String, enum: ['completed', 'pending', 'cancelled'], default: 'completed' },
  healthMetrics: {
    hemoglobin: String,
    bloodPressure: String,
    weight: String,
    temperature: String
  },
  tokensEarned: { type: String, default: '10' }
}, { timestamps: true });

// Donor Badge Schema
const donorBadgeSchema = new mongoose.Schema({
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor', required: true },
  badgeType: { type: String, enum: ['lifesaver', 'hero', 'champion', 'legend'], required: true },
  donationCount: { type: String, required: true },
  description: String,
  earnedAt: { type: Date, default: Date.now }
});

// Blockchain Token Schema
const blockchainTokenSchema = new mongoose.Schema({
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor', required: true },
  tokenAmount: { type: String, required: true },
  earnedFrom: { type: String, enum: ['donation', 'referral', 'milestone', 'bonus'], required: true },
  transactionHash: String,
  earnedAt: { type: Date, default: Date.now }
});

// Donor Reward Schema
const donorRewardSchema = new mongoose.Schema({
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor', required: true },
  rewardType: { type: String, enum: ['health_checkup', 'medical_consultation', 'insurance_discount', 'hospital_voucher'], required: true },
  rewardValue: { type: String, required: true },
  provider: { type: String, required: true },
  description: { type: String, required: true },
  tokensRequired: { type: String, required: true },
  redeemedAt: Date,
  expiresAt: Date,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// ML Prediction Schema
const mlPredictionSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  nextRequiredDate: { type: Date, required: true },
  urgencyScore: { type: String, required: true },
  predictedAmount: { type: String, default: '450ml' },
  confidenceLevel: { type: String, required: true },
  factorsConsidered: [String],
  recommendations: [String]
}, { timestamps: true });

// Match Schema
const matchSchema = new mongoose.Schema({
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  matchScore: { type: String, default: '0' },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  scheduledDate: Date,
  distanceKm: String,
  compatibilityScore: String
}, { timestamps: true });

// Message Schema
const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

// Export models
export const User = mongoose.model('User', userSchema);
export const Donor = mongoose.model('Donor', donorSchema);
export const Patient = mongoose.model('Patient', patientSchema);
export const DonationHistory = mongoose.model('DonationHistory', donationHistorySchema);
export const DonorBadge = mongoose.model('DonorBadge', donorBadgeSchema);
export const BlockchainToken = mongoose.model('BlockchainToken', blockchainTokenSchema);
export const DonorReward = mongoose.model('DonorReward', donorRewardSchema);
export const MLPrediction = mongoose.model('MLPrediction', mlPredictionSchema);
export const Match = mongoose.model('Match', matchSchema);
export const Message = mongoose.model('Message', messageSchema);