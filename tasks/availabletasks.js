/**
 * AvailableTasks
 * @Author: Derek Scott <derek@huement.com>
 * @Date:   2021-04-14 20:06:39
 * @Desc:   This is an important file. It controls what tasks are listed when you
 *          run the standalone "grunt" task, or when the "grunt menu" is ran.
 */

const chalk = require("chalk");
const _ = require("lodash");
const path = require("path");
const gdb = require("../gdb.json");

module.exports = function (grunt, options) {
  let cmdFile = path.resolve(process.cwd(), gdb.globalTasks);
  let taskDesc = require(cmdFile);

  let descs = {};
  taskDesc.forEach(function (value, index) {
    let tName = value.name;
    descs[tName] = value.desc;
  });
  // browserify: "Node.js in the browser",
  // mojo: "build mode.continuously reload and integrate.",
  // liveCSS: "SCSS to CSS task with Watch + BrowserSync",
  // livePug: "PUG templates to HTML automatic compilation via Watch",
  // scss: "Use Dart-SASS to compile SCSS templates",
  // publish: "Prep code for git commit and push up release build",

  return {
    tasks: {
      options: {
        showTasks: ["user"],
        filter: "exclude",
        tasks: [
          "availabletasks",
          "default",
          "asciify",
          "menu",
          "config",
          "debug",
          "stack",
          "verbose",
          "idk",
          "help",
          "run",
          "cat",
        ],
        descriptions: descs,
        reporter: function (options) {
          var meta = options.meta,
            task = options.currentTask,
            targets = "";

          if (meta.header && meta.groupCount) {
            console.log("  " + chalk.green.bold(task.group) + "\n");
          }

          if (task.targets.length >= 1) {
            targets = "(" + task.targets.join("|") + ")";
          }

          console.log(
            "  " + chalk.green.bold(_.padEnd(task.name, meta.longest)),
            chalk.cyan.bold(_.pad(task.type, 4)),
            chalk.blue.bold(task.info),
            chalk.magenta.bold(targets)
          );
        },
      },
    },
  };
};
