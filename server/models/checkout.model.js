const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const CheckoutSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "User ID is required for this transaction"]
    },
    totalAmount: {
      type: Number,
      required: [true, "Transaction amount is required"]
    },
    shippingAmount: {
      type: Number,
      default: 0
    },
    coupons: [String],
    products: [String],
  },
  { timestamps: true }
);

module.exports.Checkout = mongoose.model("Checkout", CheckoutSchema);
