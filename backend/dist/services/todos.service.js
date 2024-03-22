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
exports.todosService = void 0;
const todos_entity_1 = require("../entity/todos.entity");
const dataSource_1 = require("../dataSource");
const todosRepository = dataSource_1.source.getRepository(todos_entity_1.Todos);
const getTodos = (getDTO) => __awaiter(void 0, void 0, void 0, function* () {
    return yield todosRepository.findBy({
        identifier: getDTO.identifier,
    });
});
const addTodo = (addDTO) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = new todos_entity_1.Todos();
    todo.identifier = addDTO.identifier;
    todo.title = addDTO.title;
    return yield todosRepository.save(todo);
});
const updateTodo = (updateDTO) => __awaiter(void 0, void 0, void 0, function* () {
    yield todosRepository.save({
        id: updateDTO.id,
        completed: updateDTO.completed,
    });
});
exports.todosService = {
    getTodos,
    addTodo,
    updateTodo,
};
