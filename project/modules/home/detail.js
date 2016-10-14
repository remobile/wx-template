var app = getApp();
app.Page({
    data: {
        id:'',
    },
    onLoad() {
        this.setData({id: this.props.id});
    },
})
