const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
{
    name: {
      type: String,
      required: [true, "Category name is required"]
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be 15 characters or longer"]
    }
},
{ timestamps: true }
);

module.exports.Category = mongoose.model("Category", CategorySchema);