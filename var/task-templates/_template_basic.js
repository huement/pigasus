module.exports = function (grunt) {
  var chalk = require("chalk");

  // or registerMultiTask
  grunt.registerTask(
    "custom",
    "A task that does really neat stuff",
    function () {
      // The neat stuff...
      grunt.log.writeln("Testing");

      // var pConfig = grunt.config.get("env");

      // grunt.log.write(chalk.green.bold("[DELT] "));
      // grunt.log.writeln(chalk.cyan.bold("Clearing out old page files"));
      // grunt.task.run("clean:pages");
      // grunt.task.run("clean:style");
    }
  );
  // You probably don't need to return configuration for tasks you write,
  // but you could use a function in a plugin's task configuration to do
  // different things based on the environment (for example)
  return {
    options: {
      extraNeatness: true,
    },
  };
};
