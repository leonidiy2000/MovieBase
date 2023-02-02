const mongoose = require('mongoose');
const { Decimal128 } = require('mongodb');

const Schema = mongoose.Schema;
const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    rating: {
        type: Decimal128,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Movie', movieSchema);