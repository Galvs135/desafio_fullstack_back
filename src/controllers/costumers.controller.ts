import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";

import { ICostumerCreate, ICostumerUpdate } from "../interfaces";
import createCustomerService from "../services/customer/create.service";
import deleteCostumerService from "../services/customer/delete.service";
import searchCostumerService from "../services/customer/list.service";
import updateCostumerService from "../services/customer/update.service";

const createCustomerController = async (req: Request, res: Response) => {
  const costumer: ICostumerCreate = req.body;
  const id = req.users.id;
  const createdCostumer = await createCustomerService(costumer, id);
  return res.status(201).json(instanceToPlain(createdCostumer));
};

const updateCustomerController = async (req: Request, res: Response) => {
  const costumer: ICostumerUpdate = req.body;
  const id: string = req.params.id;
  const updatedUser = await updateCostumerService(costumer, id);
  return res.status(201).json(instanceToPlain(updatedUser));
};

const deleteCustomerController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  await deleteCostumerService(id);
  return res.status(200).json({ message: "User deleted with success!" });
};

const searchCustomerController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const customer = await searchCostumerService(id);
  return res.status(200).json(instanceToPlain(customer));
};

export {
  createCustomerController,
  deleteCustomerController,
  searchCustomerController,
  updateCustomerController,
};
