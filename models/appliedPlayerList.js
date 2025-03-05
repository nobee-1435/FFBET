const mongoose = require('mongoose');


const appliedPlayerListSchema = mongoose.Schema({
    matchFullDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'matchFullDetails'
    },
    playerName : String,
    playerId: String,
    matchType: String,
    entryAmount: String,
    matchStartingTime: String,
    paymentTransactionId: String,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('appliedPlayerList', appliedPlayerListSchema)