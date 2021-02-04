const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"]
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email"
      }
    },
    address: {
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
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      /*validate: {
        validator: val =>
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/.test(val),
        message:
          "Password rule: at least 8 characters, at least 1 numeric character, at least 1 lowercase letter, at least 1 uppercase letter and at least 1 special character"
      }*/
    },
    payment: {
      card: {
        nameOnCard: {
            type: String,
            minlength: [3, "Name on card must be 3 characters or longer"],
            maxlength: [25, "Name on card must be shorter than 25 characters"]
        },
        cardNumber: {
            type: String, 
            set: encrypt,
            minlength: [16, "Card number must be 15 or 16 characters"],
            maxlength: [16, "Card number must be 16 characters"]
        },
        expiration: {
            type: String,
            validate: {
                validator: val => /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(val),
                message: "Expiration must come in format MM/YY or MM/YYYY"
            }
        },
        cvv: {
            type: Number,
            minlength: [3, "CVV must be 3 or 4 characters in length"],
            maxlength: [4, "CVV must be at most 4 characters in length"]
        }
      },
      billingAddress : {
        streetAddress: {
            type: String,
            minlength: [15, "Address must be 15 characters or longer"],
            maxlength: [200, "Address must be shorter than 100 characters"]
        },
        city: {
            type: String,
            minlength: [3, "City must be 3 characters or longer"],
            maxlength: [20, "City must be shorter than 100 characters"]
        },
        state: {
            type: String,
            minlength: [2, "State must 2 characters in legth"]
        },
        zip: {
            type: String,
            minlength: [5, "Zip must 2 numbers in legth"]
        }
      }
    } 
  },
  { timestamps: true }
);

UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Password must match confirm password");
  }
  next();
});

UserSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
      next();
    });
});

function encrypt(text) {
  bcrypt.hash(text, 10).then((hashedData) => {
    return hashedData;
  });
}

module.exports.User = mongoose.model("User", UserSchema);