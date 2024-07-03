const Battle = require("../models/battle");
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
          dbLogger.info(`Battle with date ${battle.date} already exists. Skipping...`);
          return Promise.resolve();
        }
      })
    );
    dbLogger.info("Successfully filled battle data");
  } catch (e) {
    dbLogger.error("Error filling battle data", e);
  }
}

module.exports = {
  fillBattleData,
}
