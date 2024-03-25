import { NextFunction, Request, Response, Router } from "express";
import todosRoute from "./todos.route";

const router = Router();

router.use("/todos", todosRoute);
router.use("/", (req: Request, res: Response, next: NextFunction) => {
  res.send({ message: "Test route successful" });
});

export default router;
