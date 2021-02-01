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
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

module.exports.User = mongoose.model("User", UserSchema);