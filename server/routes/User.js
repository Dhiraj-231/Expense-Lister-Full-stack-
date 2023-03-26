import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const router = Router();

router.post("/register", async (req, res) => {
  const { FirstName, LastName, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const userExist = await User.findOne({ email });
  if (!userExist) {
    const user = new User({
      FirstName,
      LastName,
      email,
      password: hashPassword,
    });
    const data = await user.save();
    res.status(200).json({
      message: "success",
    });
  } else {
    res.status(409).json({
      message: "User already exist",
    })
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });
  console.log(userExist)
  if (!userExist) {
    res.status(406).json({
      message: "credentail not found",
    });
    console.log("From not");
  }
  const match = await bcrypt.compare(password, userExist.password)
  console.log(match);
  if (!match) {
    res.status(406).json({
      message: "password is not matched",
    });
  }
  const payLoad = {
    username: email,
    _id: userExist._id,
  }
  const token = await jwt.sign(payLoad, "Love you anshu")
  res.status(202).json({
    message: "Successfully logged in",
    token
  })
});

export default router;
