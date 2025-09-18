import "dotenv/config";
import express from "express";
import cors from "cors";

import mainRouter from "@/routes/index.ts";

import response from "@/middlewares/response.middleware.ts";
import handleError from "@/middlewares/handle-error.middleware.ts";
import sequelizeAuthenticate from "@/middlewares/sequelize-authenticate.middleware.ts";

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

app.use(response);
app.use("/api/v1", sequelizeAuthenticate, mainRouter);
app.use(handleError);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
