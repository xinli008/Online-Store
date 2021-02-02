const bcrypt = require("bcrypt");
const { Checkout } = require("../models/checkout.model");
const secret = process.env.SECRET_KEY;

module.exports.doCheckout = (req, res) => {
    let cc = req.body.payment.card;
    let billingAddress = req.body.payment.billingAddress;
    let paymentConfirmation = processPayment(cc, billingAddress);
    let products = req.body.products;
    
    if (paymentConfirmation == null || paymentConfirmation.length === 0) {
        return res.sendStatus(400); // Payment failed, payment still required.
    }

    startProductShipping(products);

    Checkout.create(req.body)
        .then((checkout) => {
            res.json({ msg: "success!", confirmation: paymentConfirmation });
        })
        .catch(err => {res.json(err)});
};  


const processPayment = (cc, address) => {
    // Process payment with 3rd party CC API ...
    return create_UUID();
};

const startProductShipping = (products) => {
    // Start process for shipping products ...
};

const create_UUID = () => {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

module.exports.createProduct = (request, response) => {    
    Product.create(request.body)
        .then(product => {        
            response.json(product)})
        .catch(error => response.json(error))
}

// module.exports.getAll = (req, res) => {
//   User.find({})
//     .then((users) => res.json(users))
//     .catch((err) => res.json(err));
// };

// module.exports.getUser = (req, res) => {
//   User.find({ _id: req.params.id })
//     .then((user) => res.json(user))
//     .catch((err) => res.json(err));
// };

// module.exports.register = (req, res) => {
//   User.create(req.body)
//     .then((user) => {
//       const userToken = jwt.sign(
//         {
//           id: user._id,
//         },
//         process.env.SECRET_KEY
//       );

//       res
//         .cookie("usertoken", userToken, secret, {
//           httpOnly: true,
//         })
//         .json({ msg: "success!", user: user });
//     })
//     .catch((err) => res.json(err));
// };

// module.exports.login = async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });

//   if (user === null) {
//     // email not found in users collection
//     return res.sendStatus(400);
//   } // if we made it this far, we found a user with this email address // let's compare the supplied password to the hashed password in the database

//   const correctPassword = await bcrypt.compare(
//     req.body.password,
//     user.password
//   );

//   if (!correctPassword) {
//     // password wasn't a match!
//     return res.sendStatus(400);
//   } // if we made it this far, the password was correct

//   const userToken = jwt.sign(
//     {
//       id: user._id,
//     },
//     process.env.SECRET_KEY
//   ); 
  
//   // note that the response object allows chained calls to cookie and json
//   res
//     .cookie("usertoken", userToken, secret, {
//       httpOnly: true,
//     })
//     .json({ msg: user._id });
// };

// module.exports.logout = (req, res) => {
//   res.clearCookie("usertoken");
//   res.sendStatus(200);
// };