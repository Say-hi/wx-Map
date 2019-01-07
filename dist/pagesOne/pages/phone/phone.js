'use strict';

// 获取全局应用程序实例对象
var app = getApp();
// const soundUrl = 'https://sound-static.cqxcx.net'
// const xapi = 'https://xapi.cqxcx.net'
// const ad = 'https://ad.cqxcx.net'
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'phone',
    randomName: '江文强',
    randomRemark: '你的小可爱',
    soundUrl: 'https://c.jiangwenqiang.com/music/glgl.mp3'
  },
  inputValue: function inputValue(e) {
    if (e.currentTarget.dataset.type === 'remark') {
      this.setData({
        randomRemark: e.detail.value
      });
    } else {
      this.setData({
        randomName: e.detail.value
      });
    }
  },
  jumpCall: function jumpCall() {
    wx.navigateTo({
      url: '../call/call?randomName=' + this.data.randomName + '&randomRemark=' + this.data.randomRemark + '&soundUrl=' + this.data.soundUrl + '&type=needback'
    });
  },
  backIndex: function backIndex() {
    wx.reLaunch({
      url: '/pages/index/index'
    });
  },
  getPhoneData: function getPhoneData() {
    var that = this;
    app.wxrequest({
      url: app.data.baseDomain + '/api/phone.json',
      success: function success(res) {
        var index = Math.floor(Math.random() * res.data.data.length);
        that.setData({
          audioArr: res.data.data,
          audioIndex: index,
          randomName: res.data.data[index].caller_name,
          randomRemark: res.data.data[index].remark,
          soundUrl: res.data.data[index].url
        });
      }
    });
  },
  bindPickerChange: function bindPickerChange(e) {
    this.setData({
      audioIndex: e.detail.value,
      randomName: this.data.audioArr[e.detail.value].caller_name,
      randomRemark: this.data.audioArr[e.detail.value].remark,
      soundUrl: this.data.audioArr[e.detail.value].url
    });
  },
  setRandom: function setRandom() {
    var index = Math.floor(Math.random() * this.data.audioArr.length);
    this.setData({
      audioIndex: index,
      randomName: this.data.audioArr[index].caller_name,
      randomRemark: this.data.audioArr[index].remark,
      soundUrl: this.data.audioArr[index].url
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    this.getPhoneData();
    // TODO: onLoad
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
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '您有一个好友来电请接听',
      path: '/pagesOne/pages/call/call?randomName=' + this.data.randomName + '&randomRemark=' + this.data.randomRemark + '&soundUrl=' + this.data.soundUrl,
      imageUrl: '/images/phone.png'
    };
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    // TODO: onPullDownRefresh
  }
});
//# sourceMappingURL=phone.js.map
