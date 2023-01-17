/**
 *   @brief   Copy files from one place to another
 *   @details Optionally, you can process the files, control directory structure and more.
 *   @link    https://github.com/gruntjs/grunt-contrib-copy
 */

module.exports = {
  font: {
    expand: true, // Enable dynamic expansion
    cwd: '<%= grunt.config.get("dev.fonts") %>/', // Src matches are relative to this path
    src: ["*.{woff,woff2}"], // Actual patterns to match
    dest: '<%= grunt.config.get("prod.fonts") %>/', // Destination path prefix
  },
  jollyBAR: {
    expand: true,
    cwd: '<%= grunt.config.get("dev.debug") %>',
    src: ["*.js", "*.json", "*.css", "**/*.css"],
    dest: '<%= grunt.config.get("prod.debug") %>',
  },
  docs: {
    files: [
      {
        expand: true,
        cwd: '<%= grunt.config.get("dev.assets") %>/imgs/favicon/',
        src: ["*.png", "*.ico", "*.svg"],
        dest: '<%= grunt.config.get("prod.pages") %>',
      },
      {
        expand: true,
        cwd: '<%= grunt.config.get("dev.assets") %>/imgs/',
        src: ["*.png", "*.svg"],
        dest: '<%= grunt.config.get("prod.pages") %>/imgs/',
      },
      {
        expand: true,
        cwd: '<%= grunt.config.get("dev.assets") %>/files/',
        src: ["*.txt", ".htaccess"],
        dest: '<%= grunt.config.get("prod.pages") %>',
      },
      {
        expand: true,
        cwd: '<%= grunt.config.get("dev.assets") %>/files/highlight/',
        src: ["*.css", "*.js"],
        dest: '<%= grunt.config.get("prod.pages") %>/highlight/',
      },
      {
        expand: true,
        cwd: '<%= grunt.config.get("dev.assets") %>/files/prismjs/',
        src: ["*.css", "*.js"],
        dest: '<%= grunt.config.get("prod.pages") %>/prismjs/',
      },
      {
        expand: true,
        cwd: '<%= grunt.config.get("dev.assets") %>/scripts/',
        src: ["*.js", "!_*.scss"],
        dest: '<%= grunt.config.get("prod.pages") %>/js/',
      },
      {
        expand: true,
        cwd: '<%= grunt.config.get("dev.assets") %>/style/',
        src: ["*.css"],
        dest: '<%= grunt.config.get("prod.pages") %>/css/',
      },
    ],
  },
  pagesJS: {
    expand: true,
    cwd: '<%= grunt.config.get("dev.js") %>/',
    src: ["*.js", "*.json"],
    dest: '<%= grunt.config.get("prod.js") %>',
  },
  pagesCSS: {
    expand: true,
    cwd: '<%= grunt.config.get("cache.style") %>/',
    src: ["*.css", "*.css.map"],
    dest: '<%= grunt.config.get("prod.style") %>',
  },
  pagesIMG: {
    expand: true,
    cwd: '<%= grunt.config.get("dev.img") %>/',
    src: [
      "*.{png,jpeg,jpg,svg,ico,webp,gif}",
      "artwork/*.{png,jpeg,jpg,svg,ico,webp,gif}",
      "logo/*.{png,jpeg,jpg,svg,ico,webp,gif}",
    ],
    dest: '<%= grunt.config.get("prod.img") %>',
  },
  pagesSVG: {
    expand: true,
    cwd: '<%= grunt.config.get("dev.svg") %>/',
    src: ["*.svg"],
    dest: '<%= grunt.config.get("prod.img") %>/svgs',
  },
};
