// pages/form/index.js
import {hexMD5} from "../../utils/md5"
import {hex_MD5} from "../../utils/md5l"
const utils = require('../../utils/audios')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPause:'',
        multiArray: [["北京", "安徽", "福建", "甘肃", "广东", "广西", "贵州", "海南", "河北", "河南", "黑龙江", "湖北", "湖南", "吉林", "江苏", "江西", "辽宁", "内蒙古", "宁夏", "青海", "山东", "山西", "陕西", "上海", "四川", "天津", "西藏", "新疆", "云南", "浙江", "重庆", "香港", "澳门", "台湾"], ["北京"]],
        multiIndex: [0, 0],
        objectMultiArray: [],
        date:'1990-01-01'
    },
    bindMultiPickerColumnChange(e) {
        //省市联动拼接数据
        switch (e.detail.column) {
            case 0:
                let list = []
                for (let i = 0; i < this.data.objectMultiArray.length; i++) {
                    if (this.data.objectMultiArray[i].parid == this.data.objectMultiArray[e.detail.value].regid) {
                        list.push(this.data.objectMultiArray[i].regname)
                    }
                }
                this.setData({
                    "multiArray[1]": list,
                    "multiIndex[0]": e.detail.value,
                    "multiIndex[1]": 0
                })

        }
    },
    bindDateChange: function (e) {
        //设置选择的日期
        this.setData({
            date: e.detail.value
        })
    },
    bindMultiPickerChange(e) {
        //设置当前选择的城市
        this.setData({
            "multiIndex[0]": e.detail.value[0],
            "multiIndex[1]": e.detail.value[1]
        })
    },
    formSubmit({detail}) {
        // wx.getUserInfo({
        //     success(res) {
        //         console.log(res)
        //     }
        // })
        console.log(detail.value)

        function isPoneAvailable(str) {
            let reg = /^[1][3, 4, 5, 7, 8][0-9]{9}$/;
            if (!reg.test(str)) {
                return false;
            } else {
                return true;
            }
        }
        function digo(title){
          wx.showToast({
            title: title,
            icon: 'none'
          })
        }

        //状态
        let stu = true;

        // 是否输入了名字和地区
        if (detail.value.inputName === '' || detail.value.inputArea === '') {
            stu = false
            digo('请填写名字和地区')
        }

        //判断生日格式是否正确

        if (isNaN(detail.value.inputSr) && !isNaN(Date.parse(detail.value.inputSr))) {
            console.log("data是日期格式！")
        } else {
            digo('日期填写错误')
            stu = false
        }

        //判断手机号码是否正确
        if (!isPoneAvailable(detail.value.inputPhone)) {
            digo('手机号码不正确')
            stu = false
        }

        if (stu) {
            //wx.getStorageSync('userInfo').nickName
            console.log()
            let ct= `${this.data.multiArray[0][this.data.multiIndex[0]]}-${this.data.multiArray[1][this.data.multiIndex[1]]}`
            let stringM = `avatar=${wx.getStorageSync('userInfo').avatarUrl}`+
                            `&birthday=${detail.value.inputSr}`+
                            `&city=${ct}`+
                            `&name=${detail.value.inputName}`+
                            `&nickname=${wx.getStorageSync('userInfo').nickName}`+
                            `&openId=${wx.getStorageSync('openId')}`+
                            `&phone=${detail.value.inputPhone}`+
                            `&${'drPlant'}`;
            console.log(hex_MD5(stringM))
            console.log(stringM)
            let b = []
            for (let a of ['o','a','p','b','c','i','a']) {
                        // [111, 110, 112, 98, 99, 110, 97]
                        // [111, 97, 112, 98, 99, 105, 97]
                b.push(a.charCodeAt())
            }
            console.log(b)
            wx.request({
                url: `${app.globalData.url}checkIn`,
                method: 'POST',
                header: {"Content-Type": "application/x-www-form-urlencoded"},
                data: {
                    openId: wx.getStorageSync('openId'),
                    name: detail.value.inputName,
                    phone: detail.value.inputPhone,
                    birthday: detail.value.inputSr,
                    city: ct,
                    nickname: wx.getStorageSync('userInfo').nickName,
                    avatar: wx.getStorageSync('userInfo').avatarUrl,
                    sign: hex_MD5(stringM)
                },success(res) {
                    console.log(res)
                }
            })
            wx.navigateTo({
                url: '/pages/boost/index',
            })
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        const firstData = require('../../utils/city-picker.js').postList; //省

        this.setData({
            objectMultiArray: firstData
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