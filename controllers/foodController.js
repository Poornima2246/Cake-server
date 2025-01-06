 

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



import CakeModel from "../Models/CakeModel.js";
import path from "path";
import fs from "fs";

// Add a new cake
const addFood = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const files = req.files;

        if (!files || !files.mainImage || !files.mainImage.length) {
            return res.status(400).json({ success: false, message: "Main image is required." });
        }

        const mainImage = files.mainImage[0].filename;
        const addImage1 = files.addImage1 ? files.addImage1[0].filename : null;
        const addImage2 = files.addImage2 ? files.addImage2[0].filename : null;

        const cake = new CakeModel({
            name,
            description,
            price,
            category,
            mainImage,
            addImage1,
            addImage2,
        });

        await cake.save();
        res.json({ success: true, message: "Cake added successfully", data: cake });
    } catch (error) {
        console.error("Error in addFood:", error);
        res.status(500).json({ success: false, message: "Error adding cake" });
    }
};

// List all cakes
const listFood = async (req, res) => {
    try {
        const cakes = await CakeModel.find({});
        res.json({ success: true, data: cakes });
    } catch (error) {
        console.error("Error in listFood:", error);
        res.status(500).json({ success: false, message: "Error fetching cakes" });
    }
};

// Get a single cake by ID
const getFood = async (req, res) => {
    try {
        const cake = await CakeModel.findById(req.params.id);
        if (!cake) {
            return res.status(404).json({ success: false, message: "Cake not found" });
        }
        res.json({ success: true, data: cake });
    } catch (error) {
        console.error("Error in getFood:", error);
        res.status(500).json({ success: false, message: "Error fetching cake details" });
    }
};

// Remove a cake by ID
const removeFood = async (req, res) => {
    try {
        const { id } = req.body;
        const cake = await CakeModel.findById(id);
        if (!cake) {
            return res.status(404).json({ success: false, message: "Cake not found" });
        }

        // Delete associated files from the server
        const uploadPath = path.join(path.resolve(), "upload");
        if (cake.mainImage) fs.unlinkSync(path.join(uploadPath, cake.mainImage));
        if (cake.addImage1) fs.unlinkSync(path.join(uploadPath, cake.addImage1));
        if (cake.addImage2) fs.unlinkSync(path.join(uploadPath, cake.addImage2));

        await CakeModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Cake removed successfully" });
    } catch (error) {
        console.error("Error in removeFood:", error);
        res.status(500).json({ success: false, message: "Error removing cake" });
    }
};

export { addFood, listFood, getFood, removeFood };

