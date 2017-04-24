// 获取全局应用程序实例对象
const app = getApp()
const bmap = require('../../utils/bmap-wx')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'Index page',
    userInfo: {},
    weatherData: '',
    weatherText: ['当前城市', 'PM2.5', '日期', '温度', '天气', '风力'],
    zsIcon: ['icon-chuanyikunhuo', 'icon-xiche', 'icon-ganmaozhishu', 'icon-yundong', 'icon-ziwaixian']
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
    var BMap = new bmap.BMapWX({
      ak: 'mIjA3xq45izQn0ej132vqufm3FAvOy4G'
    })
    var fail = function (data) {
      // console.log('fail!!!!')
    }
    var success = function (data) {
      // console.log('success!!!')
      console.log(data)
      console.log(1)
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
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // console.log(' ---------- onLoad ----------')
    // console.dir(app.data)
    var that = this
    app.getUserInfo()
      .then(info => this.setData({ userInfo: info }))
      .catch(console.info)
    // 百度地图
    that.Bmap(that)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    console.log(' ---------- onReady ----------')
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    console.log(' ---------- onShow ----------')
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    console.log(' ---------- onHide ----------')
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    console.log(' ---------- onUnload ----------')
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    console.log(' ---------- onPullDownRefresh ----------')
  }
})
