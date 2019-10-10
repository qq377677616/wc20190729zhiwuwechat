// pages/gorun/index.js
import {hexMD5} from "../../utils/md5";
const app = getApp()
const utils = require('../../utils/audios')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        step: null,
        isPause: ''
    },

    //捐步数
    payRun() {
        //加密串
        let stringD = `openId=${wx.getStorageSync('openId')}&stepCount=${wx.getStorageSync('step')}&${'drPlant'}`;
        // console.log(stringD)
        wx.request({
            url: `${app.globalData.url}donate`,
            method: 'POST',
            header: {"Content-Type": "application/x-www-form-urlencoded"},
            data: {
                openId: wx.getStorageSync('openId'),
                stepCount: wx.getStorageSync('step'),
                sign: hexMD5(stringD)
            }, success(res) {
                // console.log(res)
                //成功后跳转优惠券
                if (res.data.code === '0000') {
                    wx.navigateTo({
                        url: '/pages/run/index'
                    })
                } else {
                    //返回错误信息
                    wx.showToast({
                        title: res.data.message,
                        icon: 'none',
                    })
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        //背景音乐控件
        this.setData({isPause: utils.audioState(1)});
        //设置步数
        this.setData({
            step: wx.getStorageSync('step')
        })
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