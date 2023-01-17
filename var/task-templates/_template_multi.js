/*
 * grunt-google-cdnify
 * https://github.com/johnny13/grunt-page-data
 *
 * Copyright (c) 2014 mhaligowski
 * Licensed under the MIT license.
 */

module.exports = function (grunt, globalOptions) {
  var fs = require("fs");
  var path = require("path");
  var async = require("async");

  grunt.registerMultiTask(
    "page-data",
    "Assemble JSON files for use in Pug templates",
    function (target) {
      var done = this.async();

      var options = this.options({
        indent: 2,
      });

      var self = this;
      var name = self.name || "page-data";

      var src = self.data.src;
      var dest = self.data.dest;
      var keyName = self.data.key;
      var target = self.target;

      //var baseDir = path.relative(process.cwd());
      //var reporterOutput = grunt.template.process(reporterOutput);
      var baseDir = path.resolve(process.cwd());

      if (grunt.option("verbose")) {
        grunt.log.writeln("\nPage-Data Task\n");
        //grunt.log.writeln(JSON.stringify(gopts));
        grunt.log.writeln("Output Target: " + options.target);
        grunt.log.writeln("Task Data: " + JSON.stringify(self.data));
        grunt.log.writeln("Base Dir: " + baseDir);
        grunt.log.writeln("All Data: " + JSON.stringify(self));
        grunt.log.writeln("\n");
      }

      // if (grunt.config([name, "options", "target"]) !== false) {
      //   grunt.log.writeln(JSON.stringify(grunt.config([name, "options"])));
      // }

      if (!options.target) {
        grunt.log.error('Option "target" not provided! Cannot continue.');
        grunt.fail.fatal(JSON.stringify(options));
      }

      return true;

      var src = this.data.src;
      var dest = this.data.dest;
      var keyName = this.data.key;
      var target = this.target;

      var baseDir = path.dirname(src);

      grunt.log.writeln("\n\nPage-Data Task\n");
      grunt.log.writeln(this.options.target);
      grunt.log.writeln(this.data.dest);
      grunt.log.writeln(baseDir);

      return true;
      // Read the configuration values.

      // Default options
      var opts = this.options({
        indent: 2,
      });

      let jsonPath = target;

      /**
       * Determines whether the passed value is an Array.
       * @param {*} value - A reference to the value to check.
       * @returns {Boolean} - true if the value is an Array, otherwise false.
       */
      function isArray(value) {
        return Array.isArray(value);
      }

      /**
       * Determines whether the passed value is an Object.
       * @param {*} value - A reference to the value to check.
       * @returns {Boolean} - true if the value is an Object, otherwise false.
       */
      function isObject(value) {
        return Object.prototype.toString.call(value) === "[object Object]";
      }

      /**
       * Reads a file's contents, parsing the data as JSON.
       * @param {String} srcPath - The filepath to the JSON file to parse.
       * @returns {Object}- The parsed JSON data.
       */
      function readJson(srcPath) {
        return grunt.file.readJSON(srcPath);
      }

      /**
       * Writes JSON data to a file.
       * @param {String} destPath - A filepath for where to save the file.
       * @param {Object|Array} data - Value to covert to JSON and saved to file.
       * @param {Number} [indent=2] - The no. of spaces to indent the JSON.
       */
      function writeJson(destPath, data, indent) {
        indent = typeof indent !== "undefined" ? indent : 2;
        grunt.file.write(destPath, JSON.stringify(data, null, indent));
        grunt.log.writeln("Saved \x1b[96m1\x1b[0m file");
      }

      /**
       * Checks whether a file exists and logs any missing files to console.
       * @param {String} filePath - The filepath to check for its existence.
       * @returns {Boolean} - true if the filepath exists, otherwise false.
       */
      function fileExists(filePath) {
        if (!grunt.file.exists(filePath)) {
          grunt.fail.warn('Unable to read "' + filePath + '"');
          return false;
        }
        return true;
      }

      /**
       * Checks whether type of value is a string and logs an error if not.
       * @param {*} value - The value to check
       * @returns {Boolean} - true if type of value is 'string', otherwise false.
       */
      function isString(value) {
        if (typeof value !== "string") {
          grunt.fail.warn('Value type must be a string: found "' + value + '"');
          return false;
        }
        return true;
      }

      /**
       * Processes each Array item for a given key.
       * @param {Object} data - The parsed JSON data to process.
       * @param {String} keyName - Name of key whose Array values to process.
       * @param {String} baseDir - Base directory path of the source json file.
       */
      function processArrayItems(data, keyName, baseDir) {
        var replacement = [];

        data[keyName].forEach(function (item) {
          var fullPath = path.join(baseDir, item);

          if (isString(item) && fileExists(fullPath)) {
            replacement.push(readJson(fullPath));
          }
        });
        data[keyName] = replacement;
        writeJson(dest, data, opts.indent);
      }

      /**
       * Processes an Objects key/value pair for a given Object.
       * @param {Object} data - The parsed JSON data to process.
       * @param {String} keyName - Name of key whose property values to process.
       * @param {String} baseDir - Base directory path of the source json file.
       */
      function processObjectValues(data, keyName, baseDir) {
        var replacement = {};

        Object.keys(data[keyName]).forEach(function (key) {
          var accessor = data[keyName][key];
          var fullPath = path.join(baseDir, accessor);

          if (isString(accessor) && fileExists(fullPath)) {
            replacement[key] = readJson(fullPath);
          }
        });

        data[keyName] = replacement;
        writeJson(dest, data, opts.indent);
      }

      if (fileExists(jsonPath)) {
        fs.readdirSync(jsonPath).forEach((file) => {
          console.log(file);
        });
      }
    }
  );
};
