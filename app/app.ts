import express from "express";
import { sequelize } from "./db";
import bodyParser from "body-parser";
const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Expose-Headers", "x-total-count");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type,authorization");

  next();
});

app.listen(port, async () => {
  await sequelize
    .sync({ force: true })
    .then(() => {
      console.log(`Server listening on port: ${port}`);
    })
    .catch((err: unknown) => {
      console.log(err);
    });
});
