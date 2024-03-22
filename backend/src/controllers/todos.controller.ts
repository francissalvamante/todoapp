import { NextFunction, Request, Response } from "express";
import { todosService } from "../services/todos.service";

const getTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getDTO = { identifier: req.query.identifier as string };

    const todos = await todosService.getTodos(getDTO);

    res.status(200).json({ message: "Success", todos });
  } catch (err: any) {
    console.error(`Error in getting user todos: ${err}`);
    next(err);
  }
};

const addTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const addDTO = { ...req.body };

    const todo = await todosService.addTodo(addDTO);

    res.status(200).json({ message: "Todo successfully added", todo });
  } catch (err: any) {
    console.error(`Adding Todo failed: ${err}`);
    next(err);
  }
};

const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateDTO = {
      id: parseInt(id),
      completed: req.body.completed,
    };

    await todosService.updateTodo(updateDTO);

    res.status(200).json({ message: `Todo ${id} successfully updated` });
  } catch (err: any) {
    console.error(`Adding Todo failed: ${err}`);
    next(err);
  }
};

export const todosController = {
  getTodos,
  addTodo,
  updateTodo,
};
