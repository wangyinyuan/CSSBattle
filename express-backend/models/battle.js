const mongoose = require('mongoose');

const battleSchema = new mongoose.Schema({
    id: String,
    maxScore: Number,
    userScores: [{
        user: {type: Schema.Types.ObjectId, ref:'User'},
        highScore: Number,
        lastScore: Number,
        code: String
    }]
})

const Battle = mongoose.model('Battle', battleSchema);

module.exports = Battle;