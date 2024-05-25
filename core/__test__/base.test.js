import { test, assert, expect, describe, it } from "vitest"
const { getJsConfig, extractHtml } = require('../handleHTML');

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



test('测试js参数提取', async () => {
    // 断言 add 函数的输出是否符合预期
    for (let item of data) {
        let result = await getJsConfig(item.raw);
        assert.equal(JSON.stringify(result), item.expected);
    }
});

const data1 = [
     `
    @layout("/common/_form.html",{js:["/assets/message/inner_message_detail.js"]}){
        <style>
            .layui-form-label {
                width: 65px;
            }
        
            .layui-input-block {
                margin-left: 95px;
            }
        </style>
        <form class="layui-form" id="innerMessageForm" lay-filter="innerMessageForm">
            <div class="layui-fluid" style="padding-bottom: 75px;">
                <input name="id" type="hidden"/>
                <div class="layui-form-item layui-row">
                    <div class="layui-inline layui-col-md12">
                        <label class="layui-form-label">推送类型<span style="color: red;">*</span></label>
                        <div class="layui-input-block" style="display: flex;align-items: center">
                            <span>站内信消息推送</span>
                        </div>
                    </div>
        
                    <div class="layui-inline layui-col-md12">
                        <label class="layui-form-label">通知标题<span style="color: red;">*</span></label>
                        <div class="layui-input-block">
                            <input id="title" name="title" placeholder="请输入不超过30字的通知标题" type="text"
                                   class="layui-input" lay-verify="required" required disabled/>
                        </div>
                    </div>
        
                    <div class="layui-inline layui-col-md12">
                        <label class="layui-form-label">推送模式<span style="color: red;">*</span></label>
                        <div class="layui-input-block">
                            <input type="radio" name="pushMode" value="0" lay-filter="modeFilter" title="全终端推送" checked
                                   disabled>
                            <input type="radio" name="pushMode" value="1" lay-filter="modeFilter" title="精准推送" disabled>
                            <input type="radio" name="pushMode" value="2" lay-filter="modeFilter" title="自然流量" checked
                                   disabled>
                            <input type="radio" name="pushMode" value="3" lay-filter="modeFilter" title="代理" disabled>
                        </div>
                    </div>
        
                    <div class="layui-inline layui-col-md12" id="userIdDom" style="display: none;">
                        <label class="layui-form-label">用户UID<span style="color: red;">*</span></label>
                        <div class="layui-input-block">
                            <textarea id="uid" placeholder="请输入用户UID，以英文','分割" class="layui-textarea"
                                      disabled></textarea>
                            <button type="button" class="layui-btn demo-class-accept" id="uploadUID" style="margin-top: 8px;">
                                <i class="layui-icon layui-icon-upload"></i>
                                上传用户UID
                            </button>
                        </div>
                    </div>
                    <div class="layui-inline layui-col-md12" id="proxyIdDom" style="display: none;">
                        <label class="layui-form-label">代理UID<span style="color: red;">*</span></label>
                        <div class="layui-input-block">
                            <textarea id="proxyUid" placeholder="请输入代理UID，以英文','分割" class="layui-textarea"
                                      disabled></textarea>
                            <button type="button" class="layui-btn demo-class-accept" id="uploadUID" style="margin-top: 8px;">
                                <i class="layui-icon layui-icon-upload"></i>
                                上传代理UID
                            </button>
                        </div>
                    </div>
        
                    <div class="layui-inline layui-col-md12" id="proxyIdDom" style="display: none;">
                        <label class="layui-form-label">代理UID<span style="color: red;">*</span></label>
                        <div class="layui-input-block">
                            <textarea id="proxyUid" placeholder="请输入代理UID，以英文','分割" class="layui-textarea"
                                      disabled></textarea>
                            <button type="button" class="layui-btn demo-class-accept" id="uploadUID" style="margin-top: 8px;">
                                <i class="layui-icon layui-icon-upload"></i>
                                上传代理UID
                            </button>
                        </div>
                    </div>
        
                    <div class="layui-inline layui-col-md12">
                        <label class="layui-form-label">语言<span style="color: red;">*</span></label>
                        <div class="layui-input-block">
                            <div id="language">
                                <input type="checkbox" value="1" lay-filter="languageFilter" title="简体中文"
                                       lay-skin="primary" disabled>
                                <input type="checkbox" value="5" lay-filter="languageFilter" title="繁体中文"
                                       lay-skin="primary" disabled>
                                <input type="checkbox" value="0" lay-filter="languageFilter" title="英文" lay-skin="primary"
                                       disabled>
                                <input type="checkbox" value="3" lay-filter="languageFilter" title="韩文" lay-skin="primary"
                                       disabled>
                            </div>
                            <div style="margin: 8px 0 0;background: #aaaaaa35;padding: 8px;display: none;" id="languageCNDom">
                                <div>简体中文</div>
                                <hr/>
                                <div class="layui-inline layui-col-md12">
                                    <label class="layui-form-label" style="width: 40px">
                                        标题<span style="color: red;">*</span>
                                    </label>
                                    <div class="layui-input-block" style="margin-left: 70px">
                                        <input id="languageCNTitle" placeholder="请输入不超过30字的标题" type="text"
                                               class="layui-input" disabled/>
                                    </div>
                                </div>
                                <div class="layui-inline layui-col-md12">
                                    <label class="layui-form-label" style="width: 40px">
                                        内容<span style="color: red;">*</span>
                                    </label>
                                    <div class="layui-input-block" style="margin-left: 70px;background: white;">
                                        <textarea id="languageCNContent" placeholder="通知内容" maxlength="1000"
                                                  class="layui-textarea" disabled></textarea>
                                    </div>
                                </div>
                            </div>
                            <div style="margin: 8px 0 0;background: #aaaaaa35;padding: 8px;display: none;" id="languageCNTWDom">
                                <div>繁体中文</div>
                                <hr/>
                                <div class="layui-inline layui-col-md12">
                                    <label class="layui-form-label" style="width: 40px">
                                        标题<span style="color: red;">*</span>
                                    </label>
                                    <div class="layui-input-block" style="margin-left: 70px">
                                        <input id="languageCNTWTitle" placeholder="请输入不超过30字的标题" type="text"
                                               class="layui-input" disabled/>
                                    </div>
                                </div>
                                <div class="layui-inline layui-col-md12">
                                    <label class="layui-form-label" style="width: 40px">
                                        内容<span style="color: red;">*</span>
                                    </label>
                                    <div class="layui-input-block" style="margin-left: 70px;background: white;">
                                        <textarea id="languageCNTWContent" placeholder="通知内容" maxlength="1000"
                                                  class="layui-textarea"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div style="margin: 8px 0 0;background: #aaaaaa35;padding: 8px;;display: none;" id="languageENDom">
                                <div>英文</div>
                                <hr/>
                                <div class="layui-inline layui-col-md12">
                                    <label class="layui-form-label" style="width: 40px">
                                        标题<span style="color: red;">*</span>
                                    </label>
                                    <div class="layui-input-block" style="margin-left: 70px">
                                        <input id="languageENTitle" placeholder="请输入不超过30字的标题" type="text"
                                               class="layui-input" disabled/>
                                    </div>
                                </div>
                                <div class="layui-inline layui-col-md12">
                                    <label class="layui-form-label" style="width: 40px">
                                        内容<span style="color: red;">*</span>
                                    </label>
                                    <div class="layui-input-block" style="margin-left: 70px;background: white;">
                                        <textarea id="languageENContent" placeholder="通知内容" maxlength="1000"
                                                  class="layui-textarea"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div style="margin: 8px 0 0;background: #aaaaaa35;padding: 8px;display: none;" id="languageKODom">
                                <div>韩文</div>
                                <hr/>
                                <div class="layui-inline layui-col-md12">
                                    <label class="layui-form-label" style="width: 40px">
                                        标题<span style="color: red;">*</span>
                                    </label>
                                    <div class="layui-input-block" style="margin-left: 70px">
                                        <input id="languageKOTitle" placeholder="请输入不超过30字的标题" type="text"
                                               class="layui-input" disabled/>
                                    </div>
                                </div>
                                <div class="layui-inline layui-col-md12">
                                    <label class="layui-form-label" style="width: 40px">
                                        内容<span style="color: red;">*</span>
                                    </label>
                                    <div class="layui-input-block" style="margin-left: 70px;background: white;">
                                        <textarea id="languageKOContent" placeholder="通知内容" maxlength="1000"
                                                  class="layui-textarea"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        
                    <div class="layui-inline layui-col-md12">
                        <label class="layui-form-label">发送类型<span style="color: red;">*</span></label>
                        <div class="layui-input-block">
                            <input type="radio" name="sendType" value="1" lay-filter="sendTypeFilter" title="立即发送" checked
                                   disabled>
                            <input type="radio" name="sendType" value="2" lay-filter="sendTypeFilter" title="定时发送" disabled>
                        </div>
                    </div>
        
                    <div class="layui-inline layui-col-md12" id="sendDateDom" style="display: none;">
                        <label class="layui-form-label">发送日期<span style="color: red;">*</span></label>
                        <div class="layui-input-block">
                            <input id="planTime" type="text" class="layui-input" placeholder="发送日期时间" autocomplete="off"
                                   disabled>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        
        @}
    `,
    
]

describe('测试html提取', async () => {
    // 断言 add 函数的输出是否符合预期
    it('case 1', async () => {
        let result = await extractHtml(data1[0]);
        expect(JSON.stringify(result)).toMatchSnapshot(); // 生成快照并比较
    })
});



