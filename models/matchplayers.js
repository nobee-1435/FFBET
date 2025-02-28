const mongoose = require('mongoose');

const matchplayer = mongoose.Schema({
    Matchsandtournments : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Matchsandtournments'
    },
    player1: String
});

module.exports = mongoose.model('matchplayer', matchplayer);