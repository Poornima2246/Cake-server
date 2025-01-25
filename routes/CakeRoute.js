 
// // new 
// import express from "express";
// import multer from "multer";
// import { addFood, listFood, getFood, removeFood } from "../controllers/foodController.js";

// const CakeRoute = express.Router();

// // Multer configuration for image upload
// const storage = multer.diskStorage({
//     destination: "upload", // Folder to store images
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}_${file.originalname}`);
//     },
// });

// const maxSize = 5 * 1024 * 1024; // 5MB file size limit
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: maxSize },
// });

// CakeRoute.post(
//     "/add",
//     upload.fields([
//         { name: "mainImage", maxCount: 1 }, // Single main image
//         { name: "addImage1", maxCount: 1 },
//         { name: "addImage2", maxCount: 1 },  // Up to 4 additional images
//     ]),
//     addFood
// );
// CakeRoute.get("/list", listFood);
// CakeRoute.get("/:id", getFood); // Route for fetching a single cake
// CakeRoute.post("/remove", removeFood);

// export default CakeRoute;


import express from "express";
import multer from "multer";
import { addFood, listFood, getFood, removeFood } from "../controllers/foodController.js";

const CakeRoute = express.Router();

// Multer configuration for image upload
const storage = multer.diskStorage({
    destination: "upload",// Folder to store images
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});


const maxSize = 5 * 1024 * 1024; // 5MB file size limit
const upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
  
});
// Middleware for logging requests
const logRequest = (req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
};

// Middleware for error handling
const handleError = (err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ success: false, message: err.message });
};

CakeRoute.use(logRequest);

CakeRoute.post(
    "/add",
    upload.fields([
        { name: "mainImage", maxCount: 1 }, // Single main image
        { name: "addImage1", maxCount: 1 },
        { name: "addImage2", maxCount: 1 },  // Up to 4 additional images
    ]),
    addFood
);
CakeRoute.get("/list", listFood);
CakeRoute.get("/:id", getFood); // Route for fetching a single cake
CakeRoute.post("/remove", removeFood);

export default CakeRoute;


// new file 
 
