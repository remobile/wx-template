var app = getApp();
app.Page({
    data: {
        poster: '../../resource/images/common/test.jpg',
        name: 'Sugar',
        author: 'Maroon 5',
    },
    audioPlay: function () {
        this.setData({
            action: {
                method: 'play'
            }
        });
    },
    audioPause: function () {
        this.setData({
            action: {
                method: 'pause'
            }
        });
    },
    audioPlaybackRateSpeedUp: function () {
        this.setData({
            action: {
                method: 'setPlaybackRate',
                data: 2
            }
        });
    },
    audioPlaybackRateNormal: function () {
        this.setData({
            action: {
                method: 'setPlaybackRate',
                data: 1
            }
        });
    },
    audioPlaybackRateSlowDown: function () {
        this.setData({
            action: {
                method: 'setPlaybackRate',
                data: 0.5
            }
        });
    },
    audio14: function () {
        this.setData({
            action: {
                method: 'setCurrentTime',
                data: 14
            }
        });
    },
    audioStart: function () {
        this.setData({
            action: {
                method: 'setCurrentTime',
                data: 0
            }
        });
    }
})
