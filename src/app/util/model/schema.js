import mongoose from "mongoose";

const registerdata = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  password: String,
});

export const RegisterData =
  mongoose.models.UserData || mongoose.model("UserData", registerdata);
