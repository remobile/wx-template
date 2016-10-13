var app = getApp();
Page({
    data: {
        avatar: '',
        username: '',
        sex: '',
        address: '',
    },
    onLoad() {
        app.personal.login((info)=>{
            this.setData({
                avatar: info.avatarUrl,
                username: info.nickName,
                sex: info.gender===1?'帅哥':'美女',
                address: info.province + ' ' +info.city,
            });
        });
    },
})
