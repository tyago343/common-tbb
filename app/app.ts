import express, { NextFunction } from "express";
import compression from "compression";
import session from "express-session";
import dotenv from "dotenv";
import { Router } from "./routes/Router";
import path from "path";
import cookieParser from "cookie-parser";
import cors from 'cors'
import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
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
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(
      session({
        secret: "cat",
      })
    );
    this.app.use(passport.initialize())
    this.app.use(passport.session())
    this.app.use(cookieParser());
    this.app.use(cors({ origin: "http://localhost:8080" }))
  }
  private init(): void {

    this.app.use(express.static(path.resolve("frontend/build/static/")));
    this.app.use(express.static(path.resolve("frontend/build/")));

  
    passport.use(new GoogleStrategy({
      clientID: "819237612844-llael83kjl4banjcaoudjc3vadfokgcd.apps.googleusercontent.com",
      clientSecret: "3cg6nfNvF7L9WOJhg_u7XY1r",
      callbackURL: "http://localhost:8080/auth/google/cb",
      proxy: true
    },
      function (accessToken, refreshToken, profile, done) {
        User.findOrCreate({ where: { googleId: profile.id }, defaults: { email: profile.emails[0].value, name: profile.displayName } })
          .then(user => done(null, user))
          .catch(err => done(err, false))
      }))
    passport.serializeUser((user: any, done) => {
      done(null, user);
    });
    passport.deserializeUser((user: any, done) => {
      User.findByPk(user.id).then(user => {
        done(null, user);
      });
    });
    this.app.get("*", (req: express.Request, res: express.Response, next: NextFunction) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
      );
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
      res.sendFile('index.html', {root: path.join(__dirname, '..', 'dist')});
      res.end();
    });
  }
}
export default new App().app;

