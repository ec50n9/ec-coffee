# ec-coffee

模仿瑞幸咖啡小程序demo

## 技术栈

`Vant Weapp` + `JS`

## 我做了些什么？

主要是根据设计图来实现效果，大部分组件都能在 Vant 组件库找到，看着文档来使用难度也不大。

在写的过程中感觉比较有成就感的有几个部分：

### 小程序网络请求封装

在网络请求部分，由于一开始直接在页面中使用 wx.request 来进行网络请求的，但是后面写着写着发现重复的代码是在是太多。

遂将公共部分的代码提取出来放到 `utils/api.js` 中去了，并且把 `base url` 和 `appkey` 放到 `globalData(也就是 app.js)` 中。在 `api.js` 中读取配置，就不用重复写了，也方便后期统一更改。

主要的代码如下：

```js
// 读取配置
const { baseUrl, appkey } = getApp().globalData;

// 封装请求函数
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

// 封装需要登录的请求函数
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

// 搜索接口
const search = name => request('/search', 'GET', {
  name
})
// 获取banner接口
const banner = () => request('/banner')

// 获取购物车条目（需要登录才能访问的接口也很简单）
const shopcartRows = () => requestWithLogin('/shopcartRows')
```

封装好请求函数之后，后面就直接传入请求的相对路径，还有请求方法和参数即可。需要登录的接口在被调用是会自动跳转到登录页面。

### 选择性调用接口

这个小程序中有一个地址编辑页面，不管是新建地址亦或是编辑已有的地址，都是在同一个页面完成的。

所以便需要在点击保存按钮时根据页面传进来的参数来选择性的调用新建地址的 api 或者是保存地址的 api。

因此写了以下一段代码：

```js
saveAddr() {
    // 发起请求
    const params = { aid: '' }

    const keys = ['name', 'tel', 'province', 'city', 'county', 'addressDetail', 'areaCode', 'postalCode', 'isDefault']
    keys.forEach(key => params[key] = this.data[key])

    // aid为空说明是新建，否则就是编辑
    const { aid } = this.data
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
```

按照正常来说，新建地址的api和保存地址的api都需要传入一大堆参数，如果简单的通过if判断来调用不同api的话，就需要重复编写这一大堆相同的参数。

所以为了代码简洁且后期维护简单，便使用了一个数组来存储相同的参数名，然后根据aid参数来判断是新建还是编辑，从而实现调用不同的api。

### 购物车数量修改逻辑

还有一个有点意思的地方是在商品详情页面，加入购物车的逻辑。组件本身很简单，就是一个数字，左边一个减号右边一个加号，点击加号就增加数量，反之就减少数量。

但是因为这里的数量更改了，也要同时给后端发送请求改变数量。但是后端那边有可能会返回一个错误，如果返回的是一个错误，就得恢复原来的数量。

所以有了一下代码：
```js
onNumChange(e) {
    const { index } = e.currentTarget.dataset
    const {
        count: preCount,
        sid
    } = this.data.products[index]
    const newCount = e.detail

    // 本地修改
    this.setData({
        [`products[${index}].count`]: newCount
    })
    this.countPriceSum()

    // 同步到后端
    api.modifyShopcartCount(sid, newCount)
        .then(data => {
            if (data.code !== 6000) {
                // 修改失败, 恢复原数值
                this.setData({
                [`products[${index}].count`]: preCount
                })
                this.countPriceSum()
                Toast.fail(data.msg)
            }
        })
    },
```

不过因为这里的按钮可能是频繁点击的，所以要是加上个防抖可能效果会更好一点hhh。

## 总结

总的来说这个项目其实挺简单的，没有遇到什么难点。自我感觉这个项目的结构梳理的也还是蛮清晰的，起码写起代码来没有感觉到太多重复代码。

以上。
