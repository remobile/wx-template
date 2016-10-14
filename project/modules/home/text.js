var app = getApp();
var GET;
Page({
    data: {
        list: [],
        loading: false,
        windowHeight: 0,
        windowWidth: 0
    },
    onLoad() {
        this.page = 0;
        const param = {type: 'text', page: this.page};
        app.GET('http://localhost:3000/getList', param, (data)=>{
            this.setData({list: data.list});
        }, this);
    },
    onShow: function(e) {
        this.setData({
            windowHeight: app.system.windowHeight,
            windowWidth: app.system.windowWidth
        })
    },
    pullUpLoad: function (e) {
        const param = {type: 'text', page: ++this.page};
        app.GET('http://localhost:3000/getList', param, (data)=>{
            this.setData({list: this.data.list.concat(data.list)})
        }, this);
    },
})
