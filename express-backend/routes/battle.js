const express = require('express');
const { tokenHandler } = require('./middlewares/tokenHandler');
const { errorHandler } = require('./middlewares/errorHandler');
const { getAllBattlesSorted } = require('../services/battle');

const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
 
const router = express.Router();

router.get('/', async (req, res, next) => {
  let battles = await getAllBattlesSorted();
  // 把 date 拆成 month 和 day 两个字段
  battles = battles.map(battle => {
    const date = new Date(battle.date);
    console.log('battle:', battle);
    return {
      id: battle._id,
      averageAccuracy: battle.averageAccuracy,
      averageScore: battle.averageScore,
      month: monthNames[date.getMonth()],
      day: date.getDate(),
      image: battle.image,
      imageColors: battle.imageColors,
    }
  })
  res.send({
    code: 200,
    message: 'Success',
    data: battles,
  });
  next();
}, errorHandler);

module.exports = router;