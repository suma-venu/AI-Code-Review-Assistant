

const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

app.post("/review", (req, res) => {

  console.log("Received Code:");
  console.log(req.body.code);

  res.send("Code received successfully!");

});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});