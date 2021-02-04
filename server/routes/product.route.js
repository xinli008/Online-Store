const ProductController = require("../controllers/product.controller");

module.exports = function (app) {
    app.get("/api/product", ProductController.getAllProducts);
    app.get("/api/product/:id", ProductController.getProduct);
    app.get("/api/product/category/:id", ProductController.getProductsByCategory);
    app.get("/api/category", ProductController.getAllCategories);
};
