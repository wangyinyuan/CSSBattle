const fs = require("fs");
const path = require("path");
const { fillBattleData } = require("../services/battle");

const battlesFilePath = path.resolve(__dirname, "../data/battles.txt");
const outputFilePath = path.resolve(__dirname, "../data/final_battles.json");
function createFinalBattlesData() {
  const targetRegex =
    /(?<="documentChange": \{\n\s+"document": )[\s\S]+?(?=,\n\s+"targetIds")/g;
  const data = fs.readFileSync(battlesFilePath, "utf-8");
  const matches = data.match(targetRegex);
  const battles = "[".concat(matches.join(",\n"), "]");
  fs.writeFileSync(outputFilePath, battles, "utf-8");
}

// createFinalBattlesData();
/**
 * Retrieves battles as JSON from the specified output file path.
 * @returns {Object} The battles data in JSON format.
 */
function getBattlesAsJson() {
  return JSON.parse(fs.readFileSync(outputFilePath, "utf-8"));
}

function writeBattlesToMongo() {
  let battles = getBattlesAsJson();
  battles = battles.map((battle) => ({
    image: battle.fields.image.stringValue,
    date: battle.fields.name.stringValue.trim().split('/').reverse().join('/'),
    imageColors: battle.fields.colors.arrayValue.values.map((color => color.stringValue))
  }));
  fillBattleData(battles);
}

module.exports = {
  getBattlesAsJson,
  writeBattlesToMongo
}