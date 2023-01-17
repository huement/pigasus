/**
 *	@brief   Tasks created here will be an alias for one or more other tasks.
 *  @details Whenever this "alias task" is run, every specified tasks in taskList will be run
 *  @link    https://gruntjs.com/creating-tasks
 */

const chalk = require("chalk");

module.exports = function (grunt, options) {
  // Generate Aliases based on Grunt JIT taskList
  let aliases = {};
  let il;
  let taskAry;
  let taskList = options.taskList;

  // Tasklist is created from the cmds.json file
  for (il in taskList) {
    //grunt.log.writeln(il);
    if (taskList[il].name) {
      taskAry = taskList[il].value.split(",");
      aliases[taskList[il].name] = taskAry;
    }
  }

  // Custom GruntJS Tasks
  aliases.changelog = ["changelogcustomizable", "bumpup"];
  aliases.scss = ["cat", "dart-sass:mojo", "buildnumber"];
  aliases.pages = [
    "cat",
    "page-data",
    "pug",
    "copy:docs",
    "browserify:docs",
    "buildnumber",
  ];
  aliases.mdpages = ["pages", "md2html"];

  if (grunt.option("verbose")) {
    grunt.log.writeln(chalk.cyanBright("======== | ALIASES | ========"));
    grunt.log.writeln(chalk.greenBright(JSON.stringify(aliases, null, 4)));
  }

  return aliases;
};
