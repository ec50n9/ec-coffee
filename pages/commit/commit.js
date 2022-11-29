// pages/commit/commit.js
import api from '../../utils/api'
import util from '../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: [],
    priceSum: 0,
    date: util.formatTime(new Date())
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const sids = JSON.parse(options.sids)
    api.commitShopcart(sids).then(data=>{
      console.log(data)
      this.setData({products: data.result})
      this.countPriceSum()
    })
  },

  countPriceSum() {
    let priceSum = 0
    this.data.products.forEach(({
      price,
      count
    }) => priceSum += parseFloat(price * count))
    this.setData({
      priceSum
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