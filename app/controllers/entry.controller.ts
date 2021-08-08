import { Request, Response } from "express";
import { DestroyOptions, UpdateOptions } from "sequelize/types";
import { Client } from "../models/client.model";
import { Entry } from "../models/entry.model";

export class EntryController {
  public async index(req: Request, res: Response): Promise<void> {
    try {
      const entries: Array<Entry> = await Entry.findAll({ include: [Client] });
      if (!entries) {
        res.status(400).json({ error: "No hay usuarios." });
      }
      res.status(200).json(entries);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "No pudo ejecutarse la consulta." });
    }
  }
  public async getOne(req: Request, res: Response): Promise<void> {
    const entryId: string = req.body.id;
    try {
      const entry = await Entry.findByPk(entryId);
      if (!entry) {
        res.status(400).json({ error: "Usuario no encontrado" });
      }
      res.status(200).json({ entry });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "La consulta no pudo realizarse" });
    }
  }
  public async save(req: Request, res: Response): Promise<void> {
    try {
      const entry: Entry = await Entry.create({ ...req.body });
      if (!entry) {
        res.status(400).json({ error: "No pudo ser creado" });
      }
      res.status(201).json({ entry });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "La consulta no pudo realizarse, intenta mas tarde" });
    }
  }
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const entryId: string = req.params.id;
      const options: DestroyOptions = {
        where: { id: entryId },
        limit: 1,
      };
      const entry = await Entry.destroy(options);
      if (!entry) {
        res.status(400).json({ error: "No se pudo eliminar" });
      }
      res.status(200).json({ entry });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "La consulta no pudo realizarse, intenta mas tarde" });
    }
  }
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const entryId: string = req.params.id;
      const params = req.body;
      const update: UpdateOptions = {
        where: { id: entryId },
        limit: 1,
        returning: true
      };
      const result = await Entry.update(params, update);
      if (!result) {
        res
          .status(400)
          .json({ error: "No pudo encontrarse o no se pudo actualizar" });
      }
      const data = result[1];
      res.status(202).json({ data });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "La consulta no pudo realizarse, intenta mas tarde" });
    }
  }
}
