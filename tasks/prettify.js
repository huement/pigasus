/**
 *   @brief   HTML Prettyprinter
 *   @details Task that beautifies your HTML
 *   @link    https://npm.io/package/grunt-html-prettyprinter
 *
 *   main: {
 *     expand: true,
 *     cwd: '<%= grunt.config.get("cache") %>/main',
 *     ext: ".html",
 *     src: ["*.html"],
 *     dest: '<%= grunt.config.get("prod.pages") %>',
 *   },
 */

module.exports = {
  options: {
    config: ".jsbeautifyrc",
  },
  files: {
    '<%= grunt.config.get("prod.pages") %>/index.html': [
      '<%= grunt.config.get("prod.pages") %>/index.html',
    ],
  },
};
