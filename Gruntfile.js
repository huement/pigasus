/**

      ;l;.          l'                   .lx,  .;'               ..                  .'ckKo.
      ;KWNKOdl;..    WKxc'.               ;KNc  cNO.            .cO0l.            .'codkXNk.
      cNXo:lx0XKOxol:XNNXK0kdoc;''..      ,KWl  '0K, ':'       .oNNx.        ..;lodoc,.,kx'
    .xWO'   ..;codk0dNNx,,:loxkkOOkkxd:  ;XNc   oNo.oNXx,     ;KWO''c.',;cldOXOc'.     .
    '0Wo           ..dNXc      ...;xXKd  lNK,   '00 .oXWXx,   lNNo cXOxdol;c0Wo
    :XX:    ..       .xNK:     ':oOkc.  .xWx.    cK. .oNNNXd'.lNNl  ,l.    .OWo
    .dWO.  .xKKOkxddx  .kWK; .:xkko,     ;KNc     .oc  .xNNXNKoxNNl         ,KN:
    '0Wl   ,0WKocokKX   'ON0xkd;.       .dWk.      .Kl. '0WOoONNNNx.        :N0'
    lNK,   .kWXkddl:'  .;ONW0;          ;KX:        xXx. cXNc'dNNNK,        dWx.
   .OWd. .:dKWXl.    ;oOXKKNXd,...      kNo.        ,kNO;.xWO'.lKNNd.      .kWo
   :XXl:dkdl0WK,   -;0Okkxk0NNKOOOkdl:'.NO.  .':looddxkOk;:XNc  :KWX:      .ONl
  .kWX0x:. .dOl.     .     ,0WO;',;cdk00Ndcodddlc,'.      .kWO.  cXWO'     .kWo
  :XNk,     ;;'            .o0l.      .;Xko;..             cXNc  .dNXo      cNO.
  ;o;.      .'             .;'          '                  .c;,.  .''.      .c0c

*/

/**
  GRUNT @TODO LIST
  ==================================================
  @TODO Image Tasks: imagemin, grunticon
  @TODO PostCSS Tasks
  @TODO Color Tasks: Palettable>>>
  @TODO Documentation Generation [???]
  @TODO HTML Tasks: Handlebars, MD2HTML, HTMLBuild, Twig
  @TODO PROD Tasks: minify, uglify, zip etc
  @TODO AMP: npmjs.com/package/grunt-amp-optimizer
  @TODO https://www.npmjs.com/package/grunt-svg2png-colorfy-fix
  @TODO Github Pages https://github.com/tschaub/grunt-gh-pages
*/

var path = require("path");

module.exports = function (grunt) {
  if (
    grunt.option("target") != "menu" &&
    grunt.option("target") != "default" &&
    grunt.option("target") != undefined
  ) {
    require("time-grunt")(grunt);
  }

  var pk = grunt.file.readJSON(path.join(process.cwd(), "/package.json"));
  var gdb = grunt.file.readJSON(path.join(process.cwd(), "/gdb.json"));

  var huiGrunt = require(path.join(
    process.cwd(),
    gdb.taskDir + "/lib/huement-config.js"
  ));

  let pkg = huiGrunt.setupPkg(grunt, pk, gdb);

  // SubTask Console Output Configs / Overrides
  grunt.log.header = huiGrunt.logger(grunt);

  // ENVIRONEMNT CHECK
  let targetMode = grunt.option("target");
  if (targetMode !== false && targetMode !== undefined)
    pk.warPig.environmental = targetMode;
  else
    pk.warPig.environmental = "dev";

  //console.log(pk);

  // let npath = path.join(process.cwd(), "node_modules");
  // console.log(npath);

  // JustInTime [JIT] Grunt
  require("load-grunt-config")(grunt, {
    // path to all grunt subtasks
    configPath: path.join(process.cwd(), gdb.taskDir),
    overridePath: path.join(process.cwd(), gdb.binDir),
    init: true,
    data: pkg.warPig, // data passed into config. Can use with <%= test %>
    jitGrunt: { staticMappings: pkg.warPig.statMaps },
    packageJsonPath: path.join(process.cwd(), "package.json"),
  });

  huiGrunt.debugPrint(grunt);
  //console.log(grunt.config.get("dev"));
};
