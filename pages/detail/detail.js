// pages/detail/detail.js
import Toast from '@vant/weapp/toast/toast';
import api from '../../utils/api';

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
      count: 1
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      pid: options.pid
    })
    this.getCoffeeDetail()
  },
  getCoffeeDetail() {
    api.productDetail(this.data.pid)
      .then(data => {
        const detail = data.result[0];
        detail.tem = detail.tem.split('/')
        detail.sugar = detail.sugar.split('/')
        this.setData({
          detail
        })
        if (detail.tem.length) {
          this.setData({
            'form.tem': detail.tem[0]
          })
        }
        if (detail.sugar.length) {
          this.setData({
            'form.sugar': detail.sugar[0]
          })
        }
      })
  },

  onClickIcon() {
    Toast('点击图标')
  },
  onClickButton() {
    Toast('点击按钮')
  },
  onClickAddShopCart(){
    const {pid, form} = this.data
    api.addShopcart(pid, form.count, [form.tem, form.sugar])
      .then(data=>Toast(data.msg))
  },
  onClickBuy(){},
  onTapTemSpec(e) {
    const value = e.currentTarget.dataset.value;
    this.setData({
      'form.tem': value
    })
  },
  onTapSugarSpec(e) {
    const value = e.currentTarget.dataset.value;
    this.setData({
      'form.sugar': value
    })
  },
  onNumChange(e) {
    this.setData({'form.count': e.detail})
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