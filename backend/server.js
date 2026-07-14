

const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors());
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

app.get("/review", (req, res) => {
  res.send("AI Review API is working!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});