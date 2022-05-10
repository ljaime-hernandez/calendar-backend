const {Schema, model} = require('mongoose');

const EventSchema = Schema({
    initDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

EventSchema.method('toJSON', function() {
    const { _v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Event', EventSchema);