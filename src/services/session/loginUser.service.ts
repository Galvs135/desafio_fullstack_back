import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

import { IUserLogin } from "../../interfaces";
import Users from "../../entities/users.entities";
import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";

const createSessionService = async ({
  name,
  email,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(Users);
  const user = await userRepository.findOneBy({ email: email });

  if (!user) {
    throw new AppError("Invalid name or password", 403);
  }

  if (!user.isActive) {
    throw new AppError("User inactive", 400);
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.SECRET_KEY as string,
    {
      subject: user.id,
      expiresIn: "24h",
    }
  );
  return token;
};

export default createSessionService;
