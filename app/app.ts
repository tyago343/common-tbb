import express from "express";
import compression from "compression";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Router } from "./routes/Router";
// initialize configuration
dotenv.config();

// Express configuration
class App {
  public app: express.Application;
  public router: express.Router;
  public routeProvider;
  constructor() {
    this.app = express();
    this.router = express.Router();
    this.config();
    this.routeProvider = new Router(this.app, this.router);
    this.routeProvider.routes();
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
