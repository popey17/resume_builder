import express from "express";
import { createResume, getResumeById, deleteResume, updateResume, getResumes } from "../controllers/resume_controller.js";

const resumeRouter = express.Router();

resumeRouter.post('/create', createResume);
resumeRouter.get('/get/:userId', getResumeById);
resumeRouter.delete('/delete/:resumeId', deleteResume);
resumeRouter.put('/update/:resumeId', updateResume);
resumeRouter.get('/all', getResumes);

export default resumeRouter;