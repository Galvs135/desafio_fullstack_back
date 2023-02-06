import { Request, Response } from "express";

import { IUserLogin } from "../interfaces";
import createSessionService from "../services/session/loginUser.service";

const createSessionController = async (req: Request, res: Response) => {
  const { email, name }: IUserLogin = req.body;
  const token = await createSessionService({ email, name });
  return res.status(201).json({ token });
};

export { createSessionController };
