// 获取全局应用程序实例对象
/*eslint-disable*/
const app = getApp()
// const wxparse = require('../../wxParse/wxParse')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showText: '体验更多',
    show: false,
    zsIcon: ['icon-chuanyikunhuo', 'icon-xiche', 'icon-ganmaozhishu', 'icon-yundong', 'icon-ziwaixian']
  },
  getLocation () {
    let that = this
    wx.getLocation({
      type: 'gcj02',
      success (res) {
        app.data.lat = res.latitude
        app.data.lng = res.longitude
        that.getBaiduMap(res.latitude, res.longitude)
      },
      fail (res) {}
    })
  },
  getBaiduMap (lat, lng) {
    let that = this
    this.setData({
      loading: true
    })
    app.cloud().getbaidumap({
      type: 'baiduweather',
      location: `${lng},${lat}`
    })
    .then(res => {
      that.setData({
        baiduWeather: res.results[0]
      })
    })

    app.cloud().getbaidumap({
      location: `${lat},${lng}`
    })
    .then(res =>{
      if (res.result.pois &&res.result.pois.length >= 1) {
        for (let v of res.result.pois) {
          v.tag = v.tag.split(';')
        }
      }
      that.setData({
        locInfo: res.result
      }, that.getWeatherData)
    })
  },
  getWeatherData () {
    let that = this
    app.cloud().getWeather({type: 'now', location: `${app.data.lng},${app.data.lat}`})
      .then(res => {
        that.setData({
          weather: res.HeWeather6[0]
        }, that.getSevenWeatherData)
      })
      .catch(err => {
        console.log(err)
        that.getWeatherData()
      })
  },
  getSevenWeatherData () {
    let that = this
    app.cloud().getWeather({type: 'forecast', location: `${app.data.lng},${app.data.lat}`})
      .then(res => {
        that.setData({
          weatherSeven: res.HeWeather6[0].daily_forecast,
          loading: false
        })
        wx.stopPullDownRefresh()
      })
      .catch(err => {
        console.log(err)
        that.getSevenWeatherData()
      })
  },
  getDayNote () {
    let that = this
    if (this.data.topDate) return
    app.cloud().getdatanote({date: new Date().getFullYear() + '-' + (new Date().getMonth() * 1 + 1) + '-' + new Date().getDate()})
      .then(res => {
        that.setData({
          topDate: res.data,
          show: true
        })
        wx.setStorageSync('topDate', res.data)
      })
      .catch(err => {
        that.setData({
          topDate: wx.getStorageSync('topDate')
        })
      })
  },
  opensetting (e) {
    if (e.detail.authSetting['scope.userLocation']) {
      let that = this
      setTimeout(() => {
        that.getLocation()
      }, 100)
    }
  },
  chooseCity () {
    let that = this
    wx.chooseLocation({
      success (res) {
        app.data.lat = res.latitude
        app.data.lng = res.longitude
        setTimeout(() => {
          that.getBaiduMap(res.latitude, res.longitude)
        }, 100)
      },
      cancel (res) {
        console.log(res)
      },
      fail (res) {
        console.log(res)
      }
    })
  },
  showNear () {
    this.setData({
      maskshow: !this.data.maskshow
    })
  },
  goPoint (e) {
    let that = this
    wx.openLocation({
      latitude: that.data.locInfo.pois[e.currentTarget.dataset.index].point.y,
      longitude: that.data.locInfo.pois[e.currentTarget.dataset.index].point.x,
      scale: 15,
      name: that.data.locInfo.pois[e.currentTarget.dataset.index].name,
      address: that.data.locInfo.pois[e.currentTarget.dataset.index].address
    })
  },

  showShares () {
    // wx.showShareMenu()
    if (wx.canIUse('showShareMenu')) {
      // console.log(1)
      wx.showShareMenu()
    } else {
      wx.showToast({
        title: '请小主点击右上角的按钮分享小程序给朋友',
        image: '../../images/keai.png',
        mask: 'true',
        duration: 3000
      })
    }
  },
  // 获取服务器json数据
  // getIndexData () {
  //   var that = this
  //   app.wxrequest({
  //     url: app.data.baseDomain + '/api/wechatIndex2.json',
  //     data: {},
  //     success (res) {
  //       wxparse.wxParse('content', 'html',res.data[0].content,that,5)
  //       that.setData({
  //         indexInfo: res.data[0],
  //         shows: res.data[0].show == 1 ? true : false
  //       })
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
   onLoad () {
    this.getLocation()
    // this.getIndexData()
    app.cloud().login()
    app.loadFontE()
    app.loadFontC()
  },
   /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // this.changeColor()
    this.getDayNote()
    if (wx.getStorageSync('topDate')) {
      this.setData({
        topDate: wx.getStorageSync('topDate'),
        show: true
      })
    }
    // console.log(' ---------- onShow ----------')
  },
  /*
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    // console.log(' ---------- onHide ----------')
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    // console.log(' ---------- onUnload ----------')
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // this.getIndexData()
    this.getLocation()
  },
  onShareAppMessage: function () {
    return {
      title: '向您推荐一个有趣的小程序，快来围观吧',
      path: '/pages/index/index'
    }
  }
})
