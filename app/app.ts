import express from "express";
import { Sequelize } from "sequelize-typescript";
import compression from "compression";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// initialize configuration
dotenv.config();
const app: express.Application = express();
export const sequelize = new Sequelize({
  database: process.env.DATABASE_NAME,
  dialect: "postgres",
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  storage: ":memory:",
  models: [__dirname + "/models"],
});

// Express configuration
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "perro",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

export default app;
