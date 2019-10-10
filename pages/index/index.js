//index.js
//获取应用实例
const app = getApp()
import {hexMD5} from "../../utils/md5"

const mta = require('../../utils/mta_analysis');
const utils = require('../../utils/audios')

Page({
    data: {
        isUser: false,
        isPause: '',
        show: false,
        animationData: {},
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    //事件处理函数
    // bindViewTap: function() {
    //   wx.navigateTo({
    //     url: '../logs/logs'
    //   })
    // },
    participate() {
        //切换视图
        // let stu = this.getLogin()
        // this.getRunData()

        var that = this
        let stu = false
        wx.showLoading({
            mask: true,
            title: '加载中',
        })
        let stuk = true
        wx.login({
            success(res) {
                //加密串
                let stringA = `code=${res.code}&${'drPlant'}`;
                // console.log('stringa',stringA)
                // console.log(res)

                //获取登录信息
                wx.request({
                    method: 'POST',
                    header: {"Content-Type": "application/x-www-form-urlencoded"},
                    url: `${app.globalData.url}wxAuth`,
                    data: {code: res.code, sign: hexMD5(stringA)},
                    success(res) {
                        stu = true

                        // that._getUserInfo()
                        // code = res.data.code
                        // console.log(res)
                        // console.log(res.data.result)
                        wx.setStorageSync('isCheckIn', res.data.result.isCheckIn)
                        //存入登录信息到storage
                        wx.setStorageSync('openId', res.data.result.openId)
                        wx.setStorageSync('sessionKey', res.data.result.sessionKey)
                        //步数解密
                        console.log('stu2')
                        that.getRunData()
                        stuk = false
                    },

                })

            },

        })
        // console.log(wx.getStorageSync('step').length)
        if (wx.getStorageSync('step').length === 0 && wx.getStorageSync('openId').length > 0 && stuk) {
            console.log('stu1')
            wx.hideLoading()
            wx.getSetting({
                success(res) {
                    console.log(res)
                    // let isAuth = false
                    // for (let item in res.authSetting) {
                    //     console.log(item['scope.werun'])
                    //     isAuth = true
                    // }
                    // wx.openSetting({
                    //     success(res) {
                    //         console.log(111)
                    //     }
                    // })
                    if (!res.authSetting['scope.werun']) {
                        // that.getRunData()
                        // wx.openSetting({})
                        wx.openSetting({
                            success(res) {
                                // console.log(11)
                                if (res.authSetting['scope.werun']) {
                                    wx.showLoading({
                                        mask: true,
                                        title: '加载中',
                                    })
                                    that.getRunData()
                                }
                                // else if (res.authSetting['scope.userInfo']) {
                                //     that.getRunData()
                                // }
                            }
                        })
                    }

                    // if (!isAuth) {
                    //     // if (wx.getStorageSync('openId').length < 1) {
                    //     //     that.setData({
                    //     //         show: true
                    //     //     })
                    //     //     that.getLogin()
                    //     // } else {
                    //     //     that.getLogin()
                    //     // }
                    // }
                }
            })
            // wx.showModal({
            //     title: '提示',
            //     content: '请授权获',
            //     success(res) {
            //         // console.log(res.confirm)
            //         if (res.confirm) {
            //             wx.openSetting({
            //                 success(res) {
            //                     if (res.authSetting['scope.werun']) {
            //                         that.getRunData()
            //                     } else if (res.authSetting['scope.userInfo']) {
            //                         that.getRunData()
            //                     }
            //                 }
            //             })
            //         }
            //     }
            // })
        }
        // wx.getSetting({
        //     success(res) {
        //         console.log(res)
        //         if (!res.authSetting['scope.werun'] || !res.authSetting['scope.userInfo']) {
        //             wx.showModal({
        //                 title: '提示',
        //                 content: '请授权获',
        //                 success(res) {
        //                     // console.log(res.confirm)
        //                     if (res.confirm) {
        //                         wx.openSetting({
        //                             success(res) {
        //                                 if (res.authSetting['scope.werun']) {
        //                                     that.getRunData()
        //                                 } else if (res.authSetting['scope.userInfo']) {
        //                                     that.getRunData()
        //                                 }
        //                             }
        //                         })
        //                     }
        //                 }
        //             })
        //         } else {
        //             console.log(wx.getStorageSync('isCheckIn'))

        //         }
        //     }
        // })
        // if (!wx.getStorageSync('isCheckIn')) {
        //     wx.navigateTo({
        //         url: '/pages/form/index'
        //     })
        // }
        // }else {
        //     wx.navigateTo({
        //         url: '/pages/boost/index'
        //     })
        // }
    },
    _getUserInfo(e) {

        if (wx.getStorageSync('isuserInfo') !== 'ok') {
            console.log(e)
            if (e.detail.errMsg.indexOf('ok') >= 0) {
                this.setData({
                    show: false,
                })
                wx.setStorageSync('userInfo', JSON.parse(e.detail.rawData))
                wx.setStorageSync('isuserInfo', 'ok')
                this.setData({
                    isUser: true
                })

            } else {

            }

        } else {
            this.participate()
        }
    },
    onShow() {

        console.log()
        this.setData({isPause: utils.audioState(1)})
        console.log()
    },
    getRunData() {
        wx.getWeRunData({
            success(res) {
                // console.log(res)
                //加密串
                let stringB = `encryptedData=${res.encryptedData}&iv=${res.iv}&sessionKey=${wx.getStorageSync('sessionKey')}&${'drPlant'}`
                // console.log('stringB',stringB)
                wx.request({
                    method: 'POST',
                    header: {"Content-Type": "application/x-www-form-urlencoded"},
                    url: `${app.globalData.url}decryptWeiRun`,
                    data: {
                        sessionKey: wx.getStorageSync('sessionKey'),
                        encryptedData: res.encryptedData,
                        iv: res.iv,
                        sign: hexMD5(stringB)
                    },
                    success(res) {
                        console.log(res)
                        wx.setStorageSync('step', res.data.result.step)


                        if (!wx.getStorageSync('isCheckIn')) {
                            wx.navigateTo({
                                url: '/pages/form/index'
                            })
                        } else {
                            wx.navigateTo({
                                url: '/pages/boost/index'
                            })
                        }
                        wx.hideLoading()
                        console.log(res.data.result)
                    },

                })
            },
            fail(res) {
                wx.hideLoading()
            }
        })
    },
    getLogin() {
        var that = this
        var code = null
        wx.login({
            success(res) {
                //加密串
                let stringA = `code=${res.code}&${'drPlant'}`;
                // console.log('stringa',stringA)

                //获取登录信息
                wx.request({
                    method: 'POST',
                    header: {"Content-Type": "application/x-www-form-urlencoded"},
                    url: `${app.globalData.url}wxAuth`,
                    data: {code: res.code, sign: hexMD5(stringA)},
                    success(res) {

                        code = res.data.code
                        console.log(res.data.result)
                        wx.setStorageSync('isCheckIn', res.data.result.isCheckIn)
                        //存入登录信息到storage
                        wx.setStorageSync('openId', res.data.result.openId)
                        wx.setStorageSync('sessionKey', res.data.result.sessionKey)
                        //步数解密
                        that.getRunData()
                    }
                })

            }
        })
        // return code
    },
    //生命周期函数 只会执行一次
    onLoad: function () {
        mta.Page.init()
        // console.log(wx.getStorageSync('isuserInfo'))
        // var that = this
        console.log(wx.getStorageSync('openId').length, wx.getStorageSync('step'))
    },
})
