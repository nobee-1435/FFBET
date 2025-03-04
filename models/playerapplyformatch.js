const mongoose = require('mongoose');


let playerapplySchema = mongoose.Schema({
    playername: String,
    playerid: Number,
    matchtype: String,
    entryamount: String,
    paymentmethod: String,
    Transactionid: Number,
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('playerapplymatch', playerapplySchema)