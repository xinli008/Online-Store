const { Product } = require("../models/product.model");
const { Category } =  require("../models/category.model");

module.exports.getAllProducts = (req, res) => {
    Product.find({})
        .then(products => res.json(products))
        .catch(err => res.json(err));
};

module.exports.getProduct = (req, res) => {
    Product.find({ _id: req.params.id })
        .then((product) => res.json(product))
        .catch((err) => res.json(err));
};

module.exports.getAllCategories = (req, res) => {
    Category.find({})
        .then(categories => res.json(categories))
        .catch(err => res.json(err));
};

module.exports.getProductsByCategory = (req, res) => {
    Product.find({ categories: req.params.id })
        .then((products) => res.json(products))
        .catch((err) => res.json(err));;
};
