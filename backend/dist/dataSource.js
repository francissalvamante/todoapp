"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.source = void 0;
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("./config"));
exports.source = new typeorm_1.DataSource({
    type: "mysql",
    connectorPackage: "mysql2",
    host: config_1.default.host,
    port: config_1.default.mysqlPort,
    username: config_1.default.mysqlUsername,
    password: config_1.default.mysqlPassword,
    database: config_1.default.db,
    entities: ["dist/entity/*.js"],
    migrations: ["dist/migrations/*.js"],
    logging: true,
    synchronize: true,
});
