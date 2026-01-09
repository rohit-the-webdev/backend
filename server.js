const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 DB connection handled per request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    return res.status(500).json({ message: "Database connection failed" });
  }
});

app.use("/api", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
