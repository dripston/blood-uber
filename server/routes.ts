import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.ts";
import { userSchema, messageSchema } from "../shared/schema.ts";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/users/:id", async (req, res) => {
    try {
      const updates = req.body;
      const user = await storage.updateUser(req.params.id, updates);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Donor routes
  app.get("/api/donors/user/:userId", async (req, res) => {
    try {
      const donor = await storage.getDonorByUserId(req.params.userId);
      if (!donor) {
        return res.status(404).json({ message: "Donor not found" });
      }
      res.json(donor);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/donors/blood-group/:bloodGroup", async (req, res) => {
    try {
      const donors = await storage.getDonorsByBloodGroup(req.params.bloodGroup);
      const donorsWithUsers = await Promise.all(
        donors.map(async (donor) => {
          const user = await storage.getUser(donor.userId);
          return { ...donor, user };
        })
      );
      res.json(donorsWithUsers);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/donors", async (req, res) => {
    try {
      const donor = await storage.createDonor(req.body);
      res.status(201).json(donor);
    } catch (error) {
      console.error("Error creating donor:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Patient routes
  app.get("/api/patients/user/:userId", async (req, res) => {
    try {
      const patient = await storage.getPatientByUserId(req.params.userId);
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
      res.json(patient);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/patients", async (req, res) => {
    try {
      const patient = await storage.createPatient(req.body);
      res.status(201).json(patient);
    } catch (error) {
      console.error("Error creating patient:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Match routes
  app.get("/api/matches/patient/:patientId", async (req, res) => {
    try {
      const matches = await storage.getMatchesByPatientId(req.params.patientId);
      const matchesWithDetails = await Promise.all(
        matches.map(async (match) => {
          const donor = await storage.getDonor(match.donorId);
          const donorUser = donor ? await storage.getUser(donor.userId) : null;
          return { ...match, donor, donorUser };
        })
      );
      res.json(matchesWithDetails);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/matches/donor/:donorId", async (req, res) => {
    try {
      const matches = await storage.getMatchesByDonorId(req.params.donorId);
      const matchesWithDetails = await Promise.all(
        matches.map(async (match) => {
          const patient = await storage.getPatient(match.patientId);
          const patientUser = patient ? await storage.getUser(patient.userId) : null;
          return { ...match, patient, patientUser };
        })
      );
      res.json(matchesWithDetails);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Message routes
  app.get("/api/messages/:user1Id/:user2Id", async (req, res) => {
    try {
      const messages = await storage.getMessagesBetweenUsers(
        req.params.user1Id,
        req.params.user2Id
      );
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const message = await storage.createMessage(req.body);
      res.status(201).json(message);
    } catch (error) {
      console.error("Error creating message:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/conversations/:userId", async (req, res) => {
    try {
      const conversations = await storage.getConversationsForUser(req.params.userId);
      res.json(conversations);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Enhanced blockchain and ML features
  app.get("/api/donation-history/:donorId", async (req, res) => {
    try {
      const history = await storage.getDonationHistory(req.params.donorId);
      res.json(history);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/donor-badges/:donorId", async (req, res) => {
    try {
      const badges = await storage.getDonorBadges(req.params.donorId);
      res.json(badges);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/blockchain-tokens/:donorId", async (req, res) => {
    try {
      const tokens = await storage.getBlockchainTokens(req.params.donorId);
      res.json(tokens);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/donor-rewards", async (req, res) => {
    try {
      const rewards = await storage.getDonorRewards();
      res.json(rewards);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/ml-prediction/:patientId", async (req, res) => {
    try {
      const prediction = await storage.getMLPrediction(req.params.patientId);
      res.json(prediction);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/leaderboard", async (req, res) => {
    try {
      const leaderboard = await storage.getLeaderboard();
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Login simulation
  app.post("/api/login", async (req, res) => {
    try {
      const { email, userType } = req.body;
      const user = await storage.getUserByEmail(email);
  
      if (!user) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
  
      let healthDetailsCompleted = false;
  
      if (userType === "patient") {
        healthDetailsCompleted = !!(await storage.getPatientByUserId(user.id));
      } else if (userType === "donor") {
        healthDetailsCompleted = !!(await storage.getDonorByUserId(user.id));
      } else if (userType === "both") {
        const hasPatient = await storage.getPatientByUserId(user.id);
        const hasDonor = await storage.getDonorByUserId(user.id);
        healthDetailsCompleted = !!(hasPatient && hasDonor);
      }
  
      res.json({
        success: true,
        user: { ...user, healthDetailsCompleted:false },
        redirectTo:
          userType === "donor"
            ? "/dashboard-donor"
            : userType === "patient"
            ? "/dashboard-patient"
            : "/dashboard-patient", // or another page for 'both'
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  })  ;
  
  // AI Chat route (enhanced)
  app.post("/api/ai-chat", async (req, res) => {
    try {
      const { message } = req.body;
      
      // Enhanced AI responses based on content
      let response = "";
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes("thalassemia")) {
        response = "Thalassemia is a genetic blood disorder. Regular blood transfusions, iron chelation therapy, and monitoring are essential for management. Always follow your doctor's treatment plan.";
      } else if (lowerMessage.includes("donation") || lowerMessage.includes("donate")) {
        response = "Blood donation saves lives! Ensure you're well-rested, hydrated, and have eaten before donating. You'll earn blockchain tokens and badges for each donation.";
      } else if (lowerMessage.includes("token") || lowerMessage.includes("blockchain")) {
        response = "You earn blockchain tokens for each donation and milestone. Use tokens to redeem health checkups, consultations, and insurance discounts from our partner NGOs!";
      } else if (lowerMessage.includes("schedule") || lowerMessage.includes("appointment")) {
        response = "Our ML algorithm predicts your optimal transfusion schedule based on hemoglobin levels, medical history, and body metrics. Always confirm with your healthcare provider.";
      } else {
        const responses = [
          "I'm here to help with thalassemia-related questions and blood donation guidance. What would you like to know?",
          "Feel free to ask about donation schedules, blockchain rewards, or medical advice related to thalassemia.",
          "Remember to stay hydrated and follow your prescribed medication schedule."
        ];
        response = responses[Math.floor(Math.random() * responses.length)];
      }
      
      setTimeout(() => {
        res.json({ response });
      }, 1000);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
