const mongoose = require("mongoose")
const {config}  = require('../config/config')

function connectionToDb(){
    mongoose.connect(process.env.MONGODB_URI,{
       }).then(()=>{
        console.log('connected to db');
        
       })


}
module.exports = connectionToDb