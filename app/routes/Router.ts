import express from "express";
import { UserController } from "../controllers/user.controller";
import { EntryController } from "../controllers/entry.controller";
import { ClientController } from "../controllers/client.controller";

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
      .route("/users")
      .get(this.userController.index)
      .post(this.userController.save);
    this.app
      .route("/users/:id")
      .get(this.userController.getOne)
      .put(this.userController.update)
      .delete(this.userController.delete);
    this.app
      .route("/entries")
      .get(this.entryController.index)
      .post(this.entryController.save);
    this.app
      .route("/entries/:id")
      .get(this.entryController.getOne)
      .put(this.entryController.update)
      .delete(this.entryController.delete);
    this.app
      .route("/clients")
      .get(this.clientController.index)
      .post(this.clientController.save);
    this.app
      .route("/clients/:id")
      .get(this.clientController.getOne)
      .put(this.clientController.update)
      .delete(this.clientController.delete);
  }
}
