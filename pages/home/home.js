// pages/home/home.js
import api from '../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    coffeeList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getBannerList();
    this.getCoffeeList();
  },

  getBannerList() {
    api.banner()
      .then(data => this.setData({
        bannerList: data.result
      }))
  },
  getCoffeeList() {
    api.typeProducts('isHot', 1)
      .then(data => this.setData({
        coffeeList: data.result
      }))
  },
  handleSearch(e) {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  handleToDetail(e) {
    const {pid} = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../detail/detail?pid=${pid}`,
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