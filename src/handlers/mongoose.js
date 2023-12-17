const { connect } = require("mongoose");
const { log } = require("../functions");

module.exports = async () => {
    log('Started connecting to MongoDB...', 'warn');

    await connect(process.env.MONGODBURI).then(() => {
        log('MongoDB is connected to the atlas!', 'done')
    });
};