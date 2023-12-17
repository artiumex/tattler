const { model, Schema } = require('mongoose');
const { pingCat } = require('../functions');

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    emoji: {
        type: String,
        required: true
    },
    terms: {
        type: [String],
        required: true
    },
    allowed: {
        type: [String],
        required: false
    },
    ignored: {
        type: [String],
        required: false
    },
});

schema.watch().on('change', data => pingCat());

module.exports = model('WordsSchema', schema);