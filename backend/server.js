import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
import path from "path";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// image router for uploads
app.use("/api/uploads", uploadRouter);

// server request for users mongodb
app.use("/api/users", userRouter);
// server request for products mongodb
app.use("/api/products", productRouter);

// server request for createdOrders
app.use("/api/orders", orderRouter);

// PayPal api 1
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

// google map
app.get("/api/config/google", (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || "");
});

// error catcher for userRouter
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// unpublished (heroku)
// app.get("/", (req, res) => {
//   res.send("Server is ready");
// });

// uploadrouter path
const __dirname = path.resolve();

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// publishing to heroku
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
