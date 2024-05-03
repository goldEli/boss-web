#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const request = require('request');
const path = require('path');

const { getPageHtml } = require('./core')
const utils = require('./core/utils')
const rootPath = process.cwd();
const bossConfig = utils.getConfig()



const PORT = bossConfig.port || 8888;
const pages = bossConfig.pages


const server = http.createServer(async (req, res) => {
    const config = pages.find(item => item.router === req.url?.split('?')?.[0])
    // console.log('req.url', req.url, req.url?.split('?')?.[0],config)
    
    // console.log('req.url', req.url)
    if (req.url === '/' || req.url === '/index.html') {
        // prefer to obtain the local index.html file first.
        let htmlPath = path.join(rootPath, 'index.html');
        if (!utils.fileExists(htmlPath)) {
            htmlPath = path.join(__dirname, 'index.html');
        }
        // 读取本地的index.html文件并发送给客户端
        fs.readFile(htmlPath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
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
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(data);
        });
    }
    else if (config) {
        const htmlStr = await getPageHtml(config.page)
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlStr);
    } else {
        // 转发请求到指定的目标地址
        const targetUrl = 'https://stg-boss-web.weex.tech' + req.url;
        
        req.pipe(request(targetUrl)).pipe(res);
    }
});


server.listen(PORT, () => {
    utils.printYellow(`Server running on port http://localhost:${PORT}/`);
    // watchFiles()
});
