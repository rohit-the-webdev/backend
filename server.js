const cors = require("cors");

app.use(
  cors({
    origin: "https://internship-tasks-tau.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());
