import AppDataSource from "../../data-source";
import { ICostumerUpdate } from "../../interfaces";
import AppError from "../../errors/AppError";
import Costumers from "../../entities/costumers.entities";

const updateCostumerService = async (
  { name, email, phone }: ICostumerUpdate,
  id: string
): Promise<Costumers | Array<string>> => {
  const costumersRepository = AppDataSource.getRepository(Costumers);

  const findCostumer = await costumersRepository.findOneBy({ id });

  if (!findCostumer) {
    throw new AppError("User not found", 404);
  }

  await costumersRepository.update(id, {
    name: name ? name : findCostumer.name,
    email: email ? email : findCostumer.email,
    phone: phone ? phone : findCostumer.phone,
  });

  const costumer = await costumersRepository.findOneBy({ id });

  return costumer!;
};

export default updateCostumerService;
