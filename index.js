#!/usr/bin/env node
const { program } = require('commander');
const http = require('http');
const fs = require('fs');
const request = require('request');
const path = require('path');
const Alphabet = require('alphabetjs')
const { exec } = require('child_process');
const packageJson = require('./package.json');

const {getPageHtml} =require('./core')
const utils = require('./core/utils')




program
  .version(packageJson.version)
  .description('boss web server')
//   .option('-c, --config', 'config file')
  .parse(process.argv);

// if (program.config) {
//   console.log('当前目录下创建boss.config.json文件');
//   console.log(`
//     {
//         "port": 8888,
//         "pages": [{
//             "router": "/message/exception/listPage",
//             "page": "./pages/message/message_exception_list.html"
//         }]
//     } 
  

//   `);
//   return
// }

const bossConfig = utils.getConfig()
// 获取命令执行的根路径
const rootPath = process.cwd();

if (!bossConfig) {
    return
}

utils.printGreen(
    Alphabet('BOSS WEB','planar')
)

const PORT = bossConfig.port || 8888;
const pages = bossConfig.pages


const server = http.createServer(async (req, res) => {
    // console.log('req.url', req.url)
    const config = pages.find(item => item.router === req.url)
    // console.log('req.url', req.url)
    if (req.url === '/' || req.url === '/index.html') {
        const htmlPath = path.join(__dirname, 'index.html');
        // 读取本地的index.html文件并发送给客户端
        fs.readFile(htmlPath, (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
      } 
    // 如果是/weex开头的请求，访问当前路径下的assets文件夹并返回js文件
    else if (req.url.startsWith('/weex')) {

      const jsFilePath = path.join(rootPath, req.url.replace('/weex', ''));
      // console.log(jsFilePath)
      fs.readFile(jsFilePath, (err, data) => {
          if (err) {
              res.writeHead(404, {'Content-Type': 'text/plain'});
              res.end('Not Found');
              return;
          }
          res.writeHead(200, {'Content-Type': 'application/javascript'});
          res.end(data);
      });
    } 
    else if (config) {
      const htmlStr = await getPageHtml(config.page)
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(htmlStr);
  } else {
        // 转发请求到指定的目标地址
        const targetUrl = 'https://stg-boss-web.weex.tech' + req.url;
        req.pipe(request(targetUrl)).pipe(res);
    }
});

server.listen(PORT, () => {
    utils.printYellow(`Server running on port http://localhost:${PORT}/`);
});

// 监听当前文件夹的文件变化
fs.watch('.', { recursive: true }, (eventType, filename) => {
    console.log(`${filename} file changed`);
  
    // 文件发生变化时重启服务器
    restartServer();
  });
  
  // 重启服务器
  function restartServer() {
    // console.log('Restarting server...');
  
    // 关闭服务器
    server.close(() => {
        utils.printGreen('Server restarted')
  
      // 重新执行命令
      exec('weex-boss', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });
    });
  }