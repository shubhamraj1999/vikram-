// const moment = require('moment');
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const orderschema =new mongoose.Schema (
{userId: {
    type : ObjectId,
    ref : 'User'

},
productId: {
    type : ObjectId,
    ref : 'Product'
},
amount: Number,
isFreeAppUser: Boolean,
date:{
    type:String ,
    default:new Date()
}
},{timestamps : true})

module.exports = mongoose.model('Order', orderschema)