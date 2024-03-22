import { Router } from "express";
import { todosController } from "../controllers/todos.controller";

const router = Router();

router.get("/", todosController.getTodos);
router.post("/", todosController.addTodo);

router.put("/:id", todosController.updateTodo);

export default router;
