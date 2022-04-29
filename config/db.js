const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');


//connect to mongodb
const connectDatabase = async () => {
    try {
        await mongoose.connect(db, {
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
        
    } catch (err) {
        console.log("Error Occurred", err.message);
        process.exit(1);
    }
};

module.exports = connectDatabase;