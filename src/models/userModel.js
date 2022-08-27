const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    firstName: String,
    balance :{
        type : Number,
        default :100
    },
    address : String,
    gender: {
        type: String,
        enum: ["male", "female", "other"] //"falana" will give an error
    },
    age: Number,
    // isIndian: Boolean,
    // parentsInfo: {
    //     motherName: String,
    //     fatherName: String,
    //     siblingName: String
    // },
    // cars: [ String  ]
    isFreeAppUser :{
        type: Boolean,
        default : false
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema) //users



// String, Number
// Boolean, Object/json, array