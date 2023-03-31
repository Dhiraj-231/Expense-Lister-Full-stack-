import { Router } from "express";
import passport from "passport";
import Auth from "./Auth.js";
import TransactionRouter from "./Transaction.js";
import UserRouter from "./User.js";
import CategoryApi from "./CategoryApi.js"
const router = Router();

router.use("/User", UserRouter);
router.use("/Auth", Auth);
router.use("/category",passport.authenticate("jwt",{session:false}), CategoryApi);
router.use("/transaction",passport.authenticate("jwt",{session:false}), TransactionRouter);

export default router;
