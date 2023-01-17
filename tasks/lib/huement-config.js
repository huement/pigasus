/**
 *  @brief   Core Functions that make this whole project work.
 *  @details Helper functions that parse directories, gather and group functions etc
 *  @link	   https://github.com/huement/mojo
 */

const path = require("path");
const chalk = require("chalk");
const prettyjson = require("prettyjson");

/** ---------[ GLOBAL FUNCTIONS ]------------------------------ **/
module.exports = {
  initConfigs: function (grunt, listOfTasks) {
    /**
     * 1. Loop through the listOfTasks Object
     * 2. [NOT USED] Locate any "pumpkin":true tasks.
     * 3. Add each task's payload to the returned object
     */
    var fileObj;
    var menuTasks = grunt.file.readJSON(path.join(process.cwd(), listOfTasks));
    var savedTasks = {};

    for (var key in menuTasks) {
      fileObj = menuTasks[key];

      //grunt.log.writeln(menuTasks[key].name);

      // Check for 'pumpkin' is present in tasks's Options Object.
      // Determines if Task is loaded and / or shows on the menu.
      // if (fileObj.pumpkin === true && menuTasks[key].pumpkin === true) {
      // }

      savedTasks[key] = {
        name: fileObj.name,
        desc: fileObj.desc,
        value: fileObj.task,
        category: fileObj.category,
      };
    }

    return savedTasks;
  },

  initVars: function (grunt, configData, coreConfig) {
    if (
      coreConfig &&
      coreConfig.server &&
      coreConfig.server.ssl_active === true
    ) {
      grunt.option("loadkey", coreConfig.server.certs.key);
      grunt.option("loadcrt", coreConfig.server.certs.crt);
      grunt.option("loadca", coreConfig.server.certs.ca);
      configData.loadkey = coreConfig.server.certs.key;
      configData.loadcrt = coreConfig.server.certs.crt;
      configData.loadca = coreConfig.server.certs.ca;
    }

    return configData;
  },

  setupPkg: function (grunt, pk, gdb) {
    pk.warPig = {};
    pk.warPig.name = pk.name;
    pk.warPig.version = pk.version;
    pk.warPig.time = Math.floor(Date.now() / 1000);
    pk.warPig.meta = {
      day: '<%= grunt.template.today("dd-mm-yyyy") %>',
      hour: '<%= grunt.template.today("HH:MM") %>',
      banner:
        "/*! <%= pk.warPig.name %> - v<%= pk.warPig.version %> - <%= pk.warPig.meta.day %> <%= pk.warPig.meta.hour %> */\n",
    };

    // Grab the Helper Debug Tasks, as well as user defined tasks
    pk.warPig.taskList = this.initConfigs(grunt, gdb.globalTasks);
    pk.warPig.helpList = this.initConfigs(grunt, gdb.helpItems);

    // Load Static Maps from JSON file
    pk.warPig.statMaps = grunt.file.readJSON(
      path.join(process.cwd(), gdb.staticMaps)
    );

    pk.warPig.dev = gdb.dev;
    pk.warPig.prod = gdb.prod;
    pk.warPig.cache = gdb.cache;
    pk.warPig.env = gdb.env;

    // Make the Package.json + Dynamic data available to all Grunt Tasks
    // Tasks can access via grunt.getConfig("item");
    grunt.option("info", pk.warPig);

    if (grunt.option("verbose")) {
      let options = {
        keysColor: "cyan",
        dashColor: "magenta",
        stringColor: "white",
      };
      grunt.log.writeln(" ");
      grunt.log.writeln("Global Tasks");
      grunt.log.writeln(prettyjson.render(pk.warPig.globalTasks, options));
      grunt.log.writeln(" ");
      grunt.log.writeln("Static Mapped Tasks");
      grunt.log.writeln(prettyjson.render(pk.warPig.statMaps, options));
    }

    return pk;
  },

  stripDirectory: function (file) {
    return file.replace(/.+\/(.+?)>?$/, "$1");
  },

  getDirectory: function (files) {
    var str = files.shift();
    return path.dirname(str);
  },

  debugPrint: function (grunt) {
    /* DEBUG HELPER: Dont clear terminal when verbose */
    if (!grunt.option("verbose")) {
      process.stdout.write("\u001b[2J\u001b[0;0H");
      grunt.log.writeln(" ");
    }

    if (grunt.option("stack")) {
      var options = {
        keysColor: "magenta",
        dashColor: "yellow",
        stringColor: "white",
      };
      grunt.log.writeln(prettyjson.render(grunt.config.getRaw(), options));

      //process.exit(0);
    }
  },

  varDumper: function (grunt, varToDump) {
    var options = {
      keysColor: "rainbow",
      dashColor: "magenta",
      stringColor: "white",
    };

    grunt.log.writeln(" ");

    let dph = chalk.cyanBright("--- DEBUG PRINT ---");

    grunt.log.writeln(dph);
    //grunt.log.writeln(chalk.whiteBright(JSON.stringify(varToDump)));
    grunt.log.writeln(prettyjson.render(varToDump, options));
    grunt.log.writeln(dph);
  },

  /**
   * @brief GruntJS Improved Task Console Logging
   */
  logger: function (grunt) {
    return function (msg) {
      var substrings = [
        "grunt",
        "default",
        "menu",
        "startmenu",
        "menu_header",
        "menu_footer",
        "asciify",
        "prompt",
        "pumpkin_prompt",
        "debug",
        "cat",
      ];
      var defaultcmdstrings = ["availabletasks"];
      var nicemsg = msg.toString().replace(/"/g, "");
      var lilmsg = grunt.task.current.name;
      nicemsg = nicemsg.replace(" task", "").replace("Running ", "");

      if (defaultcmdstrings.indexOf(lilmsg) > -1) {
        // Running Default Task. Show Cool Header

        grunt.log.writeln(
          chalk.bgBlackBright.yellow.bold(
            "▒░  COMMAND  ░▒░  DESCRIPTION                                  ░▒▉▉"
          )
        );
        grunt.log.writeln("");
      } else if (substrings.indexOf(lilmsg) > -1) {
        // Skip header on any user menu tasks.
        // Those tasks provide a great deal more feedback already.
      } else {
        // Standard Grunt Task gets a basic header detailing whats going on.
        grunt.log.writeln("");
        grunt.log.write(chalk.bgGreen.green.bold(" "));
        grunt.log.write(chalk.bgBlack.cyan.bold(" " + nicemsg + " "));
        grunt.log.writeln(chalk.bgGreen.green.bold(" "));
      }
    };
  },
};
