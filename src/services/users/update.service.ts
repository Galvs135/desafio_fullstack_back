import { hash } from "bcrypt";

import AppDataSource from "../../data-source";
import Users from "../../entities/users.entities";
import { IUserUpdate } from "../../interfaces";
import AppError from "../../errors/AppError";

const updateUserService = async (
  { name, email, phone }: IUserUpdate,
  id: string,
  tokenId: string
): Promise<Users | Array<string>> => {
  const usersRepository = AppDataSource.getRepository(Users);

  const findUser = await usersRepository.findOneBy({ id });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  if (id !== tokenId) {
    throw new AppError("Unauthorized access", 403);
  }

  await usersRepository.update(id, {
    name: name ? name : findUser.name,
    email: email ? email : findUser.email,
    phone: phone ? phone : findUser.phone,
  });

  const user = await usersRepository.findOneBy({ id });

  return user!;
};

export default updateUserService;
