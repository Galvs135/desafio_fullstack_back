import { Router } from "express";
import AppError from "../errors/AppError";
import {
  createUserController,
  deleteUserController,
  searchUserController,
  updateUserController,
} from "../controllers/users.controller";
import { authMiddleware } from "../middlewares/auth.midleware";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("/:id", authMiddleware, searchUserController);
userRouter.patch("/:id", authMiddleware, updateUserController);
userRouter.delete("/:id", authMiddleware, deleteUserController);

userRouter.get("/error", async (req, res) => {
  throw new AppError("Debug error route", 500);
});

export default userRouter;
