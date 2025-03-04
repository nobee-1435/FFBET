const mongoose = require('mongoose');

const matchplayer = mongoose.Schema({
    Matchsandtournment : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Matchsandtournment'
    },
    player1: String
});

module.exports = mongoose.model('matchplayer', matchplayer);