// pages/menu/menu.js
import api from '../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    categorys: [],
    currentType: 'isHot',
    products: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCategorys()
  },

  getCategorys() {
    api.type().then(data => {
      const categorys = data.result
      categorys.unshift({
        id: 0,
        type: 'isHot',
        typeDesc: '推荐'
      })
      this.setData({
        categorys
      })
      this.getProducts()
    })
  },

  onTapCategory(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      currentType: type
    })
    this.getProducts()
  },

  getProducts() {
    api.typeProducts(
        this.data.currentType === 'isHot' ? 'isHot' : 'type',
        this.data.currentType === 'isHot' ? 1 : this.data.currentType
      )
      .then(data => {
        const products = data.result
        this.setData({
          products
        })
      })
  },

  onTapProduct(e) {
    const pid = e.currentTarget.dataset.pid;
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