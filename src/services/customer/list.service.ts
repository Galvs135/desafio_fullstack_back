import AppDataSource from "../../data-source";
import Costumers from "../../entities/costumers.entities";
import AppError from "../../errors/AppError";

const searchCostumerService = async (id: string): Promise<Costumers> => {
  const costumersRepository = AppDataSource.getRepository(Costumers);
  const costumer = await costumersRepository.findOneBy({ id });

  if (!costumer) {
    throw new AppError("Costumer not found");
  }

  return costumer;
};

export default searchCostumerService;
