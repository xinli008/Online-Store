const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"]
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be 15 characters or longer"]
    },
    rating: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, "Price is required."]
    },
    discount: {
        type: Number,
        default: 0
    },
    categories: [String],
    photos: [{
      path: String,
      main: Boolean,
      display: Boolean
    }]
  },
  { timestamps: true}
);

module.exports.Product = mongoose.model("Product", ProductSchema);