const mongoose = require("mongoose");

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

module.exports = mongoose.model("User", UserSchema);
