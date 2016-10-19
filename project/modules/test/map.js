var app = getApp();
app.Page({
    data: {
        markers: [{
            latitude: 23.099994,
            longitude: 113.324520,
            name: 'T.I.T 创意园',
            desc: '我现在的位置'
        }],
        covers: [{
            latitude: 23.099794,
            longitude: 113.324520,
            icaonPath: '../../resource/images/common/point.png',
            rotate: 10
        }, {
            latitude: 23.099298,
            longitude: 113.324129,
            iconPath: '../../resource/images/common/point.png',
            rotate: 90
        }]
    }
})
