const mongoose = require('mongoose')

async function connectDB(URI){
     try{
        await mongoose.connect(URI);
        console.log('MongoDB connected successfully')
     }catch(err){
        console.error('error connecting mongoDB', err.message)
        process.exit(1)
     }
}

module.exports = connectDB