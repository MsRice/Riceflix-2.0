const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
import express, { Request, Response } from "express";
const connectDB = require("./config/connection");
const cors = require("cors");

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// Connect to Database
connectDB();

// Middleware

const allowedOrigins = [
  process.env.FRONT_URL_PORT, //live
  "http://localhost:5173", // Dev default
  "http://localhost:5174", //Dev port
];
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/content", require("./routes/contentRoutes"));

// Health Check
app.get("/", (req: Request, res: Response) => res.send("API is running 🚀"));

// Listen on 0.0.0.0 for Docker
app.listen(PORT, "0.0.0.0", () => {
  console.log(`\x1b[32m%s\x1b[0m`, `🎬 [Riceflix-API]: Ready to stream!`);
  console.log(`\x1b[36m%s\x1b[0m`, `📍 Port: ${PORT} | ☕ Coffee: Pending...`);
});
