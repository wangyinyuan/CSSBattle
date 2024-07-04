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

module.exports = {
  getUserByName,
}