/**
 * show-config
 * @usage
 *  grunt show-config
 *  grunt show-config:task
 * @returns {*}
 */
/*global module*/

module.exports = function (grunt) {
  const chalk = require("chalk");

  const desc =
    "Prints the Grunt configuration object.\nCan optionally add a argument :task to show that task's configuration";

  grunt.registerTask("show-config", desc, function (task) {
    var configObject;
    configObject = grunt.config.get();
    if (task) {
      if (configObject[task]) {
        configObject = configObject[task];
      } else {
        grunt.fatal(task + " does not have any configurations");
      }
    }

    if ((target = grunt.option("output"))) {
      grunt.log.writeln("Config written to file:", target);
      grunt.file.write(target, JSON.stringify(configObject, null, 4));
    } else {
      grunt.log.writeln(
        chalk.bgBlackBright.cyan.bold(
          "▒░  CONFIGURATION  DESCRIPTION                                 ░▒▉▉"
        )
      );
      grunt.log.writeln(chalk.cyan.bold(JSON.stringify(configObject, null, 4)));
      grunt.log.writeln(" ");
    }
  });
};
