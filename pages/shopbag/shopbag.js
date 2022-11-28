// pages/shopbag/shopbag.js
import api from '../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: [],
    isSelectAll: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAllShopCart()
  },

  getAllShopCart() {
    api.findAllShopcart().then(data => {
      console.log(data)
      const products = data.result
      products.forEach(product => product.checked = false)
      this.setData({
        products
      })
    })
  },

  onChangeSelectAll(e) {
    this.setData({
      isSelectAll: e.detail,
      products: this.data.products.map(product => {
        product.checked = e.detail
        return product
      })
    })
  },

  onCheckBoxChange(e) {
    console.log(e)
    const {
      index
    } = e.currentTarget.dataset
    this.setData({
      [`products[${index}].checked`]: e.detail
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