const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    token: String,
    username: { type: String, required:true ,unique: true },
    password: { type: String, required:true },
    avatar: String,
    bio: String,
    isPlus: Boolean,
    totalScore: Number,
    totalTarget: Number,
    rank: Number,
})


const User = mongoose.model('User', userSchema);

module.exports = User;




