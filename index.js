 


// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";
// import { connectDB } from "./config/db.js";
// import CakeRoute from "./routes/CakeRoute.js";

// dotenv.config(); // Load environment variables from .env file

// const app = express();
// const port = process.env.PORT || 4000;

// // ======== Middleware ========
// app.use('/upload', express.static('upload')); // Serve uploaded images
// app.use(express.json()); // Parse JSON requests
// app.use(cors({ origin: '*' })); // Enable CORS for all origins

// // ======== Database Connection ========
// connectDB(); // Connect to MongoDB using the config/db.js file

// // ======== API Routes ========
// app.use("/api/dessert", CakeRoute); // Route for dessert-related APIs

// // ======== Serve Static Frontend ========
// const __dirname = path.resolve(); // Resolve the current directory
// app.use(express.static(path.join(__dirname, "../foodcort/build"))); // Serve static React files

// // ======== Fallback for SPA ========
// app.get("*", (req, res) => {
//     res.send(" hello connected")
//   res.sendFile(path.join(__dirname, "../foodcort/build", "index.html"));
//   console.log("server connected");
  
// });

// // ======== Start Server ========
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import multer from "multer";
import { connectDB } from "./config/db.js";
import CakeRoute from "./routes/CakeRoute.js";

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 4000;

// ======== Middleware ========
app.use('/upload', express.static('upload')); // Serve uploaded images
app.use(express.json()); // Parse JSON requests
app.use(cors({ origin: '*' })); // Enable CORS for all origins

// ======== Multer Setup ========
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload'); // Set the destination folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Set unique file name
  },
});
const upload = multer({ storage });

// ======== Database Connection ========
connectDB(); // Connect to MongoDB using the config/db.js file

// ======== API Routes ========
app.use("/api/dessert", CakeRoute); // Route for dessert-related APIs

// ======== File Upload Route ========
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.status(200).json({
    message: 'File uploaded successfully',
    filePath: `/upload/${req.file.filename}`,
  });
});

// ======== Serve Static Frontend ========
const __dirname = path.resolve(); // Resolve the current directory
app.use(express.static(path.join(__dirname, "../foodcort/build"))); // Serve static React files

// ======== Fallback for SPA ========
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../foodcort/build", "index.html"));
  console.log("server connected");
});

// ======== Start Server ========
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
