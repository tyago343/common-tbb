import express from "express";
import compression from "compression";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Routes } from "./routes/user.routes";
// initialize configuration
dotenv.config();

// Express configuration
class App {
  public app: express.Application;
  public routeProvider: Routes = new Routes();
  constructor() {
    this.app = express();
    this.config();
  }
  private config(): void {
    this.app.use(compression());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(
      session({
        secret: "perro",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
      })
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }
}
export default new App().app;
