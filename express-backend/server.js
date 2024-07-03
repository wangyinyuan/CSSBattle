const { loadLogConfig, apiLogger, dbLogger } = require("./logger");
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConfig = require("./config/db");
const log4js = require("log4js");
const { writeBattlesToMongo } = require("./crawler/main");
const battleRoute = require("./routes/battle");

const app = express();

// 加载日志配置
loadLogConfig();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(log4js.connectLogger(apiLogger, { level: "auto" }));
app.use("/user", userRoute);
app.use("/battle", battleRoute);

// 连接到MongoDB数据库
mongoose
  .connect(dbConfig.server, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000, () => {
      console.log("MongoDB connected!");
      console.log("Server is running on port 3000");
      dbLogger.info("MongoDB connected!");
      // writeBattlesToMongo();
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
