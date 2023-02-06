import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";
import Costumers from "../../entities/costumers.entities";

const deleteCostumerService = async (id: string): Promise<void> => {
  const costumersRepository = AppDataSource.getRepository(Costumers);

  const costumer = await costumersRepository.findOneBy({ id });

  if (!costumer) {
    throw new AppError("Costumer not found", 404);
  }

  await costumersRepository.delete({ id });
};

export default deleteCostumerService;
