import { Request, Response } from "express";
import { DestroyOptions, UpdateOptions } from "sequelize/types";
import { User } from "../models/user.model";

export class UserController {
  public async index(req: Request, res: Response): Promise<void> {
    try {
      const users: Array<User> = await User.findAll();
      if (!users) {
        res.status(400).json({ error: "No hay usuarios." });
      }
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "No pudo ejecutarse la consulta." });
    }
  }
  public async getOne(req: Request, res: Response): Promise<void> {
    const id: string = req.body.id;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        res.status(400).json({ error: "Usuario no encontrado" });
      }
      res.status(200).json({ user });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "La consulta no pudo realizarse" });
    }
  }
  public async save(req: Request, res: Response): Promise<void> {
    try {
      const user: User = await User.create({ ...req.body });
      if (!user) {
        res.status(400).json({ error: "No pudo ser creado" });
      }
      res.status(201).json({ user });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "La consulta no pudo realizarse, intenta mas tarde" });
    }
  }
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const nodeId: string = req.params.id;
      const options: DestroyOptions = {
        where: { id: nodeId },
        limit: 1,
      };
      const user = await User.destroy(options);
      if (!user) {
        res.status(400).json({ error: "No se pudo eliminar" });
      }
      res.status(200).json({ user });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "La consulta no pudo realizarse, intenta mas tarde" });
    }
  }
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const nodeId: string = req.params.id;
      const params = req.body;
      const update: UpdateOptions = {
        where: { id: nodeId },
        limit: 1,
      };
      const result = await User.update(params, update);
      if (!result) {
        res
          .status(400)
          .json({ error: "No pudo encontrarse o no se pudo actualizar" });
      }
      res.status(202).json({ result });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "La consulta no pudo realizarse, intenta mas tarde" });
    }
  }
}
