import { Router } from "express";
import { remove ,Create} from "../controllers/categoryController.js";
const router = Router();
router.delete("/:id", remove);
router.post("/",Create);

export default router;
