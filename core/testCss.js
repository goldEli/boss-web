const assert = require('assert');
const {getCssConfig} = require('./handleHTML');

const data = [
    // base case
    {
        raw: '@layout("/common/_form.html",{js:["/assets/activity/operate_activity_add.js"],css:["/assets/expand/module/formSelects/formSelects-v4.css"]}){',
        expected: '{"css":["/assets/expand/module/formSelects/formSelects-v4.css"]}'
    },
    // // "js"
    // {
    //     raw: '@layout("/common/_container.html",{"js":["/assets/message/message_exception_list.js"]})',
    //     expected: '{"js":["/assets/message/message_exception_list.js"]}'
    // },
    // // 'js
    // {
    //     raw: `@layout("/common/_container.html",{'js':["/assets/message/message_exception_list.js"]})`,
    //     expected: '{"js":["/assets/message/message_exception_list.js"]}'
    // },
    // // remove space
    // {
    //     raw: ` @layout("/common/_container.html ",{  js  :  [   "/assets/message/message_exception_list.js"]})`,
    //     expected: '{"js":["/assets/message/message_exception_list.js"]}'
    // },
    // // remove space
    // {
    //     raw: '@layout( "/common/_container.html",{ js :[ "/assets/message/message_exception_list.js"]} )',
    //     expected: '{"js":["/assets/message/message_exception_list.js"]}'
    // },
]

async function testExtractContent() {
    for (let item of data) {
        let result = await getCssConfig(item.raw);
        assert.strictEqual(JSON.stringify(result), item.expected);
    }

    console.log('Test passed successfully!');
}

testExtractContent();