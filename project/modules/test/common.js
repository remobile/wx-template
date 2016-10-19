var app = getApp();
var {moment, _} = global;
app.Page({
    onLoad() {
        console.log(this.data);
        app.personal.event.addListener('USER_HEAD_CHANGE_EVENT', (info)=>{
            this.toast(info.url);
        })
    },
    onTestWait() {
        this.showWaiting();
        setTimeout(this.hideWaiting, 3000);
    },
    onTestToast() {
        this.toast('fang');
    },
    onTestLodash() {
        console.log(_.random());
    },
    onTestMoment() {
        console.log(moment());
    },
    onTestEvent() {
        app.personal.updateHead('http://localhost:3000/1.png');
    },
})
