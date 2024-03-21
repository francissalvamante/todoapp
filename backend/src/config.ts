import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT,
  host: process.env.MYSQL_HOST,
  mysqlPort: parseInt(process.env.MYSQL_PORT!),
  mysqlUsername: process.env.MYSQL_USERNAME,
  mysqlPassword: process.env.MYSQL_PASSWORD,
  db: process.env.MYSQL_DATABASE,
};

export default config;
