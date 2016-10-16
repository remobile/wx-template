var app = getApp();
var toast = require('../../components/toast.js');
app.Page({tabbar: 'button'}, toast, {
    data: {
        onPress: 'onPress',
        count: 0,
    },
    onLoad(options) {
        console.log("onLoad button");
    },
    onReady() {
        console.log("onReady button");
    },
    onShow() {
        console.log("onShow button");
    },
    onHide() {
        console.log("onHide, button");
    },
    onUnload() {
        console.log("onUnload button");
    },
    updateCount() {
        this.setData({count: this.data.count+1});
    },
    onPress() {
        app.navigator.push(
            {
                url: './button2',
                passProps: {
                    updateCount: this.updateCount
                }
            }
        );
    },

})
