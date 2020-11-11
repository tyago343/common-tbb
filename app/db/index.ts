import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize({
  database: process.env.DATABASE_NAME,
  dialect: "postgres",
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  storage: ":memory:",
  models: [__dirname + "/models"],
});
