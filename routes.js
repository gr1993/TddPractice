const express = require('express');
const router = express.Router();
const productsController = require('./controller/product');

router.post('/', productsController.createProduct);
router.get('/', productsController.getProducts);
router.get('/:productId', productsController.getProductById);

module.exports = router;
