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

const utils = {
    getFullPath,
    removeWhitespace,
    printGreen
}

module.exports = utils
