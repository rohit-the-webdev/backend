import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    Uname: String,
    age: Number,
    email: { type: String, unique: true },
    phoneNo: String,
    address: String,
    pincode: String,
    password: String,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
