import { Router } from "express";
import * as trans from "../controllers/transactionController.js"
const router = Router();

router.get('/',trans.index);

router.post("/", trans.create);

router.delete("/:id", trans.Remove);

router.patch("/:id",trans.update)

export default router;