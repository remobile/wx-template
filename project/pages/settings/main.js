var app = getApp();

app.Page({
    data: {
        list: [],
    },
    onLoad() {
        this.setData({
            list: this.props.list,
        });
    },
})
