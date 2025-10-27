import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";

connectDB();

const app = express();
app.use(cors());
app.use(clerkMiddleware());

// Use JSON normally for all routes
app.use(express.json());

// Use raw body for Clerk webhooks
app.post("/api/clerk", bodyParser.raw({ type: "application/json" }), clerkWebhooks);

app.get("/", (req, res) => {
  res.send("API is working ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
