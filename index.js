const postcss = require("postcss");

const pattern = /(\d+)\/(\d+)?px/g;

module.exports = postcss.plugin("postcss-px2em", px2em);

function px2em (opts) {
  return (root, result) => {
    root.walkRules((rules) => {
      eachDecl(rule, (decl) => {
        if (decl.value.indexOf("/px") === -1) {
          return;
        }
        decl.value = decl.value.replace(
          pattern,
          resolvePx.bind(this, rule)
        );
      })
    });
  }
}