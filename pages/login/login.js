// pages/login/login.js
import api from '../../utils/api';
import Dialog from '@vant/weapp/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: '',
    passwordShow: false,
    registerPopupShow: false,
    reg_phone: '',
    reg_password: '',
    reg_nickName: '',
    reg_passwordShow: false,
  },

  onTapPasswordShow() {
    this.setData({
      passwordShow: !this.data.passwordShow
    })
  },

  onTapRegisterPasswordShow() {
    this.setData({
      reg_passwordShow: !this.data.reg_passwordShow
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  onLoginTap() {
    const {
      phone,
      password
    } = this.data;
    api.login(phone, password).then(data => {
      if (data.code !== 200) {
        // 登录失败
        Dialog.alert({
          message: data.msg,
        })
      } else {
        // 登录成功
        wx.setStorage({
          key: 'token',
          data: data.token
        })
        wx.navigateBack()
      }
    })
  },

  onRegisterTap() {
    this.setData({
      registerPopupShow: true
    })
  },

  onRegisterClose() {
    this.setData({
      registerPopupShow: false
    })
  },

  onRealRegisterTap() {
    const {
      reg_phone,
      reg_password,
      reg_nickName
    } = this.data;
    api.register(reg_phone, reg_password, reg_nickName)
      .then(data => {
        if (data !== 100) {
          Dialog.alert({
            message: data.msg,
          })
        } else {
          Dialog.alert({
            message: data.msg,
          }).then(this.onRegisterClose)
        }
      })
  },

  onForgetTap() {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})