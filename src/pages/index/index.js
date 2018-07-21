// 获取全局应用程序实例对象
/*eslint-disable*/
const app = getApp()
const bmap = require('../../utils/bmap-wx')
const wxparse = require('../../wxParse/wxParse')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    rotate: 135,
    color_start: 'fff000',
    color_center: 'fff000',
    color_end: 'ff0000',
    title: 'Index page',
    dots: true,
    circular: false,
    autoplay: false,
    userInfo: {},
    imgMode: 'aspectFill',
    show: false,
    weatherData: '',
    weatherText: ['当前城市', 'PM2.5', '日期', '温度', '天气', '风力'],
    zsIcon: ['icon-chuanyikunhuo', 'icon-xiche', 'icon-ganmaozhishu', 'icon-yundong', 'icon-ziwaixian']
  },
  changeColor () {
    let that = this
    let colorArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
    setInterval(() => {
      let color_start = '',
        color_end = '',
        color_center = ''
      for (let i = 0; i < 6; i++) {
        color_start += colorArr[Math.floor(Math.random() * 16)]
      }
      for (let i = 0; i < 6; i++) {
        color_center += colorArr[Math.floor(Math.random() * 16)]
      }
      for (let i = 0; i < 6; i++) {
        color_end += colorArr[Math.floor(Math.random() * 16)]
      }
      that.setData({
        color_center,
        color_start,
        color_end,
        rotate: Math.floor(Math.random() * 181)
      })
    }, 700)
  },
  showToast () {
    wx.showToast({
      title: '功能开发中...',
      icon: 'loading'
    })
  },
  /**
   * 去到快递查询
   */
  goToExpress () {
    wx.navigateTo({
      url: '../express/express'
    })
  },
  goTodaohang () {
    wx.navigateTo({
      url: '../AppUrl/AppUrl'
    })
  },
  /**
   * 选择城市
   */
  chooseCity () {
    // let obj = {
    //   type: 'gcj02',
    //   success (res) {
    //     console.log(res)
    //   }
    // }
    // wx.getLocation(obj)
    let that = this
    let obj = {
      success (res) {
        // console.log(res)
        let site = res.longitude + ',' + res.latitude
        that.Bmap(that, site)
      },
      cancel (res) {
        console.log(res)
      },
      fail (res) {
        console.log(res)
      }
    }
    wx.chooseLocation(obj)
  },
  /**
   * 百度地图函数
   * @param that
   * @constructor
   */
  Bmap (that, site) {
    // var _this = that
    var _this = this
    var BMap = new bmap.BMapWX({
      ak: 'mIjA3xq45izQn0ej132vqufm3FAvOy4G'
    })
    var fail = function (data) {
      // console.log('fail!!!!')
    }
    var success = function (data) {
      // console.log('success!!!')
      var weatherData = data.currentWeather[0]
      var weatherAll = data.originalData.results[0]
      var name = {}
      var array = that.data.weatherText
      let i = 0
      for (var index in weatherData) {
        name[index] = array[i++]
      }
      that.setData({
        weatherData: weatherData,
        weatherAll: weatherAll,
        name: name
      })
    }
    BMap.weather({
      fail: fail,
      success: success,
      location: site || null
    }, _this)
  },
  // 获取51每日一言数据
  getDayNote () {
    let that = this
    var date = new Date()
    var time = date.getFullYear() + '-' + (date.getMonth() * 1 + 1) + '-' + date.getDate()
    wx.request({
      url: 'https://www.51wnl.com/Api4.3.3/GetSentenceByDate.ashx',
      method: 'GET',
      data: {
        date: time,
        cc: 'cn'
      },
      success (res) {
        // console.log(res)
        that.setData({
          topDate: res.data.data,
          show: true
        })
        wx.setStorageSync('topDate', res.data.data)
      },
      fail () {
        that.setData({
          topDate: wx.getStorageSync('topDate')
        })
        // console.log(res)
      }
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
  getIndexData () {
    var that = this
    app.wxrequest({
      url: app.data.baseDomain + '/api/wechatIndex2.json',
      data: {},
      success (res) {
        wxparse.wxParse('content', 'html',res.data[0].content,that,5)
        that.setData({
          indexInfo: res.data[0],
          shows: res.data[0].show == 1 ? true : false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    var date = new Date()
    var hour = date.getHours()
    if (hour >= 18) {
      this.setData({
        curtime: 1 // 晚上
      })
    } else {
      this.setData({
        curtime: 0 // 白天
      })
    }
    this.getIndexData()
    var that = this
    // 百度地图
    that.Bmap(that)
  },
  hideindex () {
    this.setData({
      shows: !this.data.shows
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    this.changeColor()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    this.getDayNote()
    if (wx.getStorageSync('topDate')) {
      this.setData({
        topDate: wx.getStorageSync('topDate'),
        show: true
      })
    }
    // console.log(' ---------- onShow ----------')
  },
  /**
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
    // console.log(' ---------- onPullDownRefresh ----------')
    var that = this
    that.Bmap(that)
    this.getIndexData()
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 4000)
  },
  onShareAppMessage: function () {
    return {
      title: '向您推荐一个有趣的小程序，快来围观吧',
      path: '/pages/index/index'
    }
  }
})
