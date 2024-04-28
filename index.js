#!/usr/bin/env node
const { program } = require('commander');
const utils = require('./core/utils')
const http = require('http');
const fs = require('fs');
const request = require('request');
const path = require('path');
const http = require('http');
const fs = require('fs');
const request = require('request');
const path = require('path');
// const bossConfig = require('./boss.config')
const {getPageHtml} =require('./core')


utils.printGreen(
    `================\n`+
    `=   BOSS WEB   =\n`+
    `================\n`
)

program
  .version('1.0.0')
  .description('boss web server')
//   .option('-d, --dev', 'start server for development')
  .parse(process.argv);

// if (program.dev) {
//   console.log('Hello, CLI world!');
// }

const PORT = bossConfig.port || 8888;
const pages = bossConfig.pages


const server = http.createServer(async (req, res) => {
    // console.log('req.url', req.url)
    const config = pages.find(item => item.router === req.url)
    console.log('req.url', req.url)
    if (req.url === '/' || req.url === '/index.html') {
        // 读取本地的index.html文件并发送给客户端
        fs.readFile('index.html', (err, data) => {
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

      const jsFilePath = path.join(__dirname, req.url.replace('/weex', ''));
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
    console.log(`Server running on port ${PORT}`);
});