//logs.js
var util = require('../../utils/util.js')
Page({
    data: {
        logs: []
    },
    onLoad: function () {
        console.log('onLoad log')
        this.setData({
            logs: (wx.getStorageSync('logs') || []).map(function (log) {
                return util.formatTime(new Date(log))
            })
        })
    },
    onReady: function() {
        console.log('onReady log')
    },
    onShow: function() {
        console.log('onShow log')
    },
    onHide: function() {
        console.log('onHide log')
    },
    onUnload: function() {
        console.log('onUnload log')
    },
    onPullDownRefresh: function() {
        console.log('onPullDownRefresh log')
    },
})
