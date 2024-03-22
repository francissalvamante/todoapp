import { Todos } from "../entity/todos.entity";
import { source } from "../dataSource";
const todosRepository = source.getRepository(Todos);

type GetTodos = {
  identifier: string;
};

type AddTodo = {
  dateAdded: Date;
  title: string;
  completed: boolean;
  dateCompleted: Date;
  identifier: string;
};

type UpdateTodo = {
  completed: boolean;
  id: number;
};

const getTodos = async (getDTO: GetTodos) => {
  return await todosRepository.findBy({
    identifier: getDTO.identifier,
  });
};

const addTodo = async (addDTO: AddTodo) => {
  const todo = new Todos();
  todo.identifier = addDTO.identifier;
  todo.title = addDTO.title;

  return await todosRepository.save(todo);
};

const updateTodo = async (updateDTO: UpdateTodo) => {
  await todosRepository.save({
    id: updateDTO.id,
    completed: updateDTO.completed,
  });
};

export const todosService = {
  getTodos,
  addTodo,
  updateTodo,
};
