#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const Alphabet = require('alphabetjs')
const nodemon = require('nodemon');
const utils = require('./core/utils')
const updateHTML = require('./core/updateHTML')
const updateHTMLAgency = require('./core/updateHTMLAgency')
const updater = require('pkg-updater');
const pkg = require('./package.json');

utils.printGreen(
  Alphabet('BOSS WEB', 'planar')
)

updater({
  'pkg': pkg,
  // 自定义 registry
  'registry': 'https://registry.yarnpkg.com/',
  // 自定义请求的 dist-tag，默认是 latest
  // 'tag': 'next',
  // 自定义检查间隔，默认是 1h
  'checkInterval': 24 * 60 * 60 * 1000,
  // 自定义更新提示信息
  'updateMessage': '请务必更新到最新版本! package update from <%=current%> to <%=latest%>.',
  // 自定义强制更新的版本更新级别，默认是 major
  'level': 'minor'
}).then(() => {
  main()
});

function main() {

  program
    .version(pkg.version)
    .description('boss web server')
    .option('-m, --menu', '更新菜单')
    .option('-am, --agency-menu', '更新agency菜单')
    .parse(process.argv);
  const options = program.opts();
  if (options.menu) {
    updateHTML()
    return
  }

  if (options.agencyMenu) {
    updateHTMLAgency()
    return
  }


  const bossConfig = utils.getConfig()
  // 获取命令执行的根路径


  if (!bossConfig) {
    return
  }




  // console.log('Restarting server...');
  const indexPath = path.resolve(__dirname, 'server.js')
  // 使用 nodemon 监听文件改变
  nodemon({
    script: indexPath, // 启动的脚本文件，可以根据你的实际情况修改
    ext: 'js json html css', // 监听的文件后缀名，根据你的实际情况修改
    ignore: ['node_modules/*'] // 忽略的文件夹
  });

  nodemon.on('restart', function () {
    console.log('Server restarted due to file change');
  });

  nodemon.on('quit', function () {
    console.log('App has quit');
    process.exit();
  });

  nodemon.on('error', function (err) {
    console.log(err);
  });
}



// setTimeout(() => {
//   checkLatestVersion()
// })

