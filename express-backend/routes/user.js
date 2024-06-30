const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const apiConfig = require("../config/api");

//Log in or sign up
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });

    // 如果用户不存在则创建新用户
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      //生成token
      const token = jwt.sign({ username }, apiConfig.jwtKey);

      user = new User({
        username,
        password: hashedPassword,
        avatar:
          "https://i.pravatar.cc/150?img=2",
        bio: "这个人很懒，什么都没有留下",
        isPlus: false,
        totalScore: 0,
        totalTarget: 0,
        token,
      });
      await user.save();
    }
    // 如果用户存在则检查密码
    else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({
          message: 'Your code is error!'
        });
      }
      //更新token
      user.token = jwt.sign({ username }, "my_secret_key");
      await user.save();
    }

    res.status(200).json({
        token: user.token,
        id: user._id.toString(),
        name: user.username,
        avatar: user.avatar,
        bio: user.bio,
        isPlus: user.isPlus,
      });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
