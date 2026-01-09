const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = 5000;

connectDB();

app.use(cors());
app.use(express.json()); // 🔥 MUST be here

app.use("/api", require("./routes/authRoutes"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
