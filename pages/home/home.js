// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: "",
    bannerList:[],
    coffeeList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getBannerList();
    this.getCoffeeList();
  },

  getBannerList(){
    let that = this;
    wx.request({
      url: 'http://www.kangliuyong.com:10002/banner',
      method: 'GET',
      data: {
        appkey: getApp().globalData.appkey
      },
      header: {
        'content-type': 'applicantion/json'
      },
      success({data}){
        that.setData({
          bannerList: data.result
        })
      }
    })
  },
  getCoffeeList(){
    const that = this;
    wx.request({
      url: 'http://www.kangliuyong.com:10002/typeProducts',
      method: 'GET',
      data: {
        appkey: getApp().globalData.appkey,
        key: 'isHot',
        value: 1
      },
      header: {
        'content-type': 'applicantion/json'
      },
      success({data}){
        that.setData({
          coffeeList: data.result
        })
      }
    })
  },
  handleSearch(e){
    console.log(e)
    wx.navigateTo({
      url: '../search/search',
    })
  },
  handleToDetail(e){
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