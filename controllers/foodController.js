 

// // new 
// import CakeModel from "../Models/CakeModel.js";
// import fs from "fs";

// // Add a cake item
// const addFood = async (req, res) => {
//     try {
//         console.log("Request body:", req.body);
//         console.log("Uploaded files:", req.files);

//         // Extract image filenames
//         const mainImage = req.files.mainImage ? req.files.mainImage[0].filename : null;
//         const addImage1 = req.files.addImage1 ? req.files.addImage1[0].filename : null;
//         const addImage2 = req.files.addImage2 ? req.files.addImage2[0].filename : null;

//               // const additionalImages = req.files.additionalImages
//         //     ? req.files.additionalImages.map(file => file.filename)
//         //     : [];
//         // Create a new cake instance
//         const cake = new CakeModel({
//             name: req.body.name,
//             description: req.body.description,
//             price: req.body.price,
//             category: req.body.category,
//             mainImage, // Single main image
//             addImage1,
//             addImage2,
//             // additionalImages, // Array of additional images
        
//         });

//         // Save the cake to the database
//         await cake.save();
//         res.json({ success: true, message: "Cake added successfully" });
//     } catch (error) {
//         console.error("Error in addFood controller:", error);
//         res.status(500).json({ success: false, message: "Error adding cake" });
//     }
// };

// // Other controller methods remain unchanged...
// const listFood = async (req, res) => {
//         try {
//             const cakes = await CakeModel.find({});
//             res.json({ success: true, data: cakes });
//         } catch (error) {
//             console.error(error);
//             res.json({ success: false, message: "Error fetching cakes" });
//         }
//     };
//  const getFood = async (req, res) => {  
//       try {
//     const cake = await CakeModel.findById(req.params.id);
//     if (!cake) {
//         return res.status(404).json({ success: false, message: "Cake not found" });
//     }
//     res.json(cake);
// } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Error fetching cake details" });
// }};
// const removeFood = async (req, res) => {
     
//   };

// export { addFood, listFood, getFood, removeFood };


// Controller: foodController.js

import CakeModel from "../Models/CakeModel.js";
import fs from "fs";

// Add a new cake item
const addFood = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        console.log("Uploaded files:", req.files);

        // Utility function to extract image paths dynamically
        const extractImage = (field) => req.files[field] ? `/upload/${req.files[field][0].filename}` : null;

        // Extract image file paths
        const mainImage = extractImage("mainImage");
        const addImage1 = extractImage("addImage1");
        const addImage2 = extractImage("addImage2");

        // Validate mandatory fields
        if (!req.body.name || !req.body.price) {
            return res.status(400).json({ success: false, message: "Name and price are required" });
        }

        // Create a new cake instance
        const cake = new CakeModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            mainImage,
            addImage1,
            addImage2,
        });

        // Save the cake to the database
        await cake.save();
        res.status(201).json({ success: true, message: "Cake added successfully", data: cake });
    } catch (error) {
        console.error("Error in addFood controller:", error);
        res.status(500).json({ success: false, message: "Error adding cake" });
    }
};

// List all cakes
const listFood = async (req, res) => {
    try {
        const cakes = await CakeModel.find({});
        res.json({ success: true, data: cakes });
    } catch (error) {
        console.error("Error in listFood controller:", error);
        res.status(500).json({ success: false, message: "Error fetching cakes" });
    }
};

// Get details of a single cake
const getFood = async (req, res) => {
    try {
        const cake = await CakeModel.findById(req.params.id);
        if (!cake) {
            return res.status(404).json({ success: false, message: "Cake not found" });
        }
        res.json({ success: true, data: cake });
    } catch (error) {
        console.error("Error in getFood controller:", error);
        res.status(500).json({ success: false, message: "Error fetching cake details" });
    }
};

// Remove a cake item
const removeFood = async (req, res) => {
    try {
        const { id } = req.body;

        // Validate input
        if (!id) {
            return res.status(400).json({ success: false, message: "Cake ID is required" });
        }

        // Find and delete the cake
        const cake = await CakeModel.findByIdAndDelete(id);
        if (!cake) {
            return res.status(404).json({ success: false, message: "Cake not found" });
        }

        // Delete images from storage (optional)
        const deleteImage = (imagePath) => {
            if (imagePath) {
                const filePath = `.${imagePath}`; // Convert URL to file path
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
        };

        deleteImage(cake.mainImage);
        deleteImage(cake.addImage1);
        deleteImage(cake.addImage2);

        res.json({ success: true, message: "Cake removed successfully" });
    } catch (error) {
        console.error("Error in removeFood controller:", error);
        res.status(500).json({ success: false, message: "Error removing cake" });
    }
};

export { addFood, listFood, getFood, removeFood };



