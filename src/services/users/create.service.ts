import { IUserCreate } from "../../interfaces";
import { hash } from "bcrypt";
import Users from "../../entities/users.entities";
import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";

const createUserService = async ({
  name,
  email,
  phone,
}: IUserCreate): Promise<Users> => {
  const usersRepository = AppDataSource.getRepository(Users);
  const findUser = await usersRepository.find();
  const emailAlreadyExists = findUser.find((user) => user.email === email);

  if (!phone || !email || !name) {
    throw new AppError("All the fields are required", 400);
  }

  if (emailAlreadyExists) {
    throw new AppError("Email already in use", 403);
  }

  const user = usersRepository.create({
    name,
    email,
    phone,
  });

  await usersRepository.save(user);

  return user;
};

export default createUserService;
