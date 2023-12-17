const cron = require('node-cron');
const { readdirSync } = require('fs');

const { log } = require("../functions");

module.exports = () => {
    for (const file of readdirSync('./src/jobs/').filter((f) => f.endsWith('.js'))) {
        const job = require('../jobs/' + file);
        if (!job.skip) {
            if (job.cron && job.cron.length > 0 && cron.validate(job.cron)) {
                if (!job.run) return log(`"${file}" job could not be scheduled: Invalid run method!`, 'err');
                var task = cron.schedule(job.cron, () => job.run(), { scheduled: true, timezone: "America/Chicago" });
                log('Scheduled cron task: ' + file, 'info');
                if (job.autorun) job.run();
            } else log(`"${file}" job could not be scheduled: Invalid cron schedule!`, 'err');
        }
    }
}