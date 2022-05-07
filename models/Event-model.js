const {Schema, model} = require('mongoose');

const EventSchema = Schema({
    initDate: {
        type: Date,
        require: true
    },
    endDate: {
        type: Date,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    notes: {
        type: String,
        require: true,
    }
});

module.exports = model('Event', EventSchema);