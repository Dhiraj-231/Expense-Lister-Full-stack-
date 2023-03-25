import { Router } from "express";
import User from "../models/user.js";

const router = Router();

router.post("/register",async (req, res) => {
  const { FirstName, LastName, email, password } = req.body;
  const user = new User({
    FirstName,
    LastName,
    email,
    password,
  });
  const data= await user.save();
  res.status(200).json({
    message: "success",
  });
});

export default router;
