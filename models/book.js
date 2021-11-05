const mongoose = require('mongoose');

let bookScheme = new mongoose.Schema({
    name: String,
    author: String,
    price: Number
});

module.exports = mongoose.model('Book', bookScheme);