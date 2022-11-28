const baseUrl = getApp().globalData.baseUrl;
const appkey = getApp().globalData.appkey;

const request = (url, method = 'GET', data = {}) => new Promise(resolve => wx.request({
  url: baseUrl + url,
  method,
  header: {
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  data: {
    appkey,
    ...data
  },
  success: res => resolve(res.data)
}))

const register = (nickName, password, phone) => request('/register', 'POST', {
  nickName,
  password,
  phone
})
const login = (phone, password) => request('/login', 'POST', {
  phone,
  password
})

const productDetail = pid => request('/productDetail', 'GET', {
  pid
})

const banner = () => request('/banner')

const type = () => request('/type')

const typeProducts = (key, value) => request('/typeProducts', 'GET', {
  key,
  value
})

module.exports = {
  register,
  login,
  productDetail,
  banner,
  type,
  typeProducts
}