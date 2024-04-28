#!/usr/bin/env node
const { program } = require('commander');
const utils = require('./core/utils')
console.log('Hello, CLI world!');
// const chalk = require('chalk');  


utils.printGreen(
    `================\n`+
    `=   BOSS WEB   =\n`+
    `================\n`
)

program
  .version('1.0.0')
  .description('boss web server')
  .option('-d, --dev', 'start server for development')
  .parse(process.argv);

if (program.dev) {
  console.log('Hello, CLI world!');
}