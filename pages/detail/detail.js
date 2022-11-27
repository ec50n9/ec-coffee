// pages/detail/detail.js
import Toast from '@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid: '',
    detail: {},
    form: {
      tem: '冷',
      sugar: '',
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.pid)
    this.setData({
      pid: options.pid
    })
    this.getCoffeeDetail()
  },
  getCoffeeDetail(){
    const that = this;
    wx.request({
      url: 'http://www.kangliuyong.com:10002/productDetail',
      method: 'GET',
      data: {
        appkey: getApp().globalData.appkey,
        pid: that.data.pid
      },
      success({data}){
        const detail = data.result[0];
        detail.tem = detail.tem.split('/')
        detail.sugar = detail.sugar.split('/')
        that.setData({detail})
        if(detail.tem.length){
          that.setData({'form.tem': detail.tem[0]})
        }
        if(detail.sugar.length){
          that.setData({'form.sugar': detail.sugar[0]})
        }
      }
    })
  },

  onClickIcon(){
    Toast('点击图标')
  },
  onClickButton(){
    Toast('点击按钮')
  },
  onTapTemSpec(e){
    const value = e.currentTarget.dataset.value;
    this.setData({'form.tem': value})
  },
  onTapSugarSpec(e){
    const value = e.currentTarget.dataset.value;
    this.setData({'form.sugar': value}) 
  },
  onNumChange(){

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