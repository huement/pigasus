//
//     ██████╗ ██╗   ██╗ ██████╗         ██╗███████╗
//     ██╔══██╗██║   ██║██╔════╝         ██║██╔════╝
//     ██████╔╝██║   ██║██║  ███╗        ██║███████╗
//     ██╔═══╝ ██║   ██║██║   ██║   ██   ██║╚════██║
//     ██║     ╚██████╔╝╚██████╔╝██╗╚█████╔╝███████║
//     ╚═╝      ╚═════╝  ╚═════╝ ╚═╝ ╚════╝ ╚══════╝
// ══════  ═══════   ═══ ═══   ═══════════ ════ ════════  ════════ ══════
//
//   IMPORTANT:
//   This file controls what .pug files get transformed into .html
//   however, there is another file, tasks/lib/pug-filters.js that
//   plays an important role, as that loads in any js-transformer
//   plugins or custom functions.
//

module.exports = function (grunt, options) {
  return {
    mojo_pages: {
      options: {
        pretty: true,
        processName: function (filename) {
          return filename.toUpperCase();
        },
        data: function (dest, src) {
          const envMode = grunt.config.get("environmental");
          return {
            debug: true,
            timestamp: "<%= grunt.template.today() %>",
            require: require,
            superClass: "plume",
            envData: grunt.config.get(envMode),
          };
        },
        filters: require("./lib/pug-filters.js"),
      },
      files: [
        {
          expand: true,
          cwd: '<%= grunt.config.get("dev.pages") %>/',
          src: ["*.pug", "!_*.pug"],
          dest: '<%= grunt.config.get("prod.pages") %>',
          ext: ".html",
        },
      ],
    },
  };
};
