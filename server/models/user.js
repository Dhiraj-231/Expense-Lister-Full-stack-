import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  FirstName: String,
  LastName: String,
  email: String,
  password: String,
  categories: [{ label: String, icon: String }],
  createdAt: { type: Date, default: Date.now },
});

export default new mongoose.model("User", UserSchema);
