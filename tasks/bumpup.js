const moment = require("moment");
const semver = require("semver");

module.exports = {
  options: {
    dateformat: "YYYY-MM-DD HH:mm",
    normalize: false,
  },
  setters: {
    version: function (old, releaseType, options, buildMeta) {
      // Overrides version setter
      return semver.inc(old, releaseType);
    },
    timestamp: function (old, releaseType, options) {
      // Adds a new setter for `timestamp` property
      return moment.utc().format(options.dateformat);
    },
    built: function (old, releaseType, options) {
      // Adds a new setter for `timestamp` property
      return moment.utc().format("MM/DD/YYYY");
    },
    build: function (old) {
      return parseInt(old) + 1;
    },
  },
  files: ["package.json"],
};
