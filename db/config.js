const mongoose = require('mongoose');

const connection = async() => {

    try{
        // The MongoDB Node.js driver rewrote the tool it uses to parse MongoDB connection strings. Because 
        // this is such a big change, they put the new connection string parser behind a flag. To turn on this 
        // option, pass the useNewUrlParser option to mongoose.connect() or mongoose.createConnection().
        // The useUnifiedTopology option removes support for several connection options that are no longer 
        // relevant with the new mongo topology engine.
        //
        // for more information about mongoose deprecations, please refer to https://mongoosejs.com/docs/5.x/docs/deprecations.html
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('db online');

    }catch (error) {
        console.log(error);
        throw new Error('Can not connect to database')
    };
};

module.exports = {
    connection
};