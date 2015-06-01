#!/usr/bin/env node

var program = require('commander');
var pkg = require('../package.json');

program
  .version(pkg.version)
  .command('last', 'prints the last commit id')
  .parse(process.argv);
