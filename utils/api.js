const baseUrl = getApp().globalData.baseUrl;
const appkey = getApp().globalData.appkey;

const register = (nickName, password, phone) => new Promise(resolve => wx.request({
  url: baseUrl + '/register',
  method: 'POST',
  data: {
    appkey,
    nickName,
    password,
    phone
  },
  success: res => resolve(res.data)
}))

const productDetail = pid => new Promise(resolve => wx.request({
  url: baseUrl + '/productDetail',
  method: 'GET',
  data: {
    appkey,
    pid
  },
  success: res => resolve(res.data)
}))

const banner = () => new Promise(resolve => wx.request({
  url: baseUrl + '/banner',
  method: 'GET',
  data: {
    appkey
  },
  success: res => resolve(res.data)
}))

const type = ()=>new Promise(resolve=>wx.request({
  url: baseUrl+'/type',
  method: 'GET',
  data: {
    appkey
  },
  success: res=>resolve(res.data)
}))

const typeProducts = (key, value) => new Promise(resolve => wx.request({
  url: baseUrl + '/typeProducts',
  method: 'GET',
  data: {
    appkey,
    key,
    value
  },
  success: res => resolve(res.data)
}))

module.exports = {
  register,
  productDetail,
  banner,
  type,
  typeProducts
}