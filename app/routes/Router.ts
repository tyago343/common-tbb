import express from "express";
import { UserController } from "../controllers/user.controller";
import { EntryController } from "../controllers/entry.controller";
import { ClientController } from "../controllers/client.controller";
import passport from "passport";

export class Router {
  public userController: UserController = new UserController();
  public entryController: EntryController = new EntryController();
  public clientController: ClientController = new ClientController();
  public app: express.Application;
  public router: express.Router;
  constructor(app: express.Application, router: express.Router) {
    this.app = app;
    this.router = router;
  }

  public routes(): void {
    this.app
      .route("/authenticate")
      .post( function (req, res, next) {
        passport.authenticate("local", function (err, user, info) {
          console.log(err, user, info)
          if (err) {
            return next(err);
          }
          if (!user) {
            return res.send("/login");
          }
          req.logIn(user, function (err) {
            if (err) {
              return next(err);
            }
            return res.redirect("/users/" + user.username);
          });
        })(req, res, next);
      });
    this.app
      .route("/users")
      .get(passport.authenticate("local"), this.userController.index)
      .post(passport.authenticate("local"), this.userController.save);
    this.app
      .route("/users/:id")
      .get(passport.authenticate("local"), this.userController.getOne)
      .put(passport.authenticate("local"), this.userController.update)
      .delete(passport.authenticate("local"), this.userController.delete);
    this.app
      .route("/entries")
      .get(passport.authenticate("local"), this.entryController.index)
      .post(passport.authenticate("local"), this.entryController.save);
    this.app
      .route("/entries/:id")
      .get(passport.authenticate("local"), this.entryController.getOne)
      .put(passport.authenticate("local"), this.entryController.update)
      .delete(passport.authenticate("local"), this.entryController.delete);
    this.app
      .route("/clients")
      .get(passport.authenticate("local"), this.clientController.index)
      .post(passport.authenticate("local"), this.clientController.save);
    this.app
      .route("/clients/:id")
      .get(passport.authenticate("local"), this.clientController.getOne)
      .put(passport.authenticate("local"), this.clientController.update)
      .delete(passport.authenticate("local"), this.clientController.delete);
  }
}
