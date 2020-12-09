import express from "express";
import { UserController } from "../controllers/user.controller";

export class Router {
  public userController: UserController = new UserController();
  public app;
  public router;
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
  }
}
