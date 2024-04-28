const assert = require('assert');
const {getJsConfig} = require('./handleHTML');

const data = [
    // base case
    {
        raw: '@layout("/common/_container.html",{js:["/assets/message/message_exception_list.js"]})',
        expected: '{"js":["/assets/message/message_exception_list.js"]}'
    },
    // "js"
    {
        raw: '@layout("/common/_container.html",{"js":["/assets/message/message_exception_list.js"]})',
        expected: '{"js":["/assets/message/message_exception_list.js"]}'
    },
    // 'js
    {
        raw: `@layout("/common/_container.html",{'js':["/assets/message/message_exception_list.js"]})`,
        expected: '{"js":["/assets/message/message_exception_list.js"]}'
    },
    // remove space
    {
        raw: ` @layout("/common/_container.html ",{  js  :  [   "/assets/message/message_exception_list.js"]})`,
        expected: '{"js":["/assets/message/message_exception_list.js"]}'
    },
    // remove space
    {
        raw: '@layout( "/common/_container.html",{ js :[ "/assets/message/message_exception_list.js"]} )',
        expected: '{"js":["/assets/message/message_exception_list.js"]}'
    },
]

async function testExtractContent() {
    for (let item of data) {
        let result = await getJsConfig(item.raw);
        assert.strictEqual(JSON.stringify(result), item.expected);
    }

    console.log('Test passed successfully!');
}

testExtractContent();