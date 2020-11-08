import { Sequelize } from "sequelize-typescript";
export const sequelize = new Sequelize("commonkey", "santiago3", "123456", {
  host: "localhost",
  dialect: "postgres",
  models: [__dirname + "/models"],
});
