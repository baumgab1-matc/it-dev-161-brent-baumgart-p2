const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    img: {
        type: String,
        required: true,
        trim: true
    },
    blendDescription: {
        type: String,
        required: false
    },
    roastType: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    inStock: {
        type: Number,
        required: true
    }

});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;