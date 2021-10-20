const express = require('express');

const PORT = 5000;

const app = express();
const productRoutes = require('./routes');

app.use("/api/products", productRoutes);

app.listen(PORT);
