import dotenv from "dotenv";
import { Sequelize } from "sequelize";

// initialize configuration
dotenv.config();
export const sequelize = new Sequelize(
  process.env.DATABASE_NAME || "",
  process.env.DATABASE_USER || "",
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres",
  }
);
