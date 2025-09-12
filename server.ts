require("dotenv").config();
require("module-alias/register");

const express = require("express");
const cors = require("cors");

const mainRouter = require("@/routes");

const response = require("@/middlewares/response.middleware");
const handleError = require("@/middlewares/handle-error.middleware");
const sequelizeAuthenticate = require("@/middlewares/sequelize-authenticate.middleware");

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
