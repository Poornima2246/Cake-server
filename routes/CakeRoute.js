 


import express from "express";
import multer from "multer";
import path from "path";
import { addFood, listFood, getFood, removeFood } from "../controllers/foodController.js";

const CakeRoute = express.Router();

// Multer configuration for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(path.resolve(), "upload");
        cb(null, uploadPath); // Use an absolute path to avoid issues
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`); // Add timestamp to prevent overwrites
    },
});

const maxSize = 5 * 1024 * 1024; // 5MB file size limit
const upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true); // Allow image files only
        } else {
            cb(new Error("Invalid file type. Only images are allowed."), false);
        }
    },
});

CakeRoute.post(
    "/add",
    upload.fields([
        { name: "mainImage", maxCount: 1 }, // Single main image
        { name: "addImage1", maxCount: 1 }, 
        { name: "addImage2", maxCount: 1 },
    ]),
    addFood
);
CakeRoute.get("/list", listFood);
CakeRoute.get("/:id", getFood); // Get a single cake by ID
CakeRoute.post("/remove", removeFood);

export default CakeRoute;
