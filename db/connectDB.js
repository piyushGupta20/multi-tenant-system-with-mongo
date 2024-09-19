const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/main');
        // mongoose.set('debug', true);
        console.log("connected success at main")
        mongoose.model('User', mongoose.Schema({ email: String }));
    } catch (error) {
        console.log("db error", error)
        process.exit(1)
    }
}

module.exports = { connectDB }