export const getOne = (Model) => async (req: Request, res: Response) => {
  const id: string = req.body.id;
  try {
    const result = await Model.findById(id);
    if (!result) {
      res.status(400).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "La consulta no pudo realizarse" });
  }
};
export const getMany = (Model) => async (req: Request, res: Response) => {
  try {
    const result = await Model.find({}).lean().exec();
    if (!result) {
      res.status(400).json({ error: "No hay nada aqui" });
    }
    res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ error: "La consulta no pudo realizarse, intenta mas tarde" });
  }
};
export const createOne = (Model) => async (req, res) => {
  const createdBy = 1;
  try {
    const result = await Model.create({ ...req.body, createdBy });
    if (!result) {
      res.status(400).json({ error: "No pudo ser creado" });
    }
    res.status(201).json({ result });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ error: "La consulta no pudo realizarse, intenta mas tarde" });
  }
};
export const updateOne = (Model) => async (req, res) => {
  try {
    const result = await Model.findOneAndUpdate(
      {
        createdBy: req.user._id,
        _id: req.params.id,
      },
      req.body,
      { new: true }
    )
      .lean()
      .exec();
    if (!result) {
      res
        .status(400)
        .json({ error: "No pudo encontrarse o no se pudo actualizar" });
    }
    res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ error: "La consulta no pudo realizarse, intenta mas tarde" });
  }
};
export const removeOne = (Model) => async (req, res) => {
  try {
    const result = await Model.findOneAndremove({
      createdBy: req.user._id,
      _id: req.params.id,
    });
    if (!result) {
      res.status(400).json({ error: "No se pudo eliminar" });
    }
    res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ error: "La consulta no pudo realizarse, intenta mas tarde" });
  }
};

export const crudControllers = (model) => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
});
