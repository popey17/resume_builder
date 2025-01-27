import express from "express";
import { createResume, getResumeById, deleteResume, updateResume } from "../controllers/resume_controller.js";

const resumeRouter = express.Router();

resumeRouter.post('/create', createResume);
resumeRouter.get('/get/:userId', getResumeById);
resumeRouter.delete('/delete/:resumeId', deleteResume);
resumeRouter.put('/update/:resumeId', updateResume);

export default resumeRouter;