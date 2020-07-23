**This isn't maintained, use one of these instead**

- https://github.com/NightMachinary/readability-cli
- https://gitlab.com/gardenappl/readability-cli

---

**readability-wrapper**

A CLI wrapper for [Mozilla's Readability][1].

Requires Node.js. I usually use the latest version (10.0.0 as of writing).

## Install

To install globally with [yarn][2]: `yarn global add readability-wrapper`

To install globally with npm: `npm install -g readability-wrapper`

## Usage

`readability` takes one or more arguments and parses each with Readability. Arguments can be either file paths or URLs.
Cleaned HTML is printed to stdout.

`readability` will parse piped input if there are no arguments.


## Examples

Parse a file: `readability index.html`

Parse a URL: `readability https://example.com`

Pipe cURL output: `curl https://example.com | readability`

Mix file paths and URLs: `readability file1.html https://example.com/`

[1]: //github.com/mozilla/readability
[2]: //yarnpkg.com/en/
