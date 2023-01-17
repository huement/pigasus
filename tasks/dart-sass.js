/**
 *	 @brief   Compiles and converts SASS to minified css
 *            Uses Dart-Sass at its core. Not Node-Sass.
 *   @details https://github.com/gruntjs/grunt-contrib-sass
 */

const eyeglass = require("eyeglass");
// var rootDir = __dirname;

// var options = {};
// options.eyeglass = { root: rootDir };

module.exports = {
  options: eyeglass({
    sourceMap: true,
    outputStyle: "expanded",
    disableStrictDependencyCheck: true,
    modules: [],
  }),
  basic: {
    style: "expanded",
    files: [
      {
        expand: true,
        cwd: '<%= grunt.config.get("dev.sass") %>/',
        src: ["*.scss", "!_*.scss"],
        dest: '<%= grunt.config.get("prod.css") %>',
        ext: ".css",
      },
    ],
  },
};
