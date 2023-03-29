import { Router } from "express";
import passport from "passport";
import * as trans from "../controller/transactionController.js"
const router = Router();

router.get('/',passport.authenticate("jwt",{session:false}),trans.index);

router.post("/", trans.create);

router.delete("/:id", trans.Remove);

router.patch("/:id",trans.update)

export default router;