const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());  // 使用JSON中间件

// 连接到MongoDB数据库
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
