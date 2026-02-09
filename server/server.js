require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/connection");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors({ origin: process.env.FRONT_URL_PORT }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", require("./src/routes/userRouter"));

// Health Check
app.get("/", (req, res) => res.send("API is running 🚀"));

// Listen on 0.0.0.0 for Docker
app.listen(PORT, "0.0.0.0", () => {
  console.log(`\x1b[32m%s\x1b[0m`, `🎬 [Riceflix-API]: Ready to stream!`);
  console.log(`\x1b[36m%s\x1b[0m`, `📍 Port: ${PORT} | ☕ Coffee: Pending...`);
});
