const express = require('express');
const router = express.Router();
const productsController = require('./controller/product');

router.post('/', productsController.createProduct);

module.exports = router;
