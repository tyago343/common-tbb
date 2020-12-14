import express from "express";
import compression from "compression";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Router } from "./routes/Router";
import path from "path";
import { Strategy as LocalStrategy } from "passport-local";
import bCrypt from "bcrypt";
import { User } from "./models/user.model";

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
    this.init();
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
  private init(): void {
    passport.use(
      "local",
      new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
        const isValidPassword = function (userpass: string, password: string) {
          return bCrypt.compareSync(password, userpass);
        };
        User.findOne({
          where: {
            email: email,
          },
        })
          .then(function (user: any) {
            if (!user) {
              return done(null, false, {
                message: "Email does not exist",
              });
            }
            if (!isValidPassword(user.password, password)) {
              return done(null, false, {
                message: "Incorrect password.",
              });
            }
            return done(null, user);
          })
          .catch(function (err: any) {
            console.log("Error:", err);
            return done(null, false, {
              message: "Something went wrong with your Signin",
            });
          });
        passport.serializeUser<any, any>((user, done) => {
          done(undefined, user.id);
        });

        passport.deserializeUser((id, done) => {
          User;
        });
      })
    );
    this.app.use(express.static(path.resolve("frontend/build/static/")));
    this.app.use(express.static(path.resolve("frontend/build/")));

    this.app.get("*", (req: express.Request, res: express.Response) => {
      res.sendFile(path.resolve("frontend/build/index.html"));
    });
  }
}
export default new App().app;
