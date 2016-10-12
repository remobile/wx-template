//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        motto: 'Hello World',
        userInfo: {}
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        console.log('onLoad index')
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo){
            //更新数据
            that.setData({
                userInfo:userInfo
            })
        })
    },
    onReady: function() {
        console.log('onReady index')
    },
    onShow: function() {
        console.log('onShow index')
    },
    onHide: function() {
        console.log('onHide index')
    },
    onUnload: function() {
        console.log('onUnload index')
    },
    onPullDownRefresh: function() {
        console.log('onPullDownRefresh index')
    },
})
