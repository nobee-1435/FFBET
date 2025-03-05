const mongoose = require('mongoose');

const selectedPlayerListSchema = mongoose.Schema({
    matchfullDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'matchFullDetails'
    },
    player: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('selectedPlayerList', selectedPlayerListSchema);

