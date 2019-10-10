// pages/boost/index.js

const utils = require('../../utils/audios')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPause:'',
  },

  goTo(el) {
    //跳转分支 根据index的值进行跳转 1：一元购 2：步数捐赠
    let index = el.currentTarget.dataset.index;

    wx.navigateTo({
      url: `/pages/oneyuan/index?id=${index}`
    });
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