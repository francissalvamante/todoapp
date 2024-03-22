"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_controller_1 = require("../controllers/todos.controller");
const router = (0, express_1.Router)();
router.get("/", todos_controller_1.todosController.getTodos);
router.post("/", todos_controller_1.todosController.addTodo);
router.put("/:id", todos_controller_1.todosController.updateTodo);
exports.default = router;
