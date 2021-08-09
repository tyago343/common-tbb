import express, { NextFunction, Request, Response } from "express";
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
  public authenticated(req: Request, res: Response, next: NextFunction): void {
    next();
  }
  public routes(): void {
    this.app
      .route("/login")
      .post(passport.authenticate('local'), (req, res) => {
        if (req.user) {
          return res.send({
            user: req.user
          })
        }
        return res.status(404).send({ message: "user not found" })
      });
    this.app
      .route("/users")
      .get(this.authenticated, this.userController.index)
      .post(this.authenticated, this.userController.save);
    this.app
      .route("/users/:id")
      .get(this.authenticated, this.userController.getOne)
      .put(this.authenticated, this.userController.update)
      .delete(this.authenticated, this.userController.delete);
    this.app
      .route("/entries")
      .get(this.authenticated, this.entryController.index)
      .post(this.authenticated, this.entryController.save);
    this.app
      .route("/entries/:id")
      .get(this.authenticated, this.entryController.getOne)
      .put(this.authenticated, this.entryController.update)
      .delete(this.authenticated, this.entryController.delete);
    this.app
      .route("/clients")
      .get(this.authenticated, this.clientController.index)
      .post(this.authenticated, this.clientController.save);
    this.app
      .route("/clients/:id")
      .get(this.authenticated, this.clientController.getOne)
      .put(this.authenticated, this.clientController.update)
      .delete(this.authenticated, this.clientController.delete);
  }
}
