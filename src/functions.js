const chalk = require("chalk");
const axios = require('axios');

/**
 * Logs a message with optional styling.
 *
 * @param {string} string - The message to log.
 * @param {'info' | 'err' | 'warn' | 'done' | 'event' | undefined} style - The style of the log.
 */
const log = (string, style) => {
  const styles = {
    info: { prefix: chalk.blue("[INFO]"), logFunction: console.log },
    err: { prefix: chalk.red("[ERROR]"), logFunction: console.error },
    warn: { prefix: chalk.yellow("[WARNING]"), logFunction: console.warn },
    done: { prefix: chalk.green("[SUCCESS]"), logFunction: console.log },
    event: { prefix: chalk.magenta("[EVENT]"), logFunction: console.log },
  };

  const selectedStyle = styles[style] || { logFunction: console.log };
  selectedStyle.logFunction(`${selectedStyle.prefix || ""} ${string}`);
};

const error = (err) => {
  log(err, 'err');
};


/**
 * Generates random number
 *
 * @param {number} min - The lowest number (inclusive).
 * @param {number} max - The largest number (inclusive).
 * @returns {number} - The random number.
 */
const random = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const pingCat = async () => {
  await axios.get(process.env.CAT_URL + '/updated');
  log('pinged the cat!', 'event');
}

module.exports = {
  log,
  error,
  random,
  pingCat,
};
