// pages/run/index.js
const utils = require('../../utils/audios')
Page({

  /**
   * 页面的初始数据
   */
  data: {

    isPause:'',
  },
  go(){
    wx.navigateToMiniProgram({
      appId: 'wx1496f613242e44e1', // 要跳转的小程序的appid
      path: '/pages/coupon/getCoupon/getCoupon?key=673bde17926b4cc1856b999044be3700&roleId=19193530&to=sale.jd.com/act/thcSZOHq8iC6P.html', // 跳转的目标页面
      // extarData: {
      //   open: 'auth'
      // },
      success(res) {
        // 打开成功
        console.log(res)
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