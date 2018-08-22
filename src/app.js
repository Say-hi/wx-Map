/**
 * API module
 * @type {Object}
 * 用于将微信官方`API`封装为`Promise`方式
 * > 小程序支持以`CommonJS`规范组织代码结构
 */
// const Promise = require('./utils/bluebird')

App({
  /**
   * Global shared
   * 可以定义任何成员，用于在整个应用中共享
   */
  data: {
    name: 'WeApp Boilerplate',
    version: '0.1.0',
    userInfo: null,
    baseDomain: 'https://c.jiangwenqiang.com',
    // 和风天气免费api 4000次/日
    hefenUrl: 'https://free-api.heweather.com/v5/',
    hefenKey: '10c6e97476d54c1f86d8ffcd5639475b',
    recentlyData: 'forecast?city=yourcity&key=yourkey', // 最近三天的数据
    citySearch: 'search?city=yourcity&key=yourkey' // 城市搜索
  },

  // 不是只能定义`data`，别的也可以
  other: 'other variables',
  wxrequest (obj) {
    wx.request({
      url: obj.url,
      method: obj.method || 'GET',
      data: obj.data || {},
      header: {
        'content-type': obj.header || 'application/x-www-form-urlencoded'
      },
      success: obj.success || function () { console.log('not have success function, check!') },
      fail: obj.fail || function (err) { console.log(err) },
      complete: obj.complete || function () {}
    })
  },
  /**
   * 生命周期函数--监听小程序初始化
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch () {
    this.wxrequest({
      url: this.data.baseDomain + '/api/zfb.json',
      success (res) {
        wx.setClipboardData({
          data: res.data[0].content,
          success () {
            wx.hideToast()
          }
        })
      }
    })
    console.log(' ========== Application is launched ========== ')
  },
  /**
   * 生命周期函数--监听小程序显示
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow () {
    console.log(' ========== Application is showed ========== ')
  },
  /**
   * 生命周期函数--监听小程序隐藏
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide () {
    console.log(' ========== Application is hid ========== ')
  }
})
