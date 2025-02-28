const mongoose = require('mongoose');

const matchsandtornmentsSchema = mongoose.Schema({
    matchtype: String,
    matchentryamount: String,
    matchfirstprice: String,
    playerlimit: String,
    matchstarttime: String,
    playerdetails: String,
        matchplayers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Matchplayer'
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Matchsandtournments', matchsandtornmentsSchema);