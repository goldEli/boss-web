// checkVersion.js

const { execSync } = require('child_process');
const { version } = require('../package.json');

// 检查是否是最新版本
function checkLatestVersion() {
    const installedVersion = version;
    const latestVersion = execSync('npm show weex-boss version').toString().trim();
    // console.log('最新版本:', latestVersion);
    if (installedVersion === latestVersion) {
        // console.log('已经是最新版本！');
    } else {
        utils.printYellow(`有新版本可用${latestVersion}！请及时更新`);
        utils.printYellow(`使用命令 "npm install -g weex-boss" 进行更新`);
    }
}

checkLatestVersion()