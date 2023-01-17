/**
 * grunt-google-cdnify
 * https://github.com/johnny13/grunt-page-data
 *
 * Copyright (c) 2022 Huement.com
 * Licensed under the MIT license.
 *
 * This is a really cool complex async multiTask that will assemble JSON files
 * from a given folder. Basically any directory + files represented as an object.
 *
 * Its mainly used in mojo to create links to each file via Pug templates.
 *
 * Its an Async task, so its a bit different than most Grunt tasks, because it
 * can read the files its gathering up, taking data from the header of each file
 * allowing the files to declare their own icons and groupings etc.
 *
 */

module.exports = function (grunt, gopts) {
  var fs = require("fs");
  var path = require("path");
  var async = require("async");
  var glob = require("glob");
  var jetpack = require("fs-jetpack");

  grunt.registerMultiTask(
    "page-data",
    "Assemble JSON formatted list pages from directory of files",
    async function (target) {
      // Super Important! Pay Attention Fuck Face. This is an Async Task.
      // If you want it to be a real multi task, you must call this function
      // when the tasks completes, otherwise it will end the chain after 1 run.
      var done = this.async();

      // grunt.log.writeln(this.target);
      // grunt.log.writeln(JSON.stringify(this.data));

      var options = this.options({
        indent: 2,
      });

      var self = this;
      var name = self.name || "page-data";
      var taskTarget = self.target;
      var baseDir = path.resolve(process.cwd());

      if (!options.target) {
        grunt.log.error('Option "target" not provided! Cannot continue.');
        grunt.fail.fatal(JSON.stringify(options));
      }

      if (!self.data.path) {
        grunt.log.error('Task "path" not provided! Cannot continue.');
        grunt.fail.fatal(JSON.stringify(self.data));
      }

      if (!self.data.url) {
        // grunt.log.error('Task "url" not provided! Cannot continue.');
        // grunt.fail.fatal(JSON.stringify(self.data));
        self.data.url = "";
      }

      if (self.data.target) {
        options.target = self.data.target;
      }

      options.groupBy = self.data.groupBy ? self.data.groupBy : false;

      let defaultIcon = "default";
      if (self.data.defaultIcon) {
        defaultIcon = self.data.defaultIcon;
      } else if (options.defaultIcon) {
        defaultIcon = options.defaultIcon;
      }

      if (grunt.option("verbose")) {
        grunt.log.writeln("\nPage-Data Task\n");
        //grunt.log.writeln(JSON.stringify(gopts));
        grunt.log.writeln("Output Target: " + options.target);
        grunt.log.writeln("Task Data: " + JSON.stringify(self.data));
        grunt.log.writeln("Base Dir: " + baseDir);
        grunt.log.writeln("All Data: " + JSON.stringify(self));
        grunt.log.writeln("\n");
      }

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
       * Transform a string into a web friendly URL slug
       * @param {String} text - The string that should be turned into a slug
       */
      function slugify(text) {
        return text
          .toString()
          .toLowerCase()
          .replace(/\s+/g, "-") // Replace spaces with -
          .replace(/[^\w\-]+/g, "") // Remove all non-word chars
          .replace(/\-\-+/g, "-") // Replace multiple - with single -
          .replace(/^-+/, "") // Trim - from start of text
          .replace(/-+$/, ""); // Trim - from end of text
      }

      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

      /**
       * use regex to find a string for a given file. useful for finding page config data etc
       * @param {String} fullPath - path to file that will be searched
       * @param {String} regexString - string converted into regex filter
       * @return {String|bool} returns either the first instance of found string or false
       */
      async function findStringInFile(fullPath, regexString) {
        var data = fs.readFileSync(fullPath).toString("utf8");
        var dataArr = data.split("\n");
        const regex = new RegExp(regexString);
        if (regex.test(data)) {
          for (const line of dataArr) {
            if (regex.test(line)) {
              if (grunt.option("verbose")) grunt.log.writeln(line);
              return line;
            }
          }
        }

        return false;
      }

      let searchResults = [];
      let searchPath = path.resolve(process.cwd(), self.data.path);

      if (fileExists(searchPath)) {
        // Optionally if we have declared a group to sort by
        let gList = options.groupBy;

        let AllFiles = jetpack.find(searchPath, {
          matching: "*.pug",
          recursive: false,
        });

        for (const file of AllFiles) {
          let pageObj = {};
          let fname = capitalizeFirstLetter(path.parse(file).name);
          let fslug = slugify(fname);
          let furl = self.data.url.replace(/\/$/, "") + "/" + fslug;

          let ficon = defaultIcon;
          let iconPug = await findStringInFile(file, /var\sicon\b/);

          if (iconPug != 0 && iconPug != undefined) {
            // Clean Up Match
            ficon = iconPug
              .replace("- var icon =", "")
              .replace('"', "")
              .replace('"', "")
              .trim();
            if (grunt.option("verbose")) grunt.log.writeln("ICON: " + ficon);
            pageObj.icon = ficon;
          }

          // Grouping
          let fgroup = "";
          if (gList !== false) {
            let groupName = await findStringInFile(file, /var\sparent\b/);
            if (groupName != 0 && groupName != undefined) {
              // Clean Up Match
              fgroup = groupName
                .replace("- var parent =", "")
                .replace('"', "")
                .replace('"', "")
                .replace("'", "")
                .replace("'", "")
                .trim();
            }
            pageObj.group = fgroup;
          }

          pageObj.name = fname;
          pageObj.url = furl;

          if (fgroup != "" && gList[fgroup]) {
            gList[fgroup].push(pageObj);
          } else {
            grunt.log.writeln("No Group for: " + fname);
            searchResults.push(pageObj);
          }
        }

        // Filename is either derived from the target OR explicitly declared
        //let lastItem = self.target.substring(self.target.lastIndexOf("/") + 1);
        let finalPageName = slugify(taskTarget);
        if (self.data.filename) finalPageName = slugify(self.data.filename);

        let totalPages = AllFiles.length;

        let finalPage = path.resolve(
          process.cwd(),
          options.target,
          finalPageName
        );

        if (searchResults.length > 0) {
          writeJson(finalPage + ".json", searchResults, options.indent);
          // grunt.log.writeln("JSON Results");
          // grunt.log.writeln(JSON.stringify(searchResults));
        } else {
          writeJson(finalPage + ".json", gList, options.indent);
          // grunt.log.writeln("JSON Results");
          // grunt.log.writeln(JSON.stringify(gList));
        }

        grunt.log.writeln("");
        grunt.log.ok(
          `${totalPages} pages linked up and saved to: ${finalPage}`
        );
        grunt.log.writeln("");
        done();
      } else {
        grunt.log.error(searchPath + " is not a valid path.");
        grunt.fail.fatal(JSON.stringify(self.data));
        done(false);
      }
    }
  );
};
