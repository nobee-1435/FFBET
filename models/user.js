const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

const userSchema = mongoose.Schema({
    

});

module.exports = mongoose.model('User', userSchema);