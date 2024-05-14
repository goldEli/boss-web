#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const Alphabet = require('alphabetjs')
const nodemon = require('nodemon');
// const packageJson = require('./package.json');
const utils = require('./core/utils')
const updateHTML = require('./core/updateHTML')
const { version } = require('./package.json');
// const execSync = require('child_process').execSync;


// 创建一个新的进程来执行版本检测
// const checkVersionProcess = execSync(`node ${path.resolve(__dirname, './core/checkVersion.js')}`);

// checkVersionProcess.stdout.on('data', (data) => {
//     console.log(data.toString());
// });

program
  .version(version)
  .description('boss web server')
  .option('-m, --menu', '更新菜单')
  .parse(process.argv);
  const options = program.opts();
  if (options.menu) {
    updateHTML()
    return
  }


const bossConfig = utils.getConfig()
// 获取命令执行的根路径


if (!bossConfig) {
  return
}

utils.printGreen(
  Alphabet('BOSS WEB', 'planar')
)


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


// setTimeout(() => {
//   checkLatestVersion()
// })

