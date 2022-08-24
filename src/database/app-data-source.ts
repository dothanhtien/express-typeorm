import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const appDataSource = new DataSource({
  type: "mysql",
  host: process.env.DEV_DB_HOST,
  port: Number(process.env.DEV_DB_PORT),
  username: process.env.DEV_DB_USERNAME,
  password: process.env.DEV_DB_PASSWORD,
  database: process.env.DEV_DB_DATABASE,
  entities: ["src/database/entities/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  subscribers: ["src/database/subscribers/*.ts"],
  logging: true,
  synchronize: false,
});
