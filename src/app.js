/**
 * API module
 * @type {Object}
 * 用于将微信官方`API`封装为`Promise`方式
 * > 小程序支持以`CommonJS`规范组织代码结构
 */
// const Promise = require('./utils/bluebird')
const cloud = require('./utils/cloud')
App({
  data: {
    lat: null,
    lng: null,
    selected: 0,
    name: 'Smile weChat Mini Program',
    version: '0.1.0',
    authInfo: 'https://c.jiangwenqiang.com',
    baseDomain: 'https://c.jiangwenqiang.com'
  },
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
  gs (key) {
    return wx.getStorageSync(key || 'openid')
  },
  su (key, data) {
    wx.setStorageSync(key, data)
  },
  cloud () {
    return cloud
  },
  loadFontE () {
    wx.loadFontFace({
      family: 'neonOne',
      source: 'url("https://teach-1258261086.cos.ap-guangzhou.myqcloud.com/font/NeonOne.otf")'
    })
  },
  loadFontC () {
    wx.loadFontFace({
      family: 'chinese',
      source: 'url("https://7465-teach-1258324355.tcb.qcloud.la/chinese.ttf")'
    })
  },
  /**
   * 生命周期函数--监听小程序初始化
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch () {
    wx.clearStorageSync()
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
