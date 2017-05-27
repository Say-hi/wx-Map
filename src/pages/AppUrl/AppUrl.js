// 获取全局应用程序实例对象
// const app = getApp()
// const bmap = require('../../utils/bmap-wx')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'AppUrl'
  },
  openMap () {
    var latitude = wx.getStorageSync('latitude')
    var longitude = wx.getStorageSync('longitude')
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 10,
      name: '您的位置',
      address: '某某大街'
    })
  },
  bdMap (e) {
    console.log(e)
  },
  openMapChooseSite () {
    wx.chooseLocation({
      success (res) {
        wx.setStorageSync('latitude', res.latitude)
        wx.setStorageSync('longitude', res.longitude)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // TODO: onLoad
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
    // TODO: onPullDownRefresh
  }
})
