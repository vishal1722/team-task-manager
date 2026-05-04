import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js"; 
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// ✅ USE ONLY ONE CORS
app.use(cors({
  origin: [
    "http://localhost:5173", // local dev
    "https://team-task-manageretha.netlify.app" // production
  ],
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

export default app;