const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./route/userRoutes");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ hello: "hello" });
});
app.use("/api/user", userRoutes);
const PORT = process.env.PORT;
app.listen(PORT, console.log("Server started on port 5000".yellow.bold));
