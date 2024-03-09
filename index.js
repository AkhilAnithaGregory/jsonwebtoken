const express = require("express");
const connectDB = require("./mongodb");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoute");
const productRoutes = require("./routes/productRoute");
const wishListRoutes = require("./routes/wishListRoute");
const CartRoutes = require("./routes/cartRoutes");

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
  res.send("Hello, World!");
});

app.use("/v1/api/users", userRoutes);
app.use("/v1/api/catgory", categoryRoutes);
app.use("/v1/api/product", productRoutes);
app.use("/v1/api/wishList", wishListRoutes);
app.use("/v1/api/cart", CartRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
