"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosController = void 0;
const todos_service_1 = require("../services/todos.service");
const getTodos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getDTO = { identifier: req.query.identifier };
        console.log(getDTO);
        const todos = yield todos_service_1.todosService.getTodos(getDTO);
        res.status(200).json({ message: "Success", todos });
    }
    catch (err) {
        console.error(`Error in getting user todos: ${err}`);
        next(err);
    }
});
const addTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addDTO = Object.assign({}, req.body);
        const todo = yield todos_service_1.todosService.addTodo(addDTO);
        res.status(200).json({ message: "Todo successfully added", todo });
    }
    catch (err) {
        console.error(`Adding Todo failed: ${err}`);
        next(err);
    }
});
const updateTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateDTO = {
            id: parseInt(id),
            completed: req.body.completed,
        };
        yield todos_service_1.todosService.updateTodo(updateDTO);
        res.status(200).json({ message: `Todo ${id} successfully updated` });
    }
    catch (err) {
        console.error(`Adding Todo failed: ${err}`);
        next(err);
    }
});
exports.todosController = {
    getTodos,
    addTodo,
    updateTodo,
};
