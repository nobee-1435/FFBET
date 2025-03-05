const mongoose = require('mongoose');

const matchFullDetailsSchema = mongoose.Schema({
    matchType: String,
    entryAmount: String,
    firstPrice: String,
    secondPrice: String,
    thirdPrice: String,
    fourthandfifthPrice: String,
    sixthtoteenthPrice: String,
    totalParticipantPlayerNumber : String,
    matchStartingTime: String,
    appliedPlayerList: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'appliedPlayerList'
        }
    ],
    selectedPlayerList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'selectedPlayerList'
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('matchFullDetails', matchFullDetailsSchema);