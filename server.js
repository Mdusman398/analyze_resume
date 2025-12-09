require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./backend/services/db");

const authRoutes = require("./backend/routes/authRoutes");
const resumeRoutes = require("./backend/routes/resumeRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || `http://localhost:3000`;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const corsOptions = {
  origin: FRONTEND_URL,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(`Frontend URL configured: ${FRONTEND_URL}`);
});
