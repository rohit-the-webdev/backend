const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",           // local dev
      "https://internship-tasks-tau.vercel.app/" // vercel
    ],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
