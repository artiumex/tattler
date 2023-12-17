const { model, Schema } = require('mongoose');
const { pingCat } = require('../functions');

const schema = new Schema({
    phrase: {
        type: String,
        required: true
    },
    enabled: {
        type: Boolean,
        required: true
    },
});

schema.watch().on('change', data => pingCat());

module.exports = model('StatusSchema', schema);