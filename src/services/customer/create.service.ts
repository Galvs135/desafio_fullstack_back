import { ICostumerCreate } from "../../interfaces";
import Users from "../../entities/users.entities";
import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";
import Costumers from "../../entities/costumers.entities";

const createCustomerService = async (
  { name, email, phone }: ICostumerCreate,
  id: string
): Promise<Costumers> => {
  const costumersRepository = AppDataSource.getRepository(Costumers);
  const usersRepository = AppDataSource.getRepository(Users);
  const findUser = await usersRepository.findOneBy({ id });

  if (!phone || !email || !name) {
    throw new AppError("All the fields are required", 400);
  }
  if (!findUser) {
    throw new AppError("invalid user", 403);
  }

  const contact = costumersRepository.create({
    name,
    email,
    phone,
    userCostumers: findUser,
  });

  await costumersRepository.save(contact);

  return contact;
};

export default createCustomerService;
