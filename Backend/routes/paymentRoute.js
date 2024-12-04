const { Router } = require("express");
const { Pay, getOrderDetails } = require("../controller/paymentController");
const PaymentRoute = Router()

PaymentRoute.post("/pay",Pay)
PaymentRoute.get("/order/:orderId", getOrderDetails);

module.exports = PaymentRoute