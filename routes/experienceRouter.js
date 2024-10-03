import express from "express";
import { deleteExperience, getAllExperiences, getSingleExperience, postExperience, updateExperience } from "../controller/experienceController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, postExperience);
router.put("/update/:id", isAuthenticated, updateExperience);
router.delete("/delete/:id", isAuthenticated, deleteExperience);
router.get("/getall", getAllExperiences);
router.get("/get/:id", getSingleExperience);


export default router;