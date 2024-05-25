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

function handleJsStr(str) {
    str = utils.removeWhitespace(str);
    str = str.replace(/"js"/, "js")
    str = str.replace(/'js'/, "js")
    str = str.replace(/`js`/, "js")
    return str
}
function handleCssStr(str) {
    str = utils.removeWhitespace(str);
    str = str.replace(/"css"/, "css")
    str = str.replace(/'css'/, "css")
    str = str.replace(/`css`/, "css")
    return str
}

async function getCssConfig(s) {

    let str = handleCssStr(s)
    let regex = /css:\s*\[([^\]]*)\]/;

    let match = str.match(regex);
    let obj = {
        css: []
    }
    return new Promise((resolve, reject) => {
        if (match) {
            const ret = match[1].trim()
            if (!ret) {
                return obj
            }
            try {

                const arr = JSON.parse(`[${ret}]`)
                obj.css = arr
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

async function getJsConfig(s) {

    let str = handleJsStr(s)
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
    console.log("===html")
    console.log(str)
    let ret = ''
    const stack = []
    let index = 0
    // 第一个括号结束
    let firstBracketEnd = false
    // 第一个函数的花括号开始 
    let firstFunctionBeginsWithCurlyBrackets = false
    try {
        while (true) {
            const char = str[index]
            ++index
                // console.log('extractHtml', str[index], stack)
            if (firstFunctionBeginsWithCurlyBrackets) {
                ret += char
            }
            if (char === '(') {
                stack.push(char)
            } else if (char === '{') {
                stack.push(char)
                if (firstBracketEnd) {
                    firstFunctionBeginsWithCurlyBrackets = true
                }
            } else if (char === ")") {
                // console.log('pop)', stack.slice(-1)?.[0] === '(')
                if (stack.slice(-1)?.[0] === '(') {
                    stack.pop()
                    firstBracketEnd = true
                } else {
                    stack.push(char)
                }
            } else if (char === "}") {
                // console.log('pop}', char,stack, stack.slice(-1)?.[0] === '{')
                if (stack.slice(-1)?.[0] === '{') {
                    stack.pop()
                    if (stack.length === 0) {
                        break
                    }
                } else {
                    stack.push(char)
                }
            }
        }

    } catch (error) {
        console.log(error)
    }

    // 定义正则表达式
    // const regex = /@layout\([^)]*\){([^@]*)@/;

    // 使用正则表达式进行匹配
    // let match = str.match(regex);
    // console.log(ret.trim().slice(0, -2))

    // 输出匹配到的内容
    // if (match) {
    //     return match[1].trim();
    // }

    return ret.trim().slice(0, -2)
}

function getJsScript(url) {
    const ret = `<script src="/weex${url}"></script>`
    return ret
}
function getCssScript(url) {
    const ret = `<link href="${url}" rel="stylesheet" type="text/css" />`
    return ret
}

async function getCssHtml(str) {
    const cssConfig = await getCssConfig(str);
    let ret = ''
    const arr = cssConfig.css
    for (let i = 0; i < arr.length; i++) {
        const url = arr[i];
        ret += getCssScript(url)
    }
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
    const cssHtml = await getCssHtml(data)
    return `
        ${startTemplate(cssHtml)}    

        ${content}

        ${middleTemplate}

        ${jsHtml}

        ${endTemplate}

    `;
}

module.exports = {
    getPageHtml,
    getJsConfig,
    getCssConfig,
    extractHtml
}