const mongoose = require('mongoose');

const connection = async() => {

    try{

        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('db online');

    }catch (error) {
        console.log(error);
        throw new Error('Can not connect to database')
    }
} 

module.exports = {
    connection
}