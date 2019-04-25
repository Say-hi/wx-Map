/*eslint-disable*/
// 获取全局应用程序实例对象
const app = getApp()
const md5 = require('./wxmd5')
let app_key = null
let app_id = null
let session = null
let interstitialAd = null
let adList = ['adunit-4f07cc10a5456874', 'adunit-6e87d676cfe14f11', 'adunit-052131219397beeb', 'adunit-4f07cc10a5456874', 'adunit-6e87d676cfe14f11', 'adunit-052131219397beeb', 'adunit-4f07cc10a5456874', 'adunit-6e87d676cfe14f11', 'adunit-052131219397beeb', 'adunit-052131219397beeb']
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    chatList: [],
    inputValue: null,
    userName: '匿名用户--点击头像进行授权',
    userImg: 'https://c.jiangwenqiang.com/api/logo.jpg',
    id: 0,
    robot: 'https://7465-teach-1258324355.tcb.qcloud.la/image/eva_1.jpg'
  },
  showImg () {
    let that = this
    wx.previewImage({
      urls: [that.data.robot],
      current: that.data.robot
    })
  },
  genRequestSign (params)  {
    // 1. 对请求参数按字典升序排序
    params = this.sortObject(params)
    // 2. 拼接键值对，value部分进行URL编码
    let paramStr = ''
    let keys = Object.keys(params)
    for (let idx in keys) {
      let key = keys[idx]
      paramStr += key + '=' + encodeURIComponent(params[key]) + '&'
    }
    // 3. 拼接key
    paramStr += 'app_key=' + app_key
    // 4. md5
    return md5.hexMD5(paramStr).toUpperCase()
  },
  sortObject (obj)  {
    var keys = Object.keys(obj).sort()
    var newObj = {}
    for (var i = 0; i < keys.length; i++) {
      newObj[keys[i]] = obj[keys[i]]
    }
    return newObj
  },
  chat (e) {
    let that = this
    let indexs = that.data.chatList.length
    if (e) {
      this.setData({
        inputValue: null,
        [`chatList[${indexs}]`]: {
          type: 2,
          text: e.detail.value.length <= 0 ? '我也不知道说些什么' : e.detail.value
        }
      })
    }
    let params = {
      app_id: app_id,
      time_stamp: parseInt(new Date().getTime() / 1000).toString(),
      nonce_str: Math.random().toString(36).substr(2),
      session,
      question: e ? e.detail.value : 'EVA，你好呀',
    }
    params['sign'] = this.genRequestSign(params)
    app.wxrequest({
      url: 'https://api.ai.qq.com/fcgi-bin/nlp/nlp_textchat',
      method: 'POST',
      header: 'application/x-www-form-urlencoded',
      data: params,
      success (res) {
        wx.hideLoading()
        let index = that.data.chatList.length
        if (!res.data.data.answer.length) {
          that.setData({
            id: index,
            [`chatList[${index}]`]: {
              type: 1,
              text: '不知道说什么，那不如看看我的小广告'
            }
          })
        } else {
          that.setData({
            id: index,
            [`chatList[${index}]`]: {
              type: 1,
              text: res.data.data.answer
            }
          })
        }
      },
      fail () {

      },
      complete () {
        wx.hideLoading()
      }
    })
  },
  getUserInfo (e) {
    if (e.detail.userInfo) {
      this.setData({
        userName: e.detail.userInfo.nickName,
        userImg: e.detail.userInfo.avatarUrl
      })
    }
  },
  onLoad () {
    let that = this
    wx.getUserInfo({
      success (res) {
        if (res.userInfo) {
          that.setData({
            userName: res.userInfo.nickName,
            userImg: res.userInfo.avatarUrl
          })
        }
      }
    })
    if (!app.gs('session')) {
      session = Math.random().toString(36).substr(2)
      app.su('session', session)
    } else {
      session = app.gs('session')
    }
    this.setData({
      loading: true
    })
    app.cloud().getPhotoKey()
      .then(res => {
        app_key = res.k
        app_id = res.i
        that.setData({
          loading: false
        }, that.chat)
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // TODO: onReady
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // 在页面中定义插屏广告

// 在页面onLoad回调事件中创建插屏广告实例
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: adList[Math.floor(Math.random() * 10)]
      })
    }
// 在适合的场景显示插屏广告
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
    // TODO: onShow
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    // TODO: onHide
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {

  },
  onShareAppMessage: function () {
    return {
      title: '向您推荐一个有趣的小程序，快来围观吧',
      path: '/pages/index/index'
    }
  }
})
