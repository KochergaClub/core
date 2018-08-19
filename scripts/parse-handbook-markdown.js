var unified = require('unified');
var markdown = require('remark-parse');
const remarkCustomBlocks = require('remark-custom-blocks');
const shortcodes = require('remark-shortcodes');

const fs = require("fs");
const data = fs.readFileSync("/dev/stdin", "utf-8");

var tree = unified()
  .use(markdown)
  .use(remarkCustomBlocks, {
    description: {
      classes: 'description',
    },
    box: {
      classes: 'box',
    },
    exercise: {
      classes: 'exercise',
    },
  })
  .use(shortcodes, {startBlock: "[[", endBlock: "]]"})
  .parse(data);

console.log(JSON.stringify(tree, null, 2));