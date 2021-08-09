import express, { NextFunction } from "express";
import compression from "compression";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import { Router } from "./routes/Router";
import path from "path";
import cookieParser from "cookie-parser";
import { Strategy as LocalStrategy } from "passport-local";
import cors from 'cors'
import { User } from "./models/user.model";
import flash from 'connect-flash'
import nocache from 'nocache'
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
    this.init();
    this.routeProvider = new Router(this.app, this.router);
    this.routeProvider.routes();
  }
  private config(): void {
    this.app.use(compression())
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(
      session({
        secret: "cat",
      })
    );
    this.app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(flash())
    this.app.use(nocache())
  }
  private init(): void {
    passport.use(
      "local",
      new LocalStrategy({
        passReqToCallback: true
      }, (req, username, password, done) => {
        User.findOne({
          where: {
            username: username,
          },
        })
          .then((user: any) => {
            if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
            }
            if (password !== user.password) {
              return done(null, false, { message: 'Incorrect password.' })
            }
            return done(null, user);
          })
          .catch((err: any) => {
            return done(err)
          })
      })
    );
    passport.serializeUser((user: any, done) => {
      return done(null, user);
    });

    passport.deserializeUser((id: any, done) => {
      User.findByPk(id).then((user) => {
        return done(null, user);
      }).catch(err => {
        return done(err, false)
      });
    });
    this.app.use(express.static(path.resolve("frontend/build/static/")));
    this.app.use(express.static(path.resolve("frontend/build/")));

    this.app.get("*", (req: express.Request, res: express.Response, next: NextFunction) => {
      res.setHeader('Last-Modified', (new Date()).toUTCString());
      res.set('Cache-Control', 'no-store')
      next();
    });
  }
}
export default new App().app;

