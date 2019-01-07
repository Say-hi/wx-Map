'use strict';

// 获取全局应用程序实例对象
/*eslint-disable*/
var app = getApp();
var wxDraw = require('../../../utils/wxdraw').wxDraw;
var Shape = require('../../../utils/wxdraw').Shape;
// const soundUrl = 'https://sound-static.cqxcx.net'
// const xapi = 'https://xapi.cqxcx.net'
// const ad = 'https://ad.cqxcx.net'
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    wxCanvas: null
  },
  bindtouchstart: function bindtouchstart(e) {
    this.wxCanvas.touchstartDetect(e);
  },
  bindtouchmove: function bindtouchmove(e) {
    this.wxCanvas.touchmoveDetect(e);
  },
  bindtouchend: function bindtouchend(e) {
    this.wxCanvas.touchendDetect(e);
  },
  bindtap: function bindtap(e) {
    this.wxCanvas.tapDetect(e);
  },
  bindlongpress: function bindlongpress(e) {
    this.wxCanvas.longpressDetect(e);
  },
  outImg: function outImg() {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 400,
      height: 500,
      destWidth: 400,
      destHeight: 500,
      canvasId: 'first',
      success: function success(res) {
        // console.log(res.tempFilePath)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    var context = wx.createCanvasContext('first');
    this.wxCanvas = new wxDraw(context, 0, 0, 400, 500);
    var rect = new Shape('rect', { x: 60, y: 40, w: 40, h: 80, fillStyle: '#2fbbac', rotate: 190 }, 'fill', true);
    var rect2 = new Shape('rect', { x: 60, y: 40, w: 40, h: 80, fillStyle: '#333333', rotate: 190 }, 'fill', true);
    this.wxCanvas.add(rect);
    this.wxCanvas.add(rect2);
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {
    // TODO: onReady
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    // TODO: onShow
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function onHide() {
    // TODO: onHide
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function onUnload() {
    // TODO: onUnload
  },
  onShareAppMessage: function onShareAppMessage() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    // TODO: onPullDownRefresh
  }
});
//# sourceMappingURL=wxDraw.js.map
