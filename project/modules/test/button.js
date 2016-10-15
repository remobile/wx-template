var app = getApp();
var toast = require('../../components/toast.js');
app.Page(toast, {
    onPress() {
        this.showToast('fang');
    },
})
