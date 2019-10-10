// pages/oneyuan/index.js
import {hexMD5} from "../../utils/md5"
const utils = require('../../utils/audios')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        step: null,
        id: 1,
        isPause:'',
    },

    pay() {
        //加密C
        // wx.navigateTo({
        //   url: `/pages/run/index`
        // });
        let stringC = `openId=${wx.getStorageSync('openId')}&${'drPlant'}`;
        console.log(stringC)
        wx.request({
            url: `${app.globalData.url}pay`,
            header: {"Content-Type": "application/x-www-form-urlencoded"},
            method: 'POST',
            data: {
                openId: wx.getStorageSync('openId'),
                sign: hexMD5(stringC)
            },
            success(res) {
                // console.log(res);
                if (res.data.code === '0000'){
                    let data = res.data.result.pay;
                    //调用支付接口
                    wx.requestPayment({
                        'timeStamp': data.timeStamp,
                        'nonceStr': data.nonceStr,
                        'package': data.packageValue,
                        'signType': data.signType,
                        'paySign': data.paySign,
                        success(){
                            wx.showToast({
                                title: '购买成功',
                                icon: 'success',
                                duration: 2000
                            })
                            if (res.data.code=== '0000') {
                                wx.navigateTo({
                                    url:'/pages/run/index'
                                })
                            }else {
                                wx.showToast({
                                    title: '您已经领取过了',
                                    icon: 'none',
                                })
                            }
                        }
                    })
                }else {
                    // console.log(res)
                    wx.showToast({
                        title: res.data.message,
                        icon: 'none',
                    })
                }

            }
        })
    },
    payRun(el){
        // if (el.currentTarget.dataset.index === '2') {
            wx.navigateTo({
                url:'/pages/gorun/index'
            })
        // }else {

        // let stringD = `openId=${wx.getStorageSync('openId')}&stepCount=${wx.getStorageSync('step')}&${'drPlant'}`;
        // console.log(stringD)
        // wx.request({
        //     url:'https://dev.flyh6.cn/donate',
        //     method:'POST',
        //     header: {"Content-Type": "application/x-www-form-urlencoded"},
        //     data:{
        //         openId:wx.getStorageSync('openId'),
        //         stepCount:wx.getStorageSync('step'),
        //         sign: hexMD5(stringD)
        //     },success(res) {
        //         console.log(res)
        //         if (res.data.code === '0000') {
        //             wx.navigateTo({
        //                 url:'/pages/run/index'
        //             })
        //         }else {
        //             wx.showToast({
        //                 title: res.data.message,
        //                 icon: 'none',
        //             })
        //         }
        //     }
        // })

        // }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options)
        this.setData({
            id: options.id,
            step:wx.getStorageSync('step')
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({isPause:utils.audioState(1)})
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})