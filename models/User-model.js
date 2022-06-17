const {Schema, model} = require('mongoose');

// similar to  the Event-model, the User-model file is an instance of a mongoose Schema, every variable on this 
// schema can contain several attributes, such as the primitive or custom type, if that type is required for the 
// schema to be saved in the mongoose collection or not, if the type is actually a reference of another schema, etc.
// Additional to it, the email on this schema contains an attribute for it to be unique, if the user attempts
// to save a new document with an existing email in our database then it will receive an error.
const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// when the user schema is returned, whenever it is used the first time it will be saved in a collection called
// 'User' by using this model method of mongoose.
module.exports = model('User', UserSchema);