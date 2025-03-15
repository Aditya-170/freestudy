import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhook.js";

// Initialize Express
const app = express();

// Database Connection
connectDB()
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// Middlewares
app.use(cors());
app.use(express.json()); // Apply globally

// Routes
app.get("/", (req, res) => res.send("API working"));
app.post("/clerk", clerkWebhooks);

// Port
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
