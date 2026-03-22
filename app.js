const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./users/user.router");
const productRouter = require("./products/product.routes");
const categroyRouter = require("./category/category.routes");
const authrouter = require("./users/auth.router");
const cartRouter = require("./products/cart/cart.route");
const orderRouter = require("./orders/order.route");
const successMail = require("./node-mailer/routes");
const contactRouter = require("./contact/contact.router");

dotenv.config();
app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("DB connected successfully");
  } catch (err) {
    console.error("Failed to connect to database:", err.message);
    process.exit(1);
  }
};

connectDB();

app.get("/", (req, res) => {
  res.send("created");
});

app.use("/admin/users", userRouter);
app.use("/admin/products", productRouter);
app.use("/admin/category", categroyRouter);
app.use("/cart", cartRouter);
app.use("/auth", authrouter);
app.use("/admin/order", orderRouter);
app.use("/ordersuccessmail", successMail);
app.use("/contact", contactRouter);

//image upload

app.use("/uploads", express.static("uploads"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
