import User from "../models/user.js";

export const remove = async (req, res) => {
  const categories = req.user.categories;
  const newCategories = categories.filter(
    (category) => category._id != req.params.id
  );
  const user = await User.updateOne(
    { _id: req.user.id },
    { $set: { categories: newCategories } }
  );

  res.json({ user });
};

export const Create = async (req, res) => {
  const {label,icon}=req.body;
  const response = await User.updateOne(
    { _id: req.user.id },
    { $set: { categories: [...req.user.categories,{label,icon}] } }
  );
  res.json({ response });
};