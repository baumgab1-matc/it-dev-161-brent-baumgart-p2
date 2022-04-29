const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema( {
    customer: {
        type: mongoose.Schema.ObjectId,
        required: true,
        trim: true
    },
    order: 
      [{
        _id: String,
        name: String,
        img: String,
        price: Number,
        amount: Number
      }],
  
}, {timestamps: true} );

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;