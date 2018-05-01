#!/usr/bin/env node

const program = require('commander');
const jsdom = require('jsdom');
const pkg = require('./package.json');
const Readability = require('readability');

const { JSDOM } = jsdom;

const jsdomConsole = new jsdom.VirtualConsole();

// Suppress these errors for now
jsdomConsole.on('jsdomError', () => {});

const options = {
  features: {
    FetchExternalResources: false,
    ProcessExternalresources: false,
  },
  virtualConsole: jsdomConsole,
};

const readability = (dom) => {
  // Happens on missing file
  if (!dom) return;
  const article = new Readability(dom.window.document).parse();

  if (!article) {
    console.error('Error: Readability returned nothing. This usually happens on empty input');
    return;
  }
  console.log('<h1>', article.title, '</h1>', article.content);
};

const isURL = (str) => {
  const regex = new RegExp('^https?:\\/\\/');
  return regex.test(str);
};

const handleError = err => console.error(err.toString());

const run = (sources) => {
  const promises = sources.map(source =>
    (isURL(source) ?
      JSDOM.fromURL(source, options).catch(handleError) :
      JSDOM.fromFile(source, options).catch(handleError)
    ));
  Promise.all(promises).then((doms) => {
    doms.forEach(readability);
  })
    .catch(err => console.error(err.toString()));
};

program
  .version(pkg.version)
  .arguments('[sources...]')
  .description('Parses each source with Readability and prints cleaned HTML to stdout. source can be a file path or URL.')
  .action(run)
  .parse(process.argv);

if (program.args.length === 0) {
  if (!process.stdin.isTTY) {
    JSDOM.fromFile('/dev/stdin', options).then(readability).catch(handleError);
  } else {
    program.outputHelp();
  }
}
