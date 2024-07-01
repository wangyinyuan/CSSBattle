const mongoose = require('mongoose');

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
})


const User = mongoose.model('User', userSchema);

module.exports = User;




