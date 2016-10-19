var app = getApp();
app.Page({tabbar: 'test'}, {
    data: {
        list: [
            {title: 'personal', url: '../test/personal'},
            {title: 'toast', url: '../test/common'},
            {title: 'image', url: '../test/image'},
            {title: 'video', url: '../test/video'},
            {title: 'audio', url: '../test/audio'},
            {title: 'map', url: '../test/map'},
            {title: 'canvas', url: '../test/canvas'},
            {title: 'swiper', url: '../test/swiper'},
            {title: 'picker', url: '../test/picker'},
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
