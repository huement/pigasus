/**
 *   @brief   Run webpack from grunt
 *   @details webpack-grunt offers two different tasks webpack and webpack-dev-server. Both support all webpack options
 *   @link    https://www.npmjs.com/package/grunt-webpack
 */

const webpackConfig = require("./webpack.config.js");

module.exports = {
  myConfig: webpackConfig,
};
