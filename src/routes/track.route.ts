import { trackController } from "@/controllers/index.ts";
import express from "express";

const router = express.Router();

router.get("/", trackController.getAll);
router.get("/:id", trackController.getById);

export default {
  subRouter: router,
};
