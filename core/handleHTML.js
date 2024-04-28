const fs = require('fs').promises;
const utils = require('./utils')
const { startTemplate, middleTemplate, endTemplate } = require('./htmlTemplate')

async function readHTMLFile(filePath) {

    try {
        const data = await fs.readFile(utils.getFullPath(filePath), 'utf8');
        return data; // 返回文件内容
    } catch (err) {
        throw err; // 抛出错误信息
    }
}

function handleStr(str) {
     str = utils.removeWhitespace(str);
     str = str.replace(/"js"/, "js")
     str = str.replace(/'js'/, "js")
     str = str.replace(/`js`/, "js")
     return str
}


async function getJsConfig(s) {

    let str = handleStr(s)
    let regex = /js:\s*\[([^\]]*)\]/;

    let match = str.match(regex);
    let obj = {
        js: []
    }
    return new Promise((resolve, reject) => {
        if (match) {
            const ret = match[1].trim()
            if (!ret) {
               return obj 
            }
            try {
                
                const arr = JSON.parse(`[${ret}]`)
                obj.js = arr
                resolve(obj)
            } catch (error) {
                console.log(error)
                resolve(obj)
            }
        } else {
            resolve(obj)
        }
    })
}

async function extractHtml(str) {

    // 定义正则表达式
    const regex = /@layout\([^)]*\){([^@]*)@/;

    // 使用正则表达式进行匹配
    let match = str.match(regex);

    // 输出匹配到的内容
    if (match) {
        return match[1].trim();
    }

    return ''
}

function getJsScript(url) {
    const ret = `<script src="/weex${url}"></script>`
    return ret
}

async function getJsHtml(str) {
    const jsConfig = await getJsConfig(str);
    let ret = ''
    const arr = jsConfig.js
    for (let i = 0; i < arr.length; i++) {
        const url = arr[i];
        ret += getJsScript(url)
    }
    return ret
}

async function getPageHtml(filePath) {
    const data = await readHTMLFile(filePath);
    const content = await extractHtml(data);
    const jsHtml = await getJsHtml(data);
    return `
        ${startTemplate}    

        ${content}

        ${middleTemplate}

        ${jsHtml}

        ${endTemplate}

    `;
}

module.exports = {
    getPageHtml,
    getJsConfig
}