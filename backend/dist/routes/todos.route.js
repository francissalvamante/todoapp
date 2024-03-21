"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_controller_1 = require("../controllers/todos.controller");
const router = (0, express_1.Router)();
router.get("/", todos_controller_1.todosController.getTodos);
exports.default = router;
