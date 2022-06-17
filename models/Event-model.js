const {Schema, model} = require('mongoose');

// the Event-model file is an instance of a mongoose Schema, every variable on this schema can contain several
// attributes, such as the primitive or custom type, if that type is required for the schema to be saved in the
// mongoose collection or not, if the type is actually a reference of another schema, etc.
const EventSchema = Schema({
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

// this method will allow us to modify some of the attributes sent through the header as data,
// in this case we will render the information as a JSON type of data, and we will change some
// portion of the information for it to change its name and remove one of the attributes we
// dont need at all, so the actual object is going to be deconstructed by retrieving the _v and the
// _id attributes, the spread operator '...' will leave the rest of the other object data untouched.
// the _id attribute will be reassigned as simply 'id' and the _v will be left out as it is unnecessary
// for our object processes, one this is done the new object is returned.
EventSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

// when the event schema is returned, whenever it is used the first time it will be saved in a collection called
// 'Event' by using this model method of mongoose.
module.exports = model('Event', EventSchema);