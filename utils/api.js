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
const logout = () => requestWithLogin('/logout', 'POST')
const destroyAccount = () => requestWithLogin('/destroyAccount', 'POST')
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
const shopcartRows = () => requestWithLogin('/shopcartRows')
const addAddress = (name, tel, province, city, county, addressDetail, areaCode, postalCode, isDefault) => requestWithLogin('/addAddress', 'POST', {
  name,
  tel,
  province,
  city,
  county,
  addressDetail,
  areaCode,
  postalCode,
  isDefault: isDefault ? 1 : 0
})
const deleteAddress = aid => requestWithLogin('/deleteAddress', 'POST', {
  aid
})
const findAddress = () => requestWithLogin('/findAddress')
const editAddress = (aid, name, tel, province, city, county, addressDetail, areaCode, postalCode, isDefault) => requestWithLogin('/editAddress', 'POST', {
  aid,
  name,
  tel,
  province,
  city,
  county,
  addressDetail,
  areaCode,
  postalCode,
  isDefault: isDefault ? 1 : 0
})
const findAddressByAid = aid => requestWithLogin('/findAddressByAid', 'GET', {
  aid
})
const commitShopcart = sids => requestWithLogin('/commitShopcart', 'GET', {
  sids: JSON.stringify(sids)
})
const pay = (sids, phone, address, receiver) => requestWithLogin('/pay', 'POST', {
  sids: JSON.stringify(sids),
  phone,
  address,
  receiver
})
const findOrder = status => requestWithLogin('/findOrder', 'GET', {
  status
})
const receive = oid => requestWithLogin('/receive', 'POST', {
  oid
})
const removeOrder = oid => requestWithLogin('/removeOrder', 'POST', {
  oid
})

// 我的
const findMy = () => requestWithLogin('/findMy')
const findAccountInfo = () => requestWithLogin('/findAccountInfo')
const updateNickName = nickName => requestWithLogin('/updateNickName', 'POST', {nickName})
const updateDesc = desc=>requestWithLogin('/updateDesc', 'POST', {desc})
const updatePassword = (password, oldPassword)=>requestWithLogin('/updatePassword', 'POST', {password, oldPassword})

module.exports = {
  register,
  login,
  logout,
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
  deleteShopcart,
  shopcartRows,
  addAddress,
  deleteAddress,
  findAddress,
  editAddress,
  findAddressByAid,
  commitShopcart,
  pay,
  findOrder,
  receive,
  removeOrder,
  findMy,
  findAccountInfo,
  updateNickName,
  updateDesc,
  updatePassword
}