const mongosee = require('mongoose');
const Schema = mongosee.Schema;

//create Schema 
const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number
    },
    address: {
        type: String
    },
    facebook: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Customer = mongosee.model('customer', CustomerSchema)