const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    comment: String,
    image: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Photo', photoSchema);
