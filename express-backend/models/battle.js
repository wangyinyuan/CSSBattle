const mongoose = require('mongoose');

const battleSchema = new mongoose.Schema({
    image: { type: String, required: true},
    imageColors: [String],
    date: { type: Date, default: Date.now },
    averageScore: { type: Number, default: 0 },
    averageAccuracy: { type: Number, default: 0 },
    highestScore: { type: Number, default: 0 },
})

const Battle = mongoose.model('Battle', battleSchema);

module.exports = Battle;