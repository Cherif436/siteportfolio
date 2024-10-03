import express from "express";
import { addNewService, deleteService, getAllServices, getSingleService, updateService } from "../controller/serviceController.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();

router.post("/add", isAuthenticated, addNewService);
router.delete("/delete/:id", isAuthenticated, deleteService);
router.put("/update/:id", isAuthenticated, updateService);
router.get("/getall", getAllServices);
router.get("/get/:id", getSingleService);

export default router;
