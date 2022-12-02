// pages/orders/orders.js
import api from '../../utils/api'
import util from '../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 0,
    orders: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getOrders(this.data.activeTab)
  },

  onChangeTab(event) {
    const {
      index
    } = event.detail
    this.getOrders(index)
    this.setData({activeTab: index})
  },

  getOrders(status=0){
    api.findOrder(status).then(data => {
      const {
        result
      } = data;
      const ordersMap = {};
      const orders = [];

      result.forEach(order => {
        const {
          oid
        } = order
        if (!ordersMap[oid]) ordersMap[oid] = {
          products: [],
          priceSum: 0,
          createdAt: util.formatTime(new Date(order.createdAt)),
          status: order.status
        }
        ordersMap[oid].products.push(order)
        ordersMap[oid].priceSum += order.count * parseFloat(order.price)
      })

      for (const key in ordersMap) {
        orders.push({
          oid: key,
          products: ordersMap[key].products,
          priceSum: ordersMap[key].priceSum,
          createdAt: ordersMap[key].createdAt,
          status: ordersMap[key].status
        })
      }

      this.setData({
        orders
      })
    })
  },

  onReceiveTap(e){
    const {oid} = e.currentTarget.dataset
    api.receive(oid).then(data=>{
      this.getOrders(this.data.activeTab)
    })
  },

  onRemoveOrder(e){
    const {oid} = e.currentTarget.dataset
    api.removeOrder(oid).then(data=>{
      this.getOrders(this.data.activeTab)
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