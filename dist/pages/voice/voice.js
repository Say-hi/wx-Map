'use strict';

// 获取全局应用程序实例对象
var app = getApp();
var backgroundAudioManager = wx.getBackgroundAudioManager();
var timer = null;
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    basedomain: app.data.basedomain,
    contactdomain: app.data.contactdomain,
    active: -1,
    page: 0,
    playStatus: false,
    animationData: {},
    showImg: '',
    listArr: []
  },
  play: function play(e) {
    if (e.currentTarget.dataset.index * 1 === this.data.active * 1) return this.PausePlay();
    this.setData({
      active: e.currentTarget.dataset.index,
      playStatus: true,
      bText: this.data.listArr[e.currentTarget.dataset.index].name,
      showImg: this.data.listArr[e.currentTarget.dataset.index].image
    });
    this.playMusic();
    this.setAnimation();
  },
  setAnimation: function setAnimation() {
    if (timer) clearInterval(timer);
    /*eslint-disable*/
    var width1 = 0,
        width2 = 0,
        that = this;
    setTimeout(function () {
      wx.createSelectorQuery().select('.v-b-t').fields({
        size: true
      }, function (res) {
        width1 = res.width;
        wx.createSelectorQuery().select('.v-b-tt').fields({
          size: true
        }, function (res2) {
          width2 = res2.width;
          if (width2 - width1 <= 0) return that.setData({ animationData: {} });
          var duration = width2 - width1 < 100 ? 2000 : (width2 - width1) / 100 * 10000;
          if (duration > 5000) duration = 5000;
          console.log(duration);
          var animation2 = wx.createAnimation({
            duration: 10,
            timingFunction: 'linear'
          });
          that.animation = animation2;
          animation2.translateX(0).step();
          that.setData({
            animationData: animation2.export()
          });
          var animation = wx.createAnimation({
            duration: duration,
            timingFunction: 'linear'
          });
          that.animation = animation;
          that.setData({
            animationData: animation.export()
          });
          animation.translateX(-(width2 - width1)).step().translateX(0).step();
          that.setData({
            animationData: animation.export()
          });
          timer = setInterval(function () {
            animation.translateX(-(width2 - width1)).step().translateX(0).step();
            that.setData({
              animationData: animation.export()
            });
          }, duration * 2);
        }).exec();
      }).exec();
    }, 1000);
  },
  control: function control(e) {
    var aaa = this.data.active * 1;
    if (e.currentTarget.dataset.type === 'current') {
      this.PausePlay();
    } else if (e.currentTarget.dataset.type === 'prev') {
      if (aaa === 0) {
        wx.showToast({
          title: '没有上一首啦',
          icon: 'none'
        });
        return;
      }
      this.setData({
        active: aaa - 1,
        playStatus: true,
        bText: this.data.listArr[aaa - 1].name,
        showImg: this.data.listArr[aaa - 1].image
      });

      this.playMusic();
      this.setAnimation();
    } else if (e.currentTarget.dataset.type === 'next') {
      if (aaa === this.data.listArr.length - 1) {
        wx.showToast({
          title: '没有下一首啦',
          icon: 'none'
        });
        return;
      }
      this.setData({
        active: aaa + 1,
        playStatus: true,
        bText: this.data.listArr[aaa + 1].name,
        showImg: this.data.listArr[aaa + 1].image
      });
      this.playMusic();
      this.setAnimation();
    }
  },

  // 播放
  playMusic: function playMusic() {
    var that = this;
    wx.playBackgroundAudio({
      dataUrl: that.data.listArr[that.data.active].music,
      title: that.data.listArr[that.data.active].name,
      coverImgUrl: that.data.listArr[that.data.active].image
    });
  },

  // 暂停/播放
  PausePlay: function PausePlay() {
    this.setData({
      playStatus: !this.data.playStatus
    });
    if (this.data.playStatus) backgroundAudioManager.play();else backgroundAudioManager.pause();
  },

  // 停止
  stop: function stop() {
    this.setData({
      playStatus: false,
      active: -1
    });
    backgroundAudioManager.stop();
  },
  getData: function getData() {
    var that = this;
    app.wxrequest({
      url: 'https://c.jiangwenqiang.com/api/music_list.json',
      data: {},
      success: function success(res) {
        wx.hideLoading();
        that.setData({
          listArr: res.data
        });
      }
    });
  },
  showImg: function showImg(e) {
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src,
      urls: [src]
    });
  },
  onStopFunction: function onStopFunction() {
    var s = this.data.active;
    if (s >= this.data.listArr.length - 1) s = 0;else ++s;
    this.setData({
      active: s,
      bText: this.data.listArr[s].name,
      showImg: this.data.listArr[s].image
    });
    this.playMusic();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    this.getData();
    wx.onBackgroundAudioStop(this.onStopFunction);
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


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    // TODO: onPullDownRefresh
  }
});
//# sourceMappingURL=voice.js.map
