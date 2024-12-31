// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { connectDB } from "./config/db.js";
// import CakeRoute from "./routes/CakeRoute.js";

// dotenv.config(); // Load environment variables

// const app = express();
// const port = process.env.PORT || 4000;

// // Middleware
// app.use('/upload', express.static('upload')); // Serve uploaded images
// app.use(express.json());
// app.use(cors({ origin: '*' })); // Allow requests from frontend

// // Connect to MongoDB 
// connectDB();

// // API routes
// app.use("/api/dessert", CakeRoute);

// // Default route
// app.get('/', (req, res) => {
//     res.send('Server is working');
// });

// // Start server
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import CakeRoute from "./routes/CakeRoute.js";

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 4000;

// ======== Middleware ========
app.use('/upload', express.static('upload')); // Serve uploaded images
app.use(express.json()); // Parse JSON requests
app.use(cors({ origin: '*' })); // Enable CORS for all origins

// ======== Database Connection ========
connectDB(); // Connect to MongoDB using the config/db.js file

// ======== API Routes ========
app.use("/api/dessert", CakeRoute); // Route for dessert-related APIs

// ======== Serve Static Frontend ========
const __dirname = path.resolve(); // Resolve the current directory
app.use(express.static(path.join(__dirname, "frontend/build"))); // Serve static React files

// ======== Fallback for SPA ========
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build"));
});

// ======== Start Server ========
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
