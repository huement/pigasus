module.exports = {
  options: {
    spawn: false,
    interrupt: true,
    forever: true,
    debounceDelay: 333,
    reload: true,
    atBegin: true,
  },
  all: {
    options: {
      spawn: true,
      reload: true,
      atBegin: true,
      debounceDelay: 100,
      livereloadOnError: true,
    },
    files: [
      '<%= grunt.config.get("dev.website") %>/**/*.pug',
      '<%= grunt.config.get("dev.sass") %>/**/*.scss',
      '<%= grunt.config.get("dev.website") %>/lit/*.mjs',
      '<%= grunt.config.get("dev.website") %>/lit/*.js',
    ],
    tasks: ["concurrent", "buildnumber"],
  },
  style: {
    options: {
      spawn: true,
      reload: true,
      atBegin: true,
      livereloadOnError: false,
    },
    files: ['<%= grunt.config.get("dev.sass") %>/**/*.scss'],
    tasks: ["dart-sass"],
  },
  pages: {
    options: {
      atBegin: false,
      reload: true,
      livereloadOnError: false,
    },
    files: ['<%= grunt.config.get("dev.pages") %>/**/*.pug'],
    tasks: ["pug"],
  },
  lit: {
    options: {
      atBegin: true,
      reload: true,
      livereloadOnError: false,
    },
    files: [
      '<%= grunt.config.get("dev.website") %>/lit/*.js',
      '<%= grunt.config.get("dev.website") %>/lit/*.mjs',
    ],
    tasks: ["browserify", "buildnumber"],
  },
};
