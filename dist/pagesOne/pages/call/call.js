'use strict';

// 获取全局应用程序实例对象
// const app = getApp()
var timer = null;
var timer2 = null;
var audio = null;

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'call',
    randomName: '阿斯顿发',
    randomRemark: '阿斯顿发',
    soundUrl: 'https://c.jiangwenqiang.com/music/glgl.mp3'
  },
  back: function back() {
    wx.navigateBack({
      delta: 1
    });
  },
  answer: function answer() {
    var that = this;
    this.setData({
      answer: true
    });
    clearInterval(timer);
    if (audio) audio.destroy();
    audio = wx.createInnerAudioContext();
    audio.autoplay = true;
    audio.obeyMuteSwitch = false;
    audio.src = this.data.soundUrl;
    audio.onPlay(function () {
      that.setData({
        randomRemark: that.getTime()
      });
      timer2 = setInterval(function () {
        that.setData({
          randomRemark: that.getTime()
        });
      }, 500);
    });
    audio.onEnded(function () {
      that.back();
    });
  },
  getTime: function getTime() {
    var time = Math.floor(audio.currentTime);
    var m = Math.floor(time / 60);
    var s = Math.floor(time % 60);
    return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    if (options.type !== 'needback') {
      this.back = function () {
        wx.reLaunch({
          url: '../phone/phone'
        });
      };
    }
    this.setData({
      randomName: options.randomName,
      randomRemark: options.randomRemark,
      soundUrl: options.soundUrl
    });
    audio = wx.createInnerAudioContext();
    audio.autoplay = true;
    audio.loop = true;
    audio.obeyMuteSwitch = false;
    audio.src = 'https://sound-static.cqxcx.net/fool/Despacito.mp3';
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
    timer = setInterval(function () {
      wx.vibrateLong();
    }, 1200);
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
    if (timer) clearInterval(timer);
    if (timer2) clearInterval(timer2);
    if (audio) audio.destroy();
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    // TODO: onPullDownRefresh
  }
});
//# sourceMappingURL=call.js.map
