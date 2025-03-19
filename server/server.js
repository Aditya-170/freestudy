import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import connectCloudinary from "./configs/cloudinary.js";
import { clerkWebhooks, stripeWebhooks } from "./controllers/webhook.js";
import educatorRouter from "./routes/educatorRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import courseRouter from "./routes/courseRoutes.js";
import userRouter from "./routes/userRoutes.js";

// Initialize Express
const app = express();

// Database Connection
await connectDB();
await connectCloudinary();

// Middlewares (Fixed Order)
app.use(cors());
app.use(clerkMiddleware());

// Routes
app.get("/", (req, res) => res.send("API working"));
app.post("/clerk",express.json(), clerkWebhooks);
app.use("/api/educator",express.json(), educatorRouter);
app.use("/api/course",express.json(), courseRouter);
app.use('/api/user',express.json(),userRouter);
app.post('/stripe',express.raw({type: 'application/json'}), stripeWebhooks);


// Port
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});

