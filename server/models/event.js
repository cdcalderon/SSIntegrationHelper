var mongoose = require('mongoose');

var StockEarning = mongoose.model('Event', {
    change: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },

});

module.exports = {
    Event
};