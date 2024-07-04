const Battle = require("../models/battle");
const dayjs = require("dayjs");
const { dbLogger } = require("../logger");

/**
 * Fills battle data into the database.
 * @param {Array<Object>} battles - An array of battle objects.
 * @param {string} battles[].image - The image URL of the battle.
 * @param {string} battles[].date - The date of the battle.
 * @param {Array<string>} battles[].imageColors - An array of image colors.
 */
async function fillBattleData(battles) {
  try {
    await Promise.all(
      battles.map(async (battle) => {
        const existingBattle = await Battle.findOne({ date: battle.date });
        if (!existingBattle) {
          const newBattle = new Battle({
            image: battle.image,
            date: battle.date,
            imageColors: battle.imageColors,
          });
          return newBattle.save();
        } else {
          dbLogger.info(
            `Battle with date ${battle.date} already exists. Skipping...`
          );
          return Promise.resolve();
        }
      })
    );
    dbLogger.info("Successfully filled battle data");
  } catch (e) {
    dbLogger.error("Error filling battle data", e);
  }
}

async function getBattleById(id) {
  try {
    const battle = await Battle.findById(id);
    return battle;
  } catch (e) {
    dbLogger.error("Error getting battle by ID", e);
    throw e;
  }
}

function getScores(similarity, code) {
  const similarityScore = similarity * 100;
  const codeLength = code.length;
  const maxLength = 1000;
  let codeScore;

  if (codeLength < 1000) {
    codeScore = 20 * (maxLength - codeLength) / maxLength;
  } else {
    codeScore = 0;
  }

  return similarityScore + codeScore;
}

/**
 * Retrieves all battles from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of battles.
 */
async function getAllBattles() {
  try {
    const battles = await Battle.find({});
    return battles;
  } catch (e) {
    dbLogger.error("Error getting all battles", e);
    throw e;
  }
}

async function getAllBattlesSorted(isAscending = true) {
  try {
    const battles = await getAllBattles();
    const sortedBattles = battles.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (isAscending) {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
    return sortedBattles;
  } catch (e) {
    dbLogger.error("Error sorting battles", e);
  }
}

module.exports = {
  fillBattleData,
  getAllBattlesSorted,
  getBattleById,
  getScores,
};
