module.exports = {
    showToast(text, duration=3000) {
        this.setData({toastIsShowing: true, toastText: text});
        setTimeout(()=>{
            this.setData({toastIsShowing: false});
        }, duration)
    },
}
