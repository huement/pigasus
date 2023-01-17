/**
 *   @brief   Testing Blah Blah
 *   @details Put some info here about stuff blah blah
 *   @link    https://github.com/link-to-repo
 */
module.exports = {
  options: {
    // Task-specific options go here.
    stderr: true,
  },
  logo: {
    command: "node tasks/logo.js",
  },
  iconizr: {
    command: "cli/bin/iconizr.phps source_code/media/icons/mono/arrows -o source_code/media/icon --sassout source_code/styles/tokens/icon --css --sass --verbose --width 100 --height 100 -k"
  },
  fontblast: {
  	command: "font-blast mojo.svg outputsvgs/"
  }
};
