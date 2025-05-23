const path = require('path');
const fs = require('fs');
// const clipboardy = require('clipboardy');
 // 获取命令执行的根路径
const rootPath = process.cwd();


async function readClipboard() {
//   const text = await clipboardy.read();
  console.log(text);
//   return new Promise((resolve, reject) => {
//     ncp.copy('some text', function () {
//         // complete...
//       })
//   })
  return text
}

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
        return {
            port: 8888,
            proxy: 'https://stg-boss-web.weex.tech', 
            script: `
            <script type="text/javascript">
                var Feng = {
                    ctxPath: "",
                    version: '20220111'
                };
            </script>

            <script type="text/javascript" rel="preload" src="/assets/expand/plugins/jquery/jquery-3.2.1.min.js?v=20220111"></script>
            <script type="text/javascript" src="/assets/expand/plugins/jquery/jquery.i18n.js?v=20220111"></script>
            <script type="text/javascript" src="/assets/common/libs/layui/layui.js?v=20220111"></script>
            <script type="text/javascript" rel="preload" src="/assets/common/js/common.js?v=20220111"></script>
            `,
            header: `
            <meta charset="utf-8"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
            <title>管理系统</title>
            <link rel="stylesheet" href="/assets/common/libs/layui/css/layui.css?v=20220111"/>
            <link rel="stylesheet" href="/assets/common/module/admin.css?v=20220111" media="all"/>
            <link rel="stylesheet" href="/assets/expand/css/style.css?v=20220111" media="all"/>
            `,
            ...config,
        };
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
    fileExists,
    readClipboard
}

module.exports = utils
