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