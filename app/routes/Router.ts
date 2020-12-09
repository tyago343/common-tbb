import { UserController } from "../controllers/user.controller";

export class Router {
  public userController: UserController = new UserController();

  public routes(app): void {
    app
      .route("/users")
      .get(this.userController.index)
      .post(this.userController.save);
    app.route("/users/:id").put(this.userController.update);
  }
}
