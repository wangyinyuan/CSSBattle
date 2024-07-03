const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const apiConfig = require("../config/api");
const { dbLogger } = require("../logger");

const expiresIn = '30d';
//Log in or sign up
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    // 如果用户不存在则创建新用户
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);

      user = new User({
        username,
        password: hashedPassword,
        isPlus: false,
      });

      await user.save();
      dbLogger.debug("New user created:", user.username)
    }
    // 如果用户存在则检查密码
    else {
      console.log("用户已存在：", user)
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          code: 401,
          message: 'Your code is error!',
          data: null,
        });
      }
    }

    // 生成token
    const token = jwt.sign({ username }, apiConfig.jwtKey, {
      expiresIn,
    });

    res.status(200).json({
        token: token,
        id: user._id.toString(),
        name: user.username,
        avatar: user.avatar,
        bio: user.bio,
        isPlus: user.isPlus,
      });
  } catch (error) {
    dbLogger.error("An error occurred:", error);
    console.error("An error occurred:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
