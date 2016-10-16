var app = getApp();
app.Page({tabbar: 'test'}, {
    data: {
        list: [
            {title: 'personal', url: '../test/personal'},
            {title: 'toast', url: '../test/toast'},
        ]
    },
    onRowClick(e) {
        var {index} = e.currentTarget.dataset;
        var item = this.data.list[index];
        app.navigator.push({
            url: item.url
        });
    },
})
