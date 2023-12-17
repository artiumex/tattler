const express = require("express");
const { log, random } = require("../functions");

const Words = require('../schemas/WordsSchema');
const Statuses = require('../schemas/StatusSchema');
const Ignored = require('../schemas/IgnoredSchema');

const app = express();

module.exports = () => {
    app.listen(process.env.SERVERPORT, () => {
        log("Server running on port " + process.env.SERVERPORT, 'done');
    });

    app.get('/grab', async (req, res, next) => {
        const words = await Words.find({});
        const ignored = await Ignored.find({});
        const status = await Statuses.find({});

        const ss = status.map(e => { if (e.enabled) return e.phrase });
        
        res.json({
            words: words.map(e => {
                const output = {
                    emoji: e.emoji,
                    terms: e.terms,
                }
                if (e.allowed.length > 0) output.allowed = e.allowed;
                if (e.ignored.length > 0) output.ignored = e.ignored;
                return output
            }),
            presence: ss[random(0, ss.length-1)],
            ignored: ignored.map(e => { if (e.enabled) return e.userid })
        });
    });
}