import express from "express";
import { createResume, getResumeById, deleteResume } from "../controllers/resume_controller.js";

const resumeRouter = express.Router();

resumeRouter.post('/create', createResume);
resumeRouter.get('/get/:userId', getResumeById);
resumeRouter.delete('/delete/:resumeId', deleteResume);

export default resumeRouter;