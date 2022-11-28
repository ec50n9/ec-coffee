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

const requestWithLogin = (url, method = 'GET', data = {}) => {
  try {
    const token = wx.getStorageSync('token')
    if (token) {
      data.tokenString = token
      return request(url, method, data)
    } else {
      goLogin()
    }
  } catch (e) {
    goLogin()
  }

  function goLogin() {
    wx.navigateTo({
      url: '../login/login',
    })
  }
}

const register = (phone, password, nickName) => request('/register', 'POST', {
  nickName,
  password,
  phone
})
const login = (phone, password) => request('/login', 'POST', {
  phone,
  password
})
const search = name => request('/search', 'GET', {
  name
})
const banner = () => request('/banner')
const type = () => request('/type')
const typeProducts = (key, value) => request('/typeProducts', 'GET', {
  key,
  value
})
const productDetail = pid => request('/productDetail', 'GET', {
  pid
})
const like = pid => requestWithLogin('/like', 'POST', {
  pid
})
const notLike = pid => requestWithLogin('/notlike', 'POST', {
  pid
})
const findLike = pid => requestWithLogin('/findlike', 'GET', {
  pid
})
const findAllLike = () => requestWithLogin('/findAllLike')
const addShopcart = (pid, count, rules) => requestWithLogin('/addShopcart', 'POST', {
  pid,
  count,
  rule: rules.join('/')
})
const shopcartCount = () => requestWithLogin('/shopcartCount')
const findAllShopcart = () => requestWithLogin('/findAllShopcart')
const modifyShopcartCount = (sid, count) => requestWithLogin('/modifyShopcartCount', 'POST', {
  sid,
  count
})
const removeShopcart = sids => requestWithLogin('/removeShopcart', 'POST', {
  sids: JSON.stringify(sids)
})
const deleteShopcart = sids => requestWithLogin('/deleteShopcart', 'POST', {
  sids: JSON.stringify(sids)
})

module.exports = {
  register,
  login,
  productDetail,
  banner,
  type,
  typeProducts,
  search,
  like,
  notLike,
  findLike,
  findAllLike,
  addShopcart,
  shopcartCount,
  findAllShopcart,
  modifyShopcartCount,
  removeShopcart,
  deleteShopcart
}