// pages/security/security.js
import api from '../../utils/api';
import Dialog from '@vant/weapp/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    passwordPopupShow: false,
    originPassword: '',
    newPassword: '',
    originPasswordShow: false,
    newPasswordShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  onLogout() {
    api.logout().then(data => {
      wx.removeStorageSync('token')
      wx.redirectTo({
        url: '../home/home',
      })
    })
  },

  showPasswordPopup() {
    this.setData({
      passwordPopupShow: true
    })
  },

  onPasswordClose() {
    this.setData({
      passwordPopupShow: false
    })
  },

  onTapOriginPasswordShow() {
    this.setData({
      originPasswordShow: !this.data.originPasswordShow
    })
  },

  onTapNewPasswordShow() {
    this.setData({
      newPasswordShow: !this.data.newPasswordShow
    })
  },

  onPasswordSubmitTap() {
    const {
      originPassword,
      newPassword
    } = this.data
    console.log(originPassword, newPassword)
    api.updatePassword(newPassword, originPassword).then(data => {
      if (data.code === 'E001') {
        wx.showToast({
          title: data.msg
        })
        wx.removeStorageSync('token')
        wx.redirectTo({
          url: '../login/login',
        })
      } else {
        wx.showToast({
          title: data.msg,
          icon: 'error'
        })
      }
    })
  },

  onCancelAccount() {
    Dialog.confirm({
        title: '注销账号',
        message: '是否确定注销账号, 一旦注销无法恢复!',
      })
      .then(() => {
        api.destroyAccount().then(data => {
          wx.removeStorageSync('token')
          wx.redirectTo({
            url: '../home/home',
          })
        })
      })
      .catch(() => {
        // on cancel
      });
  },

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