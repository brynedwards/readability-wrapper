#!/usr/bin/env node

const url = require('url');

const jsdom = require('jsdom');
const pkg = require('./package.json');
const Readability = require('readability');

const { JSDOM } = jsdom;

// Stops Readability parse errors.
global.Node = {
  ELEMENT_NODE: 1,
  TEXT_NODE: 3
};

if(process.argv.length < 3) {
    return console.error("Please provide a URL");
}

JSDOM.fromURL(process.argv[2], {
  features: {
    FetchExternalResources: false,
    ProcessExternalresources: false
  }
})
.then(dom => {
  const uri = url.parse(dom.window.location.href);
  const article = new Readability(uri, dom.window.document).parse();
  console.log("<h1>", article.title, "</h1>", article.content);
});
