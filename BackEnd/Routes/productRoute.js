const express = require('express');
const router = express.Router();
const product = require('../Controllers/productController');

router.route("/Products").get(product.getAllProducts);

module.exports = router;