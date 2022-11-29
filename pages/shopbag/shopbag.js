// pages/shopbag/shopbag.js
import api from '../../utils/api';
import Toast from '@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: [],
    selectedCount: 0,
    isSelectAll: false,
    priceSum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  getAllShopCart() {
    api.findAllShopcart().then(data => {
      console.log(data)
      const products = data.result
      products.forEach(product => product.checked = false)
      this.setData({
        products,
        selectedCount: 0,
        isSelectAll: false,
        priceSum: 0
      })
    })
  },

  onChangeSelectAll(e) {
    this.setData({
      selectedCount: e.detail ? this.data.products.length : 0,
      isSelectAll: e.detail,
      products: this.data.products.map(product => {
        product.checked = e.detail
        return product
      })
    })
    this.countPriceSum()
  },

  onCheckBoxChange(e) {
    const {
      index
    } = e.currentTarget.dataset
    this.setData({
      selectedCount: this.data.selectedCount + (e.detail ? 1 : -1),
      [`products[${index}].checked`]: e.detail
    })
    this.setData({
      isSelectAll: this.data.selectedCount === this.data.products.length
    })
    this.countPriceSum()
  },

  onNumChange(e) {
    const {
      index
    } = e.currentTarget.dataset
    const {
      count: preCount,
      sid
    } = this.data.products[index]
    const newCount = e.detail
    this.setData({
      [`products[${index}].count`]: newCount
    })
    this.countPriceSum()

    api.modifyShopcartCount(sid, newCount)
      .then(data => {
        if (data.code !== 6000) {
          // 修改失败, 恢复原数值
          this.setData({
            [`products[${index}].count`]: preCount
          })
          this.countPriceSum()
          Toast.fail(data.msg)
        }
      })
  },

  countPriceSum() {
    let priceSum = 0
    this.data.products.forEach(({
      checked,
      price,
      count
    }) => priceSum += parseFloat(checked ? price * count : 0))
    this.setData({
      priceSum: priceSum * 100
    })
  },

  onDeleteProduct(e) {
    const {
      index
    } = e.currentTarget.dataset
    const {
      sid
    } = this.data.products[index]

    api.deleteShopcart([sid]).then(data => {
      if (data.code === 7000) {
        Toast.success('删除成功')
        this.getAllShopCart()
      } else {
        Toast.fail(data.msg)
      }
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
    this.getAllShopCart()
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