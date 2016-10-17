'use strict';

function json2Form(json) {
    var str = [];
    for(var p in json){
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
    }
    return str.join("&");
}

module.exports = (url, param, success, failed, waitPage)=>{
    var app = getApp();
    console.log("send:", url, param);
    if (typeof failed !== 'function') {
        waitPage = failed;
        failed = null;
    }
    if (waitPage) {
        waitPage.setData({loading: true});
    }
    wx.request({
        url: url+'?'+json2Form(param),
        method: 'GET',
        header: {
            'Accept': 'application/json',
            "Content-Type": "application/x-www-form-urlencoded"
        },
        success: (res)=>{
            var data = res.data;
            console.log("recv:", data);
            if (waitPage) {
                waitPage.setData({loading: false});
            }
            success && success(data);
        }, fail: (error)=>{
            if (!failed || !failed(error)) {
                waitPage.Toast && waitPage.Toast('网络错误');
                console.log(url+ ":网络错误");
                if (waitPage) {
                    waitPage.setData({loading: false});
                }
            }
        }
    });
}
