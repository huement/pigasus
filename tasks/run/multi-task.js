module.exports = function (grunt, gopts) {
  grunt.registerMultiTask("multi-task", function () {
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

    grunt.log.writeln(this.target);
    grunt.log.writeln(JSON.stringify(this.data));
  });
};
