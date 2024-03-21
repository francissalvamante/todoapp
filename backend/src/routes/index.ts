import { Router } from "express";
import todosRoute from "./todos.route";

const router = Router();

router.use("/todos", todosRoute);

export default router;
