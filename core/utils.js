const path = require('path');


function getFullPath(p) {
    return path.join(__dirname.replace('/core', ''), p);
}

function removeWhitespace(str) {
    if (!str) return ''
    return str.replace(/\s/g, '');
}

function printGreen(message) {
    console.log('\x1b[32m%s\x1b[0m', message);
}
// 打印黄色文本
function printYellow(text) {
    console.log('\x1b[33m' + text + '\x1b[0m');
}

// 打印红色文本
function printRed(text) {
    console.log('\x1b[31m' + text + '\x1b[0m');
}

const utils = {
    getFullPath,
    removeWhitespace,
    printGreen,
    printYellow,
    printRed
}

module.exports = utils
