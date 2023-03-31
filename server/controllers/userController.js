import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const categories = [
  { label: "Travel", icon: "user" },
  { label: "Shopping", icon: "user" },
  { label: "Investment", icon: "user" },
  { label: "Bills", icon: "user" },
];
export const register = async (req, res) => {
  const { FirstName, LastName, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const userExist = await User.findOne({ email });
  if (!userExist) {
    const user = new User({
      FirstName,
      LastName,
      email,
      password: hashPassword,
      categories
    });
    const data = await user.save();
    res.status(200).json({
      message: "success",
    });
  } else {
    res.status(409).json({
      message: "User already exist",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (!userExist) {
    res.status(406).json({
      message: "credentail not found",
    });
  }
  const match = await bcrypt.compare(password, userExist.password);
  if (!match) {
    res.status(406).json({
      message: "password is not matched",
    });
  }
  const payLoad = {
    username: email,
    _id: userExist._id,
  };
  const token = jwt.sign(payLoad, "Dhashu");
  res.status(202).json({
    message: "Successfully logged in",
    token,
    user: userExist,
  });
};
