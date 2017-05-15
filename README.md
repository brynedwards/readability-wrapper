# readability-wrapper

A wrapper to use [Firefox Reader View][2] in the terminal.

## Why

Many websites do not optimise for viewing in terminal web browsers: for example, opening a
[New Statesman article][1] in Lynx produces ~180 lines for the menu, which
means multiple page downs are required to get to the article. Doing this for
every news article is tedious.  Passing the page through a clean-up script
such as the one used by [Firefox Reader View][2] will remove this clutter
and provide us with just the content.

## Install

Install globally:

```
yarn global add readability-wrapper
```

or

```
npm install -g readability-wrapper
```

## Usage

`readability` takes a single argument, a URL, and prints cleaned HTML to stdout.
It is intended to be used with other tools. For example, as a pager for
[Newsbeuter][3]:

```
#!/bin/sh
readability "$1" | pandoc -f html -t plain | less
```

Only tested with Node.js v7.10.0.


[1]: //www.newstatesman.com/politics/brexit/2017/05/there-new-consensus-germany-brexit-should-be-clean-and-britain-should-pay-it
[2]: //github.com/mozilla/readability
[3]: //www.newsbeuter.org
