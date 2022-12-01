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
    aid: '',
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
    const {
      aid
    } = options
    if (aid) {
      api.findAddressByAid(aid).then(data => {
        if (data.code !== 40000) {
          Toast.fail(data.msg)
        }
        const address = data.result[0]
        this.setData({
          aid,
          name: address.name,
          tel: address.tel,
          province: address.province,
          city: address.city,
          county: address.county,
          addressDetail: address.addressDetail,
          areaCode: address.areaCode,
          postalCode: address.postalCode,
          isDefault: !!address.isDefault,
          areaText: `${address.province} / ${address.city} / ${address.county}`
        })
      })
    } else {
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
    // 发起请求
    const params = {
      aid: ''
    }

    const keys = ['name', 'tel', 'province', 'city', 'county', 'addressDetail', 'areaCode', 'postalCode', 'isDefault']
    keys.forEach(key => params[key] = this.data[key])

    const {
      aid
    } = this.data
    if (aid) params.aid = aid
    else delete params.aid

    api[aid ? 'editAddress' : 'addAddress']
      .apply(null, Object.values(params))
      .then(data => {
        if (data.code !== (aid ? 30000 : 9000)) {
          Toast.fail(data.msg)
        } else {
          Toast.success(data.msg)
          if (!aid) wx.navigateBack()
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