const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema( {
    firstName: {
        type: String,
        required: true,
        trim: true        
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    orders:
        [{
            type: mongoose.Schema.ObjectId,
            ref: 'Order'
        }]
    
}, {timestamps: true} );

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;