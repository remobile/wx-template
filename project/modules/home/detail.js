var app = getApp();
app.Page({
    data: {
        comments_list: [],
    },
    onLoad() {
        const {author, avatar, content, image, likes, comments} = this.props.data;
        this.setData({author, avatar, content, image, likes, comments});
        this.getCommmetList();
    },
    getCommmetList() {
        if (!this.data.loading) {
            const param = {id: this.props.data.id};
            app.GET('http://localhost:3000/getCommentList', param, (list)=>{
                this.setData({comments_list: this.data.comments_list.concat(list)})
            }, this);
        }
    },
})
