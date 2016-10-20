var app = getApp();
var {moment, _} = global;
app.Page({
    title: 'fang',
    onLoad() {
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
    onShowVideo() {
        app.navigator.push({
            url: 'video',
            title: '视频',
        });
    },
})
