const express = require("express");
const connectDB = require("./mongodb");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoute");
const productRoutes = require("./routes/productRoute");
const wishListRoutes = require("./routes/wishListRoute");
const CartRoutes = require("./routes/cartRoutes");
const StockRoutes = require("./routes/stockRoutes");
const cloudinary = require("cloudinary").v2;

const app = express();
const port = 3002;

app.use(cors());
require("dotenv").config();

connectDB();
app.use(bodyParser.json());

cloudinary.config({
  cloud_name: "ddd6tq3qi",
  api_key: "228189726195228",
  api_secret: "KAxANxKnFDYSKdaWqwTBBpf5UaI",
});

app.post("/", (req, res) => {
  res.set({
    Header1: "Value1",
    Header2: ["Value2", "Value3"],
    Header3: "Value4",
  });
  res.send("Hello, World!");
});
app.use('/uploads', express.static('uploads'));
app.use("/v1/api/users", userRoutes);
app.use("/v1/api/catgory", categoryRoutes);
app.use("/v1/api/product", productRoutes);
app.use("/v1/api/wishList", wishListRoutes);
app.use("/v1/api/cart", CartRoutes);
app.use("/v1/api/stock", StockRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
