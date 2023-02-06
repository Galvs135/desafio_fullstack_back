import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";

import { IUserCreate, IUserUpdate } from "../interfaces";
import createUserService from "../services/users/create.service";
import deleteUserService from "../services/users/delete.service";
import searchUserService from "../services/users/list.service";
import updateUserService from "../services/users/update.service";

const createUserController = async (req: Request, res: Response) => {
  const user: IUserCreate = req.body;
  const createdUser = await createUserService(user);
  return res.status(201).json(instanceToPlain(createdUser));
};

const updateUserController = async (req: Request, res: Response) => {
  const user: IUserUpdate = req.body;
  const id: string = req.params.id;
  const token = req.users.id;
  const updatedUser = await updateUserService(user, id, token);
  return res.status(201).json(instanceToPlain(updatedUser));
};

const deleteUserController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  await deleteUserService(id);
  return res.status(200).json({ message: "User deleted with success!" });
};

const searchUserController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const user = await searchUserService(id);
  return res.status(200).json(instanceToPlain(user));
};

export {
  createUserController,
  deleteUserController,
  searchUserController,
  updateUserController,
};
