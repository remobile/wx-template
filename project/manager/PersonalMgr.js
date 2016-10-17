var {EventEmitter} = global;

class Manager {
    constructor() {
        this.event = new EventEmitter();
    }
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
    updateHead(url) {
        this.event.emit('USER_HEAD_CHANGE_EVENT', {url:url});
    }
}

module.exports = Manager;
