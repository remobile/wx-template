var app = getApp();
app.Page({
    data:{
        animationData:{}
    },
    onStart(){
        var animation = wx.createAnimation({
            duration:1000,
            timingFunction:"ease",
        })
        this.animation = animation
        animation.scale(2,2).rotate(45).step();
        this.setData({
            animationData:animation.export()
        })
        setTimeout(()=>{
            animation.translate(30).step();
            this.setData({
                animationData:animation.export()
            })
        },1000)
    },
    rotateAndScale() {
        // 旋转同时放大
        this.animation.rotate(45).scale(2, 2).step()
        this.setData({
            animationData:animation.export()
        })
    },
    rotateThenScale() {
        // 先旋转后放大
        this.animation.rotate(45).step()
        this.animation.scale(2, 2).step()
        this.setData({
            animationData:animation.export()
        })
    },
    rotateAndScaleThenTranslate() {
        // 先旋转同时放大，然后平移
        this.animation.rotate(45).scale(2, 2).step()
        this.animation.translate(300, 300).step({ duration: 1000 })
        this.setData({
            animationData:animation.export()
        })
    }
})
