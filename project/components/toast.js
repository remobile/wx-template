module.exports = {
    Toast(text, duration=3000) {
        this.setData({toastIsShowing: true, toastText: text});
        setTimeout(()=>{
            this.setData({toastIsShowing: false});
        }, duration)
    },
}
