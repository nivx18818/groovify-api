import "dotenv/config";
import express from "express";
import cors from "cors";

import mainRouter from "@/routes/index";

import response from "@/middlewares/response.middleware";
import handleError from "@/middlewares/handle-error.middleware";
import sequelizeAuthenticate from "@/middlewares/sequelize-authenticate.middleware";

const app = express();
const port = 3001;

app.use(
  cors({
    origin: process.env.APP_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/v1", sequelizeAuthenticate, mainRouter);
app.use(handleError);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
