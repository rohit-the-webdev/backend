const express = require("express");
const router = express.Router();
const User = require("../models/User");
const connectDB = require("../db");

// POST /api/signup
router.post("/signup", async (req, res) => {
  console.log("req body ", req.body);

  try {
    await connectDB();

    const user = new User(req.body);
    await user.save();

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
});
// POST /api/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    await connectDB(); // 🔥 HERE

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password.trim()) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const { password: pwd, ...safeUser } = user._doc;

    res.status(200).json({
      message: "Login successful",
      user: safeUser,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Login failed" });
  }
});


// PUT /api/user/update
router.put("/user/update", async (req, res) => {
  const { email, Uname, age, phoneNo, address, pincode } = req.body;

  try {
    await connectDB();

    const updatedUser = await User.findOneAndUpdate(
      { email }, // find user
      {
        Uname,
        age,
        phoneNo,
        address,
        pincode,
      },
      { new: true } // return updated document
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Profile update failed",
    });
  }
});
// PUT /api/user/change-password
router.put("/user/change-password", async (req, res) => {
  const { email, newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({
      message: "New password is required",
    });
  }

  try {
    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Password update failed",
    });
  }
});

module.exports = router;
