const { Router } = require("express");
const { newOrder, userOrders } = require("./controllers");
const { tokenCheck } = require("../middleware");


const orderRouter = Router();

orderRouter.post("/orders/new", tokenCheck, newOrder);
orderRouter.get("/orders/getorders", tokenCheck, userOrders);

module.exports = orderRouter;