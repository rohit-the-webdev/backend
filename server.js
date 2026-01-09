const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db");

const app = express();

// ✅ REQUIRED middleware
app.use(cors());
app.use(express.json());

// connect DB
connectDB();

// routes
app.use("/api", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;

// ✅ VERY IMPORTANT for Vercel
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
