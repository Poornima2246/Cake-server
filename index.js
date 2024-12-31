import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import CakeRoute from "./routes/CakeRoute.js";

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use('/upload', express.static('upload')); // Serve uploaded images
app.use(express.json());
app.use(cors({ origin: '*' })); // Allow requests from frontend

// Connect to MongoDB
connectDB();

// API routes
app.use("/api/dessert", CakeRoute);

// Default route
app.get('/', (req, res) => {
    res.send('Server is working');
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
