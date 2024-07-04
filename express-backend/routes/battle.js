const express = require("express");
const { tokenHandler } = require("./middlewares/tokenHandler");
const { errorHandler } = require("./middlewares/errorHandler");
const { getAllBattlesSorted, getBattleById, getScores } = require("../services/battle");
const multer = require("multer");
const fs = require("fs");
const { getUserByName } = require("../services/user");
const axios = require("axios");
const { logger } = require("../logger");
const FormData = require("form-data");
const { updateUserBattle } = require("../services/user");

const upload = multer({ dest: "../uploads/" });

const monthNames = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const router = express.Router();

router.get(
  "/",
  async (req, res, next) => {
    let battles = await getAllBattlesSorted();
    // 把 date 拆成 month 和 day 两个字段
    battles = battles.map((battle) => {
      const date = new Date(battle.date);
      return {
        id: battle._id,
        averageAccuracy: battle.averageAccuracy,
        averageScore: battle.averageScore,
        month: monthNames[date.getMonth()],
        day: date.getDate().toString().padStart(2, "0"),
        image: battle.image,
        imageColors: battle.imageColors,
      };
    });
    res.send({
      code: 200,
      message: "Success",
      data: battles,
    });
    next();
  },
  errorHandler
);

router.post(
  "/upload",
  tokenHandler,
  upload.single("image"),
  async (req, res, next) => {
    if (!req.file) {
      res
        .status(400)
        .json({ code: 400, message: "No file uploaded", data: null });
    }

    const filePath = req.file.path;
    const fileStream = fs.createReadStream(filePath);

    const battleId = req.body.id;
    const userName = req.user.username;
    const battle = await getBattleById(battleId);
    const user = await getUserByName(userName);
    const url = battle.image;

    const formData = new FormData();
    formData.append("file", fileStream, req.file.originalname);
    formData.append("url", url);

    const response = await axios.post(
      "http://127.0.0.1:5000/similarity",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      }
    );

    const similarity = response.data.similarity;
    const code = req.body.code;

    const score = getScores(similarity, code);

    // 更新用户的战斗数据
    await updateUserBattle(userName, battleId, code, similarity, score);

    fs.unlinkSync(filePath);
    res.status(200).send({
      code: 200,
      message: "Success",
      data: {
        similarity,
        score,
      },
    });
    next();
  },
  errorHandler
);

module.exports = router;
