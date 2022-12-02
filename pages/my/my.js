// pages/my/my.js
import api from '../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    settings:[
      {
        name: '个人资料',
        path: '../profile/profile'
      },{
        name: '我的订单',
        path: '../orders/orders'
      },{
        name: '我的收藏',
        path: '../like/like'
      },{
        name: '地址管理',
        path: '../address/address'
      },{
        name: '安全中心',
        path: '../security/security'
      }
    ],
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  onClickSetting(e){
    const {path} = e.currentTarget.dataset;
    wx.navigateTo({
      url: path,
    })
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
    api.findMy().then(data=>{
      const userInfo = data.result[0]
      this.setData({userInfo})
    })
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