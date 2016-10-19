var app = getApp();
app.Page({
    data:{
        src:"http://www.w3school.com.cn//i/movie.mp4"
    },
    bindButtonTap:function(){
        var that = this;
        wx.chooseVideo({
            sourceType:['album','camera'],
            maxDuration:60,
            camera:['front','back'],
            success:function(res){
                console.log(res);
                that.setData({
                    src:res.tempFilePaths[0]
                })
            }
        })
    },
    videoErrorCallback: function (e) {
        this.toast('视频错误信息:'+e.detail.errMsg);
    }
})
