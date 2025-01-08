import express from "express";
import {getUserData} from "../controllers/user_controller.js";
import userAuth from "../middleware/userAuth.js";

const userRouter = express.Router();

userRouter.get('/', userAuth, getUserData);

export default userRouter;
