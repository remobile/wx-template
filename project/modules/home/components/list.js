var app = getApp();
module.exports = function(type) {
    return {
        data: {
            list: [],
            windowHeight: 0,
            windowWidth: 0
        },
        onLoad() {
            this.page = 0;
            this.getList();
        },
        onShow: function(e) {
            this.setData({
                windowHeight: app.system.windowHeight,
                windowWidth: app.system.windowWidth
            })
        },
        pullUpLoad: function (e) {
            this.getList();
        },
        onRowClick(e) {
            var {index} = e.currentTarget.dataset;
            app.navigator.push({
                url: './detail',
                passProps: {
                    item: this.data.list[index],
                }
            });
        },
        getList() {
            if (!this.data.loading) {
                const param = {type, page: ++this.page};
                app.GET(app.route.ROUTE_GET_LIST, param, (list)=>{
                    this.setData({list: this.data.list.concat(list)})
                }, this);
            }
        },
    };
}
