"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    port: process.env.PORT,
    host: process.env.MYSQL_HOST,
    mysqlPort: parseInt(process.env.MYSQL_PORT),
    mysqlUsername: process.env.MYSQL_USERNAME,
    mysqlPassword: process.env.MYSQL_PASSWORD,
    db: process.env.MYSQL_DATABASE,
};
exports.default = config;
