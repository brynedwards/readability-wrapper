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

features = { FetchExternalResources: false,
             ProcessExternalresources: false }

(
process.argv.length === 3 ? 
	JSDOM.fromURL(process.argv[2], {
		features: features
	}) :
!process.stdin.isTTY ?
	JSDOM.fromFile("/dev/stdin", {
		features: features
	}) :
(console.error("Please provide a URL"), process.exit(1)))
.then(dom => {
  const uri = url.parse(dom.window.location.href);
  const article = new Readability(uri, dom.window.document).parse();
  console.log("<h1>", article.title, "</h1>", article.content);
});
