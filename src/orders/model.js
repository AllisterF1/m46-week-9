const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

const Order = connection.define(
  "Order",
  {
  }
);

module.exports = Order;