var app = getApp();
var util = require('../../utils/util.js')
app.Page({
    data: {
        logs: []
    },
    onLoad: function (options) {
        this.setData({
            logs: (wx.getStorageSync('logs') || []).map(function (log) {
                return util.formatTime(new Date(log))
            })
        });
    },
    onReady() {
        console.log('onReady log')
        app.navigator.getParentRoute().updateShowLogTimes();
    },
    onShow() {
        console.log('onShow log')
    },
    onHide() {
        console.log('onHide log')
    },
    onUnload() {
        console.log('onUnload log')
    },
    onPullDownRefresh() {
        console.log('onPullDownRefresh log')
    },
})
