const CheckoutController = require("../controllers/checkout.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = function (app) {
    app.post("/api/checkout", CheckoutController.doCheckout);
};
