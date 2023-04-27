const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

const Order = connection.define(
  "Order",
  {
    // Other fields in your Order model
    orderDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    orderNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    }
  },
  {
    hooks: {
      beforeCreate: async (order) => {
        const lastOrder = await Order.findOne({
          order: [["orderNumber", "DESC"]]
        });
        const newOrderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;
        order.orderNumber = newOrderNumber;
      }
    }
  }
);

module.exports = Order;