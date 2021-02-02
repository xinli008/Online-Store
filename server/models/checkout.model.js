const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const CheckoutSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please submit a valid email"
      }
    },
    products: [String],
    payment: {
        amount: {
            type: Number,
            required: [true, "Amount to be charged is required"]
        },
        card: {
            type: String,
            nameOnCard: {
                type: String,
                required: [true, "Name on card is required."],
                minlength: [3, "Name on card must be 3 characters or longer"],
                maxlength: [25, "Name on card must be shorter than 25 characters"]
            },
            cardNumber: {
                type: String,
                required: [true, "Card number is required"],
                minlength: [16, "Card number must be 15 or 16 characters"],
                maxlength: [16, "Card number must be 16 characters"]
            },
            expiration: {
                type: String,
                required: [true, "Expiration date is required"],
                validate: {
                  validator: val => /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(val),
                  message: "Expiration must come in format MM/YY or MM/YYYY"
                }
            },
            cvv: {
                type: Number,
                required: [true, "CVV is required"],
                minlength: [3, "CVV must be 3 or 4 characters in length"],
                maxlength: [4, "CVV must be at most 4 characters in length"]
            }
        },
        billingAddress : {
            streetAddress: {
                type: String,
                required: [true, "Address is required."],
                minlength: [15, "Address must be 15 characters or longer"],
                maxlength: [200, "Address must be shorter than 100 characters"]
            },
            city: {
                type: String,
                required: [true, "City is required."],
                minlength: [3, "City must be 3 characters or longer"],
                maxlength: [20, "City must be shorter than 100 characters"]
            },
            state: {
                type: String,
                required: [true, "State is required."],
                minlength: [2, "State must 2 characters in legth"]
            },
            zip: {
                type: String,
                required: [true, "Zip is required."],
                minlength: [5, "Zip must 2 numbers in legth"]
            }
        }
    },
    shippingAddress: {
          streetAddress: {
            type: String,
            required: [true, "Address is required."],
            minlength: [15, "Address must be 15 characters or longer"],
            maxlength: [200, "Address must be shorter than 100 characters"]
          },
          city: {
            type: String,
            required: [true, "City is required."],
            minlength: [3, "City must be 3 characters or longer"],
            maxlength: [20, "City must be shorter than 100 characters"]
          },
          state: {
            type: String,
            required: [true, "State is required."],
            minlength: [2, "State must 2 characters in legth"]
          },
          zip: {
            type: String,
            required: [true, "Zip is required."],
            minlength: [5, "Zip must 2 numbers in legth"]
          }
    }
  },
  { timestamps: true }
);

CheckoutSchema.pre("save", function (next) {
  bcrypt.hash(this.payment.card.cardNumber, 10).then((hash) => {
    this.payment.card.cardNumber = hash;
    next();
  });
});

module.exports.Checkout = mongoose.model("Checkout", CheckoutSchema);
