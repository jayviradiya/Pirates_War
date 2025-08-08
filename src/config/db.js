const mongoose = require('mongoose');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const dbConnectionString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

const connectDB = async () => {
    try {

        const conn = await mongoose.connect(`${dbConnectionString}`);
        console.log(`mongoDB Connected`);
        
    } catch (error) {

        console.log(`mongoDb Connection Error: ${error.message}`);
        process.exit(1);
        
    }
};

module.exports = connectDB