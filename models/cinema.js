const mongoose = require('mongoose');
const UserSchema =  new mongoose.Schema({
    fullName:{
        type: String
    },
    name:{
        type:String        
    },
    seat:{
        type: Number
    },
    hell:{
        type:String
    },
    static:{
        type:Number
    }
});
const Cinema =  mongoose.model('cinemas',UserSchema);
module.exports = Cinema;