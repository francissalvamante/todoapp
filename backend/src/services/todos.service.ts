import { Todos } from "../entity/todos.entity";
import { source } from "../dataSource";
const todosRepository = source.getRepository(Todos);

type GetTodos = {
  identifier: string;
};

const getTodos = async (getDTO: GetTodos) => {
  return await todosRepository.findBy({
    identifier: getDTO.identifier,
  });
};

export const todosService = {
  getTodos,
};
