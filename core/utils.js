const path = require('path');
const fs = require('fs');


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


function getConfig() {
    // 获取命令执行的根路径
    const rootPath = process.cwd();
    // 构建配置文件路径
    const configPath = path.join(rootPath, 'boss.config.json');
    
    try {
        // 读取配置文件
        const configData = fs.readFileSync(configPath, 'utf8');
        // 解析 JSON 格式的配置数据
        const config = JSON.parse(configData);
        return config;
    } catch (error) {
        printRed('boss.config.json 读取配置文件出错:');
        console.error(error)
        return null;
    }
}


const utils = {
    getFullPath,
    removeWhitespace,
    printGreen,
    printYellow,
    printRed,
    getConfig
}

module.exports = utils
