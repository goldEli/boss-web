const path = require('path');
const fs = require('fs');
 // 获取命令执行的根路径
const rootPath = process.cwd();

function getFullPath(p) {
    return path.join(rootPath, p);
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

function fileExists(filePath) {
    try {
        // 使用 fs.accessSync() 方法来检查文件是否存在
        fs.accessSync(filePath, fs.constants.F_OK);
        return true; // 如果文件存在，则返回true
    } catch (err) {
        // 如果文件不存在或者无法访问，则会抛出异常
        return false;
    }
}


function getConfig() {
   
    // 构建配置文件路径
    const configPath = path.join(rootPath, 'boss.config.json');
    
    try {
        // 读取配置文件
        const configData = fs.readFileSync(configPath, 'utf8');
        // 解析 JSON 格式的配置数据
        const config = JSON.parse(configData);
        return config;
    } catch (error) {
        // printRed('boss.config.json 读取配置文件出错:');
        configWarning()
        console.error(error)
        return null;
    }
}

function configWarning() {
    printRed('boss.config.json 配置文件不存在或者配置错误，请先配置')
    printYellow('当前目录下创建boss.config.json文件');
    console.log(`
      {
          "port": 8888,
          "pages": [{
              "router": "/message/exception/listPage",
              "page": "./pages/message/message_exception_list.html"
          }]
      } 
    `);
}


const utils = {
    getFullPath,
    removeWhitespace,
    printGreen,
    printYellow,
    printRed,
    getConfig,
    configWarning,
    fileExists
}

module.exports = utils
