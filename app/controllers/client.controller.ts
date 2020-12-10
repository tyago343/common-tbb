import { Request, Response } from "express";
import { DestroyOptions, UpdateOptions } from "sequelize/types";
import { Client } from "../models/client.model";

export class ClientController {
  public async index(req: Request, res: Response): Promise<void> {
    try {
      const clients: Array<Client> = await Client.findAll();
      if (!clients) {
        res.status(400).json({ error: "No hay usuarios." });
      }
      res.status(200).json(clients);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "No pudo ejecutarse la consulta." });
    }
  }
  public async getOne(req: Request, res: Response): Promise<void> {
    const clientId: string = req.body.id;
    try {
      const client = await Client.findByPk(clientId);
      if (!client) {
        res.status(400).json({ error: "Usuario no encontrado" });
      }
      res.status(200).json({ client });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "La consulta no pudo realizarse" });
    }
  }
  public async save(req: Request, res: Response): Promise<void> {
    try {
      const client: Client = await Client.create({ ...req.body });
      if (!client) {
        res.status(400).json({ error: "No pudo ser creado" });
      }
      res.status(201).json({ client });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "La consulta no pudo realizarse, intenta mas tarde" });
    }
  }
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const clientId: string = req.params.id;
      const options: DestroyOptions = {
        where: { id: clientId },
        limit: 1,
      };
      const client = await Client.destroy(options);
      if (!client) {
        res.status(400).json({ error: "No se pudo eliminar" });
      }
      res.status(200).json({ client });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "La consulta no pudo realizarse, intenta mas tarde" });
    }
  }
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const clientId: string = req.params.id;
      const params = req.body;
      const update: UpdateOptions = {
        where: { id: clientId },
        limit: 1,
      };
      const result = await Client.update(params, update);
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
