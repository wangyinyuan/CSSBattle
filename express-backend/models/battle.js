const mongoose = require('mongoose');

const battleSchema = new mongoose.Schema({})

const Battle = mongoose.model('Battle', battleSchema);

module.exports = Battle;