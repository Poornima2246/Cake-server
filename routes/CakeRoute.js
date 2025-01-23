 
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


// import express from "express";
// import multer from "multer";
// import { addFood, listFood, getFood, removeFood } from "../controllers/foodController.js";

// const CakeRoute = express.Router();

// // Multer configuration for image upload
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadPath = "upload";
//         cb(null, uploadPath); // Folder to store images
//     }, // Folder to store images
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}_${file.originalname}`);
//     },
// });

// const maxSize = 5 * 1024 * 1024; // 5MB file size limit
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: maxSize },
//      fileFilter: (req, file, cb) => {
//         // Accept images only
//         if (!file.mimetype.startsWith('image/')) {
//             return cb(new Error('Only image files are allowed!'), false);
//         }
//         cb(null, true);
//     },
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


// new file 

import express from 'express';
import multer from 'multer';
import { addFood, listFood, getFood, removeFood } from '../controllers/CakeController.js';

const CakeRoute = express.Router();

// Multer configuration for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = "upload";
        cb(null, uploadPath); // Folder to store images
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}_${file.originalname}`;
        cb(null, uniqueSuffix);
    },
});

const maxSize = 5 * 1024 * 1024; // 5MB file size limit
const upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
        // Accept images only
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
});

CakeRoute.post(
    "/add",
    upload.fields([
        { name: "mainImage", maxCount: 1 }, // Single main image
        { name: "addImage1", maxCount: 1 },
        { name: "addImage2", maxCount: 1 },
    ]),
    async (req, res) => {
        try {
            const { name, description, price, category } = req.body;
            const mainImage = req.files.mainImage ? req.files.mainImage[0].filename : null;
            const addImage1 = req.files.addImage1 ? req.files.addImage1[0].filename : null;
            const addImage2 = req.files.addImage2 ? req.files.addImage2[0].filename : null;

            const newCake = {
                name,
                description,
                price,
                category,
                mainImage,
                addImage1,
                addImage2,
            };

            // Save the new cake to the database
            const savedCake = await addFood(newCake);
            res.status(201).json(savedCake);
        } catch (error) {
            console.error("Error adding cake:", error);
            res.status(500).json({ message: "Failed to add cake" });
        }
    }
);

CakeRoute.get("/list", listFood);
CakeRoute.get("/:id", getFood); // Route for fetching a single cake
CakeRoute.post("/remove", removeFood);

export default CakeRoute;
