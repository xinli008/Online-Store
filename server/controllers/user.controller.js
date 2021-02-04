const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/user.model");
const secret = process.env.SECRET_KEY;

module.exports.getAll = (req, res) => {
  User.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

module.exports.getUser = (req, res) => {
  User.find({ _id: req.params.id })
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
};

module.exports.register = (req, res) => {
  User.create(req.body)
    .then(user => {
      const userToken = jwt.sign(
        {
          id: user._id
        },
        process.env.SECRET_KEY
      );

      res
        .cookie("usertoken", userToken, secret, {
          httpOnly: true
        })
        .json({ msg: "success!", user: user });
    })
    .catch(err => res.status(400).json(err));
};

module.exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user === null) {
    // email not found in users collection
    return res.status(400).json({ msg: "Invalid login attempt!" });
  } // if we made it this far, we found a user with this email address // let's compare the supplied password to the hashed password in the database

  const correctPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!correctPassword) {
    // password wasn't a match!
    return res.status(400).json({ msg: "Invalid login attempt!" }); 
  } // if we made it this far, the password was correct

  const userToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.SECRET_KEY
  ); 
  
  // note that the response object allows chained calls to cookie and json
  res
    .cookie("usertoken", userToken, secret, {
      httpOnly: true
    })
    .json({
      msg: "success!",
      loggedInUser: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        city: user.city,
        state: user.state,
        zip: user.zip,
        email: user.email
      }
    });
};

module.exports.logout = (req, res) => {
  res.clearCookie("usertoken");
  res.sendStatus(200);
};