require("dotenv").config();
const express = require("express");

const cors = require("cors");

const port = process.env.PORT || 5001;

const userRouter = require("./users/routes");
const User = require("./users/model");

const Order = require("./orders/model");
const orderRouter = require("./orders/routes");

const app = express();
app.use(cors());

app.use(express.json());

const syncTables = () => {
  User.hasMany(Order);
  Order.belongsTo(User);
  //force:true to update tables
  User.sync();
  Order.sync();
};

app.use(userRouter);
app.use(orderRouter);

app.get("/health", (req, res) => {
  res.status(200).json({ message: "api is working" });
});

app.listen(port, () => {
  syncTables();
  console.log(`Server is running on port ${port}`);
});
