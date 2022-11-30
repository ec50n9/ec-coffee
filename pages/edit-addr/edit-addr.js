// pages/edit-addr/edit-addr.js
import {
  areaList
} from '@vant/area-data';
import Toast from '@vant/weapp/toast/toast';
import api from '../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaList,
    addrPickerShow: false,
    name: '',
    tel: '',
    province: '',
    city: '',
    county: '',
    addressDetail: '',
    areaCode: '',
    postalCode: '',
    isDefault: false,
    areaText: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.aid) {
      console.log(options.aid)
    }else{
      wx.setNavigationBarTitle({
        title: '新建地址',
      })
    }
  },

  showAddrPicker() {
    this.setData({
      addrPickerShow: true
    })
  },
  hideAddrPicker() {
    this.setData({
      addrPickerShow: false
    })
  },

  onAreaChange(e) {
    const result = e.detail
    const province = result.values[0].name
    const city = result.values[1].name
    const county = result.values[2].name
    const areaCode = result.values[2].code
    this.setData({
      province,
      city,
      county,
      areaCode,
      areaText: `${province} / ${city} / ${county}`
    })
    this.hideAddrPicker()
  },

  onDefaultChange(e) {
    const isDefault = e.detail
    this.setData({
      isDefault
    })
  },

  saveAddr() {
    console.log(this.data);
  
    const {
      name,
      tel,
      province,
      city,
      county,
      addressDetail,
      areaCode,
      postalCode,
      isDefault
    } = this.data;
    // 发起请求
    api.addAddress(name, tel, province, city, county, addressDetail, areaCode, postalCode, isDefault)
      .then(data => {
        console.log(data)
        if (data.code !== 9000) {
          Toast.fail(data.msg)
        } else {
          Toast.success(data.msg)
          wx.navigateBack()
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