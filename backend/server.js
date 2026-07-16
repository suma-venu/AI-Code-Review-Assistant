

const express = require("express");

const cors = require("cors");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();

app.use(cors());
app.use(express.json());
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

app.post("/review", (req, res) => {

 const code = req.body.code;

// Create a temporary JavaScript file
fs.writeFileSync("temp.js", code);
console.log("Running ESLint...");

exec("npx eslint temp.js", (error, stdout, stderr) => {

  console.log("Error:", error);
  console.log("STDOUT:", stdout);
  console.log("STDERR:", stderr);

  // If ESLint produced output, send it to React
  if (stdout) {
    res.send(stdout);
    return;
  }

  // If there is only stderr, send it
  if (stderr) {
    res.send(stderr);
    return;
  }

  // If nothing was found
  res.send("✅ No issues found!");

});

});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});