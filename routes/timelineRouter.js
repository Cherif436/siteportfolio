import express from "express";
import {
  deleteTimeline,
  getAllTimelines,
  getSingleTimeline,
  postTimeline,
  updateTimeline,
  // updateTimeline,
} from "../controller/timelineController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, postTimeline);
router.put("/update/:id", isAuthenticated, updateTimeline);
router.delete("/delete/:id", isAuthenticated, deleteTimeline);
router.get("/getall", getAllTimelines);
router.get("/get/:id", getSingleTimeline);

export default router;
