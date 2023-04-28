const Order = require("./model");
const User = require("../users/model");
const jwt = require("jsonwebtoken");

const newOrder = async (req, res) => {
  try {
    if (!req.authUser) {
      return res.status(404).json({ message: "access denied" });
    }
    const order = await Order.create({ UserId: req.authUser.id });
    res.status(201).json({
      message: "success",
      order: {
        id: order.id,
      },
    });
  } catch (error) {
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};

const userOrders = async (req, res) => {
  try {
    if (!req.authUser) {
      return res.status(404).json({ message: "access denied" });
    }
    const orders = await Order.findAll({
      where: { UserId: req.authUser.id },
      
    });
    res.status(200).json({ message: "success", orders: orders });
  } catch (error) {
    res.status(501).json({ message: "Validation error", error });
  }
};


module.exports = {
  newOrder,
  userOrders,
};
