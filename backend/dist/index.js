"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dataSource_1 = require("./dataSource");
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const PORT = 3030;
/**
 * Initialize DataSource
 */
dataSource_1.source
    .initialize()
    .then(() => {
    console.log("Data source has been initialized");
})
    .catch((err) => {
    console.error(`Error during Data Source init: ${err}`);
});
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use((0, cors_1.default)());
app.use("/api", routes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
