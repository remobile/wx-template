'use strict';

var Des = {
    encrypt: (text, key, callback)=>callback(text),
    decrypt: (code, key, callback)=>callback(code),
};
var KEY = CONSTANTS.DES_KEY;
var app = getApp();

module.exports = (url, parameter, success, failed, wait)=>{
    console.log("send:", url, parameter);
    if (typeof failed === 'boolean') {
        wait = failed;
        failed = null;
    }
    if (wait) {
        app.showWait();
    }
    Des.encrypt(JSON.stringify(parameter), KEY, (base64)=>{
        var param = base64;
        wx.request({
            url,
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'text/plain'
            },
            data: param
        }, success(res) {
            var base64 = res.data;
            //console.log("base64:",base64);
            success && Des.decrypt(base64, KEY, (jsonString)=>{
                var json = {};
                try {
                    json = JSON.parse(jsonString);
                } catch (error) {
                    if (!failed || !failed(error)) {
                        app.Toast('JSON解析错误');
                        console.log(url+ ":JSON解析错误");
                        if (wait) {
                            app.dismissWait();
                        }
                    }
                }
                console.log("recv:", json);
                if (wait) {
                    app.dismissWait();
                }
                success(json);
            }, ()=>{
                if (!failed || !failed()) {
                    app.Toast('数据解密错误');
                    console.log(url+ ":数据解密错误");
                    if (wait) {
                        app.dismissWait();
                    }
                }
            });
        }, fail(error) {
            if (!failed || !failed(error)) {
                app.Toast('网络错误');
                console.log(url+ ":网络错误");
                if (wait) {
                    app.dismissWait();
                }
            }
        });
    }, ()=>{
        if (!failed || !failed()) {
            app.Toast('数据加密错误');
            if (wait) {
                app.dismissWait();
            }
        }
    });
}
