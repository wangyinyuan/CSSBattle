const mongoose = require('mongoose');

const userBattleSchema = new mongoose.Schema({
    battle: { type: mongoose.Schema.Types.ObjectId, ref: 'Battle', required: true},
    code: {
        type: String,
        required: true,
    },
    latestScore: {
        type: Number,
        default: 0,
    },
    highestScore: {
        type: Number,
        default: 0,
    },
    accuracy: {
        type: Number,
        default: 0,
    },
})

const userSchema = new mongoose.Schema({
    username: { type: String, required:true ,unique: true },
    password: { type: String, required:true },
    avatar: {
        type: String,
        default: "https://i.pravatar.cc/150?img=2",
    },
    bio: {
        type: String,
        default: "这个人很懒，什么都没有留下",
    },
    isPlus: {
        type: Boolean,
        default: false,
    },
    totalScore: {
        type: Number,
        default: 0,
    },
    rank: Number,
    battles: [userBattleSchema],
})


const User = mongoose.model('User', userSchema);

module.exports = User;




