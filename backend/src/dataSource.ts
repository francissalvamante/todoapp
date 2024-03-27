import { DataSource } from "typeorm";
import config from "./config";

export const source = new DataSource({
  type: "mysql",
  connectorPackage: "mysql2",
  host: config.host,
  port: config.mysqlPort,
  username: config.mysqlUsername,
  password: config.mysqlPassword,
  database: config.db,
  entities: ["src/entity/*.ts"],
  logging: true,
  synchronize: true,
});
