import { Router } from "express";
import AppError from "../errors/AppError";
import { authMiddleware } from "../middlewares/auth.midleware";
import {
  createCustomerController,
  deleteCustomerController,
  searchCustomerController,
  updateCustomerController,
} from "../controllers/costumers.controller";

const customersRouter = Router();

customersRouter.post("", authMiddleware, createCustomerController);
customersRouter.get("/:id", authMiddleware, searchCustomerController);
customersRouter.patch("/:id", authMiddleware, updateCustomerController);
customersRouter.delete("/:id", authMiddleware, deleteCustomerController);

customersRouter.get("/error", async (req, res) => {
  throw new AppError("Debug error route", 500);
});

export default customersRouter;
