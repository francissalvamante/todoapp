import { NextFunction, Request, Response } from "express";
import { todosService } from "../services/todos.service";

const getTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getDTO = { ...req.body };

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

    console.log("addDTO", addDTO);

    res.status(200).json({ message: "Success" });
  } catch (err: any) {
    console.error(`Adding Todo failed: ${err}`);
    next(err);
  }
};

export const todosController = {
  getTodos,
  addTodo,
};
