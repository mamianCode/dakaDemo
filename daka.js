const axios = require('axios');
const fs = require('fs');
const md5 = require('md5');
const puppeteer = require('puppeteer');
const path = require('path');
const {
    isArray,
    isString
} = require('util');

async function sendWebHook(webhook, data){
    if (isArray(webhook)) {
        for (var hook of webhook) {
            axios.post(hook, data).then(function (response) {
                console.log("webhook推送：", response.statusText);
                return true;
            }).catch(function (error) {
                console.log("webhook推送失败：", error.statusText);
                return false;
            });
        }
    } else {
        if (isString(webhook)) {
            axios.post(webhook, data).then(function (response) {
                console.log("webhook推送：", response.statusText);
                return true;
            }).catch(function (error) {
                console.log("webhook推送失败：", error.statusText);
                return false;
            });
        }
    }
}
async function rxydaka(){
    var uname='mamian';
    var passwd='271247';
    var rxy_namepath = '#txtUserName2';
    var rxy_passwdpath = '#txtPassword2';
    (async () => {
        const browser = await puppeteer.launch({
//            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.setViewport({
            width: 1827,
            height: 979
        });
        await page.goto('http://rongxueyuan.yunxuetang.cn/homepage_rongpage.htm');
        var data = {
            "msgtype": "text",
            "text": {
                "content": "mamian daka test"
            }
        };
        var webhook='https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=580aeb16-4008-4abf-9519-12cff4a91a92';
        await sendWebHook(webhook, data);
        await page.type(rxy_namepath, uname);
        await page.type(rxy_passwdpath, passwd);
        await page.click('#btnLogin2');
        await page.waitForNavigation({
            waitUntil: 'load'
        });

        await browser.close();
    })();
}
var arguments = process.argv.splice(2);
var param = {}
for (var arg of arguments) {
    var arr = arg.toString().split("=");
    var key = arr[0].replace('--', '');
    param[key] = arr[1]
}
if (!param) {
    console.log('需传入参数，node img_push.js --type=kb --notice=hhr --uname=mamian --passwd=mamian --debug=0')
}
 if (param['type'] == 'daka') {
    rxydaka();
}
