//app.js
const mta = require('/utils/mta_analysis');
App({
    onLaunch: function () {
        this.backAudio();
        console.log('xxx',mta)
        mta.App.init({
            "appID": "500682171",
            "eventID": "500682172",
            "autoReport": true,
            "statParam": true,
            "ignoreParams": [],
            "statPullDownFresh": true,
            "statShareApp": true,
            "statReachBottom": true
        });
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    backAudio() {
        this.globalData.backgroundAudioManager = wx.getBackgroundAudioManager()

        this.globalData.backgroundAudioManager.title = '此时此刻'
        this.globalData.backgroundAudioManager.epname = '此时此刻'
        this.globalData.backgroundAudioManager.singer = '许巍'
        this.globalData.backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
// 设置了 src 之后会自动播放
        this.globalData.backgroundAudioManager.src = 'https://dev.flyh6.cn/music.mp3'

        this.globalData.backgroundAudioManager.onEnded(() => {
            console.log('播放结束');
            this.backAudio()
        })
    },
    globalData: {
        userInfo: null,
        url: 'https://m01.drplant.com.cn/'
    }
})