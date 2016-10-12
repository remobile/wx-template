var app = getApp();
app.Page({
    data: {
        times: 0,
        userInfo: {}
    },
    showLogs() {
        app.navigator.push({
            url: '../logs/logs',
        })
    },
    showSettings() {
        app.navigator.push({
            url: '../settings/main',
            passProps: {
                list: [1,2,3],
            }
        });
    },
    updateShowLogTimes() {
        const times = this.data.times+1;
        this.setData({
            times,
        });
    },
    getUserInfo(callback){
        if (app.data.userInfo) {
            callback(app.data.userInfo);
        } else {
            wx.login({
                success: ()=>{
                    wx.getUserInfo({
                        success:  (res)=>{
                            app.data.userInfo = res.userInfo
                            callback(app.data.userInfo);
                        }
                    })
                }
            })
        }
    },
    onLoad() {
        console.log('onLoad index');
        this.getUserInfo((userInfo)=>{
            this.setData({
                userInfo:userInfo
            })
        })
    },
    onReady() {
        console.log('onReady index')
    },
    onShow() {
        console.log('onShow index')
    },
    onHide() {
        console.log('onHide index')
    },
    onUnload() {
        console.log('onUnload index')
    },
    onPullDownRefresh() {
        console.log('onPullDownRefresh index')
    },
})
