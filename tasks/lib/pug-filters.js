/*jshint esversion: 6 */
var prism = require("jstransformer")(require("jstransformer-prismjs"));
var highlight = require("jstransformer")(require("jstransformer-highlight"));
var scss = require("jstransformer")(require("jstransformer-scss"));
var markdown = require("jstransformer")(require("jstransformer-markdown-it"));

var pugFilters = (module.exports = {
  codeblock: function (block, option) {
    const lang = option.lang || "html";
    const cName = option.class || "";
    const prevC = option.preClass || "";

    let fClass = "documentation-content" + " " + cName;

    let escaped = "";
    if (lang === "html") {
      escaped = `<div class="preview-wrapper"><div class="mojo-preview ${prevC}">${block}</div></div>`;
    }

    let highlightBlock = highlight.render(block, { language: lang }).body;

    // prettier-ignore
    let highlighted = `<div class='mojo-highlight'><pre class="code" data-lang="${lang}"><code>${highlightBlock}</code></pre></div>`;

    let ex = "<span class='mojo-doclabel'>EXAMPLE</span>";

    let htmlTemplate =
      "<div class='mojo-docblock'>" + ex + escaped + highlighted + "</div>";

    let final = "<div class='" + fClass + "'>" + htmlTemplate + "</div>";

    return final;
  },
  prismify: function (block, options) {
    const lang = options.lang || "html";
    let render = prism.render(block, { language: lang }).body;

    // prettier-ignore
    let results = "<pre class='code' data-lang='" + lang + "'><code>" + render + "</code></pre>";
    return results;
  },
  highlightify: function (block, options) {
    let lang = options.lang || "html";
    let oc = options.class || "";
    let render = highlight.render(block, { language: lang }).body;

    // prettier-ignore
    let results = "<pre class='code " + oc + "' data-lang='" + lang + "'><code>" + render + "</code></pre>";
    return results;
  },
  scssify: function (scssBlock, options) {
    // Compile SCSS to CSS
    let cssResults = scss.render(scssBlock).body;
    let preCode = true;

    // Lets Highlight them!
    if (options.highlight) {
      cssResults = highlight.render(cssResults, { language: "css" }).body;
      scssBlock = highlight.render(scssBlock, { language: "scss" }).body;
    } else if (options.prism) {
      cssResults = prism.render(cssResults, { language: "css" }).body;
      scssBlock = prism.render(scssBlock, { language: "scss" }).body;
      preCode = false;
    }

    let scssPre = `<pre data-lang="scss"><code>${scssBlock}</code></pre>`;
    let cssPre = `<pre data-lang="css"><code>${cssResults}</code></pre>`;
    if (!preCode) {
      scssPre = `${scssBlock}`;
      cssPre = `${cssResults}`;
    }

    let scssLabel = (cssLabel = "");
    if (options.label) {
      scssLabel = "<p class='mojo-docblock-label'>Uncompiled SCSS</p>";
      cssLabel = "<p class='mojo-docblock-label'>Compiled CSS</p>";
    }

    let scssTitle = "";
    if (options.title) {
      scssTitle = `<h3 class="mojo-docblock-title">${options.title}</h3>`;
    }

    let scssCodeBlock = `<div class='mojo-docblock split'>${scssTitle}<div class="mojo-code-scss">${scssLabel}${scssPre}</div><div class='mojo-code-css'>${cssLabel}${cssPre}</div></div>`;

    return scssCodeBlock;
  },
  markdownify: function (block, options) {
    let markdownBlock = markdown.render(block).body;
    return markdownBlock;
  },
  iconify: function (block, options) {
    let label =  "<p class='icon-label'>"+block+"</p>";
    let render =  "<div></div>";
  }
});
