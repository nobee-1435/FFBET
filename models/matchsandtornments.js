const mongoose = require('mongoose');

const matchsandtornmentsSchema = mongoose.Schema({
    matchtype: String,
    matchentryamount: String,
    matchfirstprice: String,
    playerlimit: String,
    matchstarttime: String,
    playerdetails: String,
    matchplayer: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'matchplayer'
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Matchsandtournment', matchsandtornmentsSchema);