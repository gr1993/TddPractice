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

//미들웨어
app.use(express.json());
app.use("/api/product", productRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

//미들웨어 동기상황에서 에러가 나면 이곳으로 바로 들어 오지만
//비동기 상황일 경우 next함수의 인자로 Error를 보내야 여기로옴
app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
})

app.listen(PORT);

module.exports = app;
