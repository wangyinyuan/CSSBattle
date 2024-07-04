const { dbLogger } = require("../logger");
const User = require("../models/user");

async function getUserByName(name) {
  try {
    const user = await User.findOne({ username: name });
    dbLogger.info("User found by name:", user);
    return user;
  } catch(e) {
    dbLogger.error("Error getting user by name", e);
    throw e;
  }
}

async function updateUserBattle(userName, battleId, code, similarity, score) {
  try {
    const user = await getUserByName(userName);
    if (!user) {
      throw new Error("User not found");
    }

    const battleIndex = user.battles.findIndex(b => b._id.toString() === battleId);
    if (battleIndex !== -1) {
      user.battles[battleIndex].code = code;
      user.battles[battleIndex].latestScore = score;
      user.battles[battleIndex].accuracy = similarity;
      if (score > user.battles[battleIndex].highestScore) {
        user.battles[battleIndex].highestScore = score;
      }
    } else {
      user.battles.push({
        battle: battleId,
        code,
        latestScore: score,
        highestScore: score,
        accuracy: similarity,
      });
    }

    await user.save();

  } catch(e) {
    dbLogger.error("Error updating user battle", e);
    throw e;
  }
}

module.exports = {
  getUserByName,
  updateUserBattle,
}