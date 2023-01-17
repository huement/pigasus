/**
 *	@brief   Concatinate multiple files into a single file.
 *  @details This example contacts Markdown from 'docs/' directory.
 *  @link	 https://github.com/gruntjs/grunt-contrib-concat
 */

module.exports = {
  options: {
    sourceMap: true,
    separator: ";\n",
    banner: '<%= grunt.config.get("meta.banner") %>/',
    process: function (src, filepath) {
      console.log(filepath);
      var result = src.replace(
        "s/console.(log|debug|info|...|count)((.*));?//g",
        ""
      );
      return result;
    },
  },
  dev: {
    src: [
      '<%= grunt.config.get("dev.js") %>/chunk/*.js',
      '<%= grunt.config.get("dev.js") %>/main.js',
    ],
    dest:
      '<%= grunt.config.get("prod.js") %>/<%= grunt.config.get("name") %>.<%= grunt.config.get("version") %>.js',
  },
};
