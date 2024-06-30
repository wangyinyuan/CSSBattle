const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConfig = require('./config/db');


const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/', userRoute);  

// 连接到MongoDB数据库
mongoose.connect(dbConfig.server, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  app.listen(3000, () => {
    console.log('MongoDB connected!');
    console.log('Server is running on port 3000');
  });
})
.catch(err => {
  console.error('Failed to connect to MongoDB', err);
});


