import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  FirstName: String,
  LastName: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
});

export default new mongoose.model("User", UserSchema);
