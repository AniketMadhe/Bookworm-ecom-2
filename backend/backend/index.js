<<<<<<< HEAD:backend/index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoute");
const dbConnect = require("./dbConnect/db");
const cookieParser = require("cookie-parser");
dotenv.config();
dbConnect();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://bookworm-ecom-app.onrender.com",
    credentials: true,
  })
);

app.use("/api", userRoutes);
app.use("/api", adminRoutes);

app.get("/", (req, res) => {
  res.send("Nci");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on Port: ${process.env.PORT}`);
});
=======
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoute");
const dbConnect = require("./dbConnect/db");
const cookieParser = require("cookie-parser");
dotenv.config();
dbConnect();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api", userRoutes);
app.use("/api", adminRoutes);

app.get("/", (req, res) => {
  res.send("Nci");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on Port: ${process.env.PORT}`);
});
>>>>>>> 368977f (index.js updated):index.js
