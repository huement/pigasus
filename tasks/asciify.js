module.exports = {
  banner: {
    text: '<%= grunt.config.get("name") %>',
    options: {
      font: "chunky",
      color: "green",
      log: true,
    },
  },
  dev: {
    text: " DEV ",
    options: {
      font: "graffiti",
      color: "green",
      log: true,
    },
  },
  chunk: {
    text: '<%= grunt.config.get("name") %> v<%= grunt.config.get("version") %>',
    options: {
      font: "doom",
      color: "green",
      log: true,
    },
  },
};
