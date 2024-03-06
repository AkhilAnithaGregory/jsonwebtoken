// index.js
const express = require("express");
const connectDB = require("./mongodb");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = 3000;

connectDB();
app.use(bodyParser.json());

app.post("/", (req, res) => {
  res.set({
    Header1: "Value1",
    Header2: ["Value2", "Value3"],
    Header3: "Value4",
  });

  // Send a response
  res.send("Hello, World!");
});

app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
