

// 1. Environment variables load karna sab se pehle
require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser'); 

// Database Connection function ko import karna
const connectDB = require('./backend/services/db');

// --- Import Routes 
const authRoutes = require('./backend/routes/authRoutes'); 
const resumeRoutes = require('./backend/routes/resumeRoutes');

// --- Server aur Configuration ---
const app = express();
const PORT = process.env.PORT || 3000; 
const FRONTEND_URL = process.env.FRONTEND_URL || `http://localhost:3000`; // FRONTEND_URL ko 3000 par set kiya

//  Database connection shuru karna
connectDB(); 

// 1. JSON data aur form data ko parse karne ke liye
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// 2. Cookie Parser add karna (Cookies handle karne ke liye)
app.use(cookieParser());

// 3.  CORS Setup (Cross-Origin Resource Sharing)
const corsOptions = {
    origin: FRONTEND_URL, 
    credentials: true, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions)); 

// 4.  Static files (Frontend/Public assets) ko serve karna
app.use(express.static(path.join(__dirname, 'public'))); 

// --- Route Setup ---
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

//  Server ko start karna 
app.listen(PORT, () => {
    console.log(` Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`Frontend URL configured: ${FRONTEND_URL}`);
});