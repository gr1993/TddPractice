const express = require('express');
const mongoose = require('mongoose');

const PORT = 5000;

// 연결 시 존재하지 않을 경우 해당 스키마 생성
mongoose.connect('mongodb://localhost:27017/testdb', {
    useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDb Connected...'))
.catch(err => console.log(err));

const app = express();
const productRoutes = require('./routes');

app.use(express.json());
app.use("/api/product", productRoutes);

app.listen(PORT);
