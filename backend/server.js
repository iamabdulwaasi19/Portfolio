import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";

dotenv.config({ path: ".env" });

connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://portfolio-ruddy-gamma-14.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      const sanitizedOrigin = origin ? origin.replace(/\/$/, "") : null;

      if (!sanitizedOrigin || allowedOrigins.includes(sanitizedOrigin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "Portfolio API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
