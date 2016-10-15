var app = getApp();
app.Page({
    data: {
        comments_list: [],
    },
    onLoad() {
        this.setData({item: this.props.item});
        this.getCommmetList();
    },
    getCommmetList() {
        if (!this.data.loading) {
            const param = {id: this.props.item.id};
            app.GET('http://localhost:3000/getCommentList', param, (list)=>{
                this.setData({comments_list: this.data.comments_list.concat(list)})
            }, this);
        }
    },
})
