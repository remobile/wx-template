var app = getApp();
var toast = require('../../components/toast.js');
var {moment, _} = global;
app.Page(toast, {
    onLoad() {
        app.personal.event.addListener('USER_HEAD_CHANGE_EVENT', (info)=>{
            this.Toast(info.url);
        })
    },
    onTestToast() {
        this.Toast('fang');
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
