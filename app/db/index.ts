import { Sequelize } from "sequelize-typescript";
export const sequelize = new Sequelize({
  database: "commonkey",
  dialect: "postgres",
  username: "santiago3",
  password: "123456",
  storage: ":memory:",
  models: [__dirname + "/models"],
});
