class Manager {
    login(callback) {
        wx.login({
            success: ()=>{
                wx.getUserInfo({
                    success: (res)=>{
                        this.info = res.userInfo;
                        callback && callback(this.info);
                    }
                })
            }
        })
    }
}

module.exports = Manager;
