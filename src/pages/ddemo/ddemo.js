/*eslint-disable*/
'use strict';

// 获取全局应用程序实例对象
// const app = getApp()
// const backgroundAudioManager = wx.getBackgroundAudioManager()
// backgroundAudioManager.onError(function (res) {
//   console.log(res)
// })
// backgroundAudioManager.onWaiting(function () {
//   console
// })
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'ddemo',
    // src: 'http://card.mugeda.com/campaigns/55b9e370a3664e7315000124/20161229062354/58648ba592b5793474145000/5864dddf92b57934d85e60fc.mp3',
    musicBaseUrl: 'https://c.jiangwenqiang.com/music/',
    musicArr: ['gbqq.mp3', 'Apologize.mp3', 'call_me_mabye.mp3', 'fade.mp3', 'glgl.mp3', 'tmmdh.mp3'],
    controls: false,
    audioIco: 'iconfont icon-yinlebofang',
    audioAnimation: 'audioAnimation',
    status: true,
    loop: true,
    allCount: 3,
    currentIndex: 0,
    oldIndex: 0,
    leftOut: ['fadeOutRight', 'bounceOut', 'zoomOut', 'rotateOutDownLeft', 'lightSpeedOut', 'zoomOutDown', 'zoomOutRight', 'zoomOutUp'],
    rightOut: ['fadeOutLeft', 'bounceOut', 'zoomOut', 'rotateOutDownRight', 'lightSpeedOut1', 'zoomOutDown', 'zoomOutLeft', 'zoomOutUp'],
    view: [{
      in: '',
      out: ''
    }, {
      in: '',
      out: ''
    }, {
      in: '',
      out: ''
    }]
  },
  /**
   * 触摸开始
   * @param e
   */
  touchStart: function touchStart(e) {
    this.setData({
      startX: e.changedTouches[0].clientX
    });
  },

  /**
   * 触摸结束
   * @param e
   */
  touchEnd: function touchEnd(e) {
    var that = this;
    var view = this.data.view;
    var index = Math.floor(Math.random() * 8);
    this.setData({
      endX: e.changedTouches[0].clientX
    });
    var distance = e.changedTouches[0].clientX - this.data.startX;
    if (distance < -100) {
      // left
      if (this.data.currentIndex >= this.data.allCount - 1) return;
      this.setData({
        oldIndex: that.data.currentIndex,
        currentIndex: ++that.data.currentIndex
      });
      view[this.data.oldIndex].out = 'animated ' + this.data.rightOut[index];
      view[this.data.oldIndex].in = '';
      view[this.data.currentIndex].in = 'animated fadeInRight';
      view[this.data.currentIndex].out = '';
      this.setData({
        view: view
      });
      this.cleanAnimated();
      this.showAnimated();
    } else if (distance > 100) {
      // right
      if (this.data.currentIndex <= 0) return;
      this.setData({
        oldIndex: that.data.currentIndex,
        currentIndex: --that.data.currentIndex
      });
      view[this.data.oldIndex].out = 'animated ' + this.data.leftOut[index];
      view[this.data.oldIndex].in = '';
      view[this.data.currentIndex].in = 'animated fadeInLeft';
      view[this.data.currentIndex].out = '';
      this.setData({
        view: view
      });
      this.cleanAnimated();
      this.showAnimated();
    }
  },

  /**
   * 播放控制
   */
  audioControl: function audioControl() {
    // console.log('audioContro');
    var that = this;
    if (that.data.status) {
      // console.log('c1');
      that.audioPlay();
      that.setData({
        audioIco: 'iconfont icon-yinlebofang',
        status: !that.data.status,
        audioAnimation: 'audioAnimation'
      });
    } else {
      // console.log('c2');
      that.aduioPause();
      that.setData({
        audioIco: 'iconfont icon-yinlezanting',
        status: !that.data.status,
        audioAnimation: ''
      });
    }
  },

  /**
   * 播放暂停音乐
   */
  audioPlay: function audioPlay(a) {
    // console.log('playStart');
    // console.log(a);
    this.audioCtx.play();
    // console.log(1)
  },
  aduioPause: function aduioPause() {
    // console.log('pause');
    this.audioCtx.pause();
    // console.log(2)
  },

  /**
   * 展示动画
   */
  showAnimated: function showAnimated() {
    var that = this;
    // one
    if (this.data.currentIndex === 0) {
      setTimeout(function () {
        that.setData({
          one_one: 'animated fadeIn',
          one_two: 'animated bounceIn'
        });
      }, 1000);
      setTimeout(function () {
        that.setData({
          one_three: 'animated bounceIn'
        });
      }, 1500);
      setTimeout(function () {
        that.setData({
          one_four: 'animated bounceIn'
        });
      }, 1800);
      setTimeout(function () {
        that.setData({
          one_five: 'animated lightSpeedIn'
        });
      }, 1900);
      setTimeout(function () {
        that.setData({
          one_six: 'animated fadeIn'
        });
      }, 2200);
      setTimeout(function () {
        that.setData({
          one_six: 'indexMove'
        });
      }, 3200);
    } else if (this.data.currentIndex === 1) {
      setTimeout(function () {
        that.setData({
          two_one: 'animated fadeInDown',
          two_two: 'animated fadeInUp'
        });
      }, 1000);
      setTimeout(function () {
        that.setData({
          two_three: 'animated zoomIn',
          two_four: 'animated zoomIn'
        });
      }, 1200);
      setTimeout(function () {
        that.setData({
          two_six: 'animated fadeIn',
          two_sev: 'animated fadeIn'
        });
      }, 1300);
      setTimeout(function () {
        that.setData({
          two_six: 'two-sev-scale'
        });
      }, 2300);
      setTimeout(function () {
        that.setData({
          two_three: 'two-music-one',
          two_four: 'two-music-two',
          two_one: 'two-music-one-little',
          two_two: 'two-music-two-little'
        });
      }, 2200);
      setTimeout(function () {
        that.setData({
          two_five: 'animated flipInY'
        });
      }, 1000);
    } else if (this.data.currentIndex === 2) {
      setTimeout(function () {
        that.setData({
          three_five: 'animated zoomInDown'
        });
      }, 1000);
      setTimeout(function () {
        that.setData({
          three_six: 'animated bounceInUp'
        });
      }, 1000);
      setTimeout(function () {
        that.setData({
          three_six: 'animated tada'
        });
      }, 2000);
    }
  },

  /**
   * 清除动画
   */
  cleanAnimated: function cleanAnimated() {
    var that = this;
    // one
    if (this.data.oldIndex === 0) {
      this.setData({
        one_one: 'animated fadeOut',
        one_two: 'animated fadeOut',
        one_three: 'animated fadeOut',
        one_four: 'animated fadeOut',
        one_five: 'animated fadeOut',
        one_six: 'animated fadeOut'
      });
    } else if (this.data.oldIndex === 1) {
      this.setData({
        two_one: 'animated fadeOut',
        two_two: 'animated fadeOut',
        two_three: 'animated fadeOut',
        two_four: 'animated fadeOut',
        two_five: 'animated fadeOut',
        two_six: 'animated fadeOut',
        two_sev: 'animated fadeOut',
        two_eig: 'animated fadeOut'
      });
      setTimeout(function () {
        that.setData({
          two_eig_hide: false
        });
      }, 1000);
    } else if (this.data.oldIndex === 2) {
      this.setData({
        three_five: 'animated zoomOut',
        three_six: 'animated zoomOut'
      });
    }
  },
  showEig: function showEig() {
    this.setData({
      two_eig: 'animated zoomIn',
      two_eig_hide: true
    });
  },
  hideEig: function hideEig() {
    this.setData({
      two_eig: 'animated zoomOut'
    });
    var that = this;
    setTimeout(function () {
      that.setData({
        two_eig_hide: false
      });
    }, 1000);
  },
  myImg: function myImg() {
    wx.previewImage({
      current: '',
      urls: ['https://c.jiangwenqiang.com/api/my.jpg']
    });
    if (wx.saveImageToPhotosAlbum) {
      wx.saveImageToPhotosAlbum({
        filePath: 'https://c.jiangwenqiang.com/api/my.jpg'
      });
    }
  },

  /**
   * 文本剪切
   */
  copyText: function copyText() {
    wx.setClipboardData({
      data: 'https://github.com/Say-hi/wx-Map',
      success: function success() {
        wx.showToast({
          title: '地址已复制,请粘贴到浏览器地址栏打开',
          image: '../../images/keai.png',
          mask: 'true',
          duration: 3000
        });
      }
    });
  },
  // 设置背景播放器
  setBackAudio () {
    // let that = this
    // backgroundAudioManager.title = '城市天气小程序'
    // backgroundAudioManager.epname = '城市天气小程序'
    // backgroundAudioManager.singer = '城市天气小程序'
    // backgroundAudioManager.coverImgUrl = 'https://www.jiangwenqiang.com/api/my.jpg'
    // backgroundAudioManager.src = that.data.musicPlayArr[0]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    // TODO: onLoad
    var that = this;
    wx.setNavigationBarTitle({
      title: '企业宣传'
    });
    var number = Math.floor(Math.random() * 6);
    this.setData({
      musicSrc: that.data.musicBaseUrl + that.data.musicArr[number]
    });
    // console.log('musicSrc', that.data.musicSrc);
    this.audioCtx = wx.createAudioContext('myAudio');
    this.audioCtx.setSrc(that.data.musicSrc);
    // console.log('audioCtx', this.audioCtx);
    that.audioPlay();
    // https://www.jiangwenqiang.com/music/%E5%91%8A%E7%99%BD%E6%B0%94%E7%90%83.mp3
    // let musicPlayArr = [];
    // for (let i in that.data.musicArr) {
    //   musicPlayArr.push(that.data.musicBaseUrl + that.data.musicArr[i])
    // }
    // that.setData({
    //   musicPlayArr: musicPlayArr
    // })
    // that.setBackAudio()
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
    var that = this;
    if (that.data.status) {
      // console.log('onShowStart');
      // var ss = 's1';
      this.audioControl();
    }
    this.showAnimated();
    this.audioPlay()

    // bottom
    if (that.data.bottomStatus !== 0) {
      that.setData({
        bottomStatus: 0
      });
      setTimeout(function () {
        that.setData({
          bottom: 'animated slideInUp'
        });
      }, 2000);
      setTimeout(function () {
        that.setData({
          bottom_one: 'animated slideInUp'
        });
      }, 2100);
      setTimeout(function () {
        that.setData({
          bottom_two: 'animated slideInUp'
        });
      }, 2200);
      setTimeout(function () {
        that.setData({
          bottom_three: 'animated slideInUp'
        });
      }, 2300);
      setTimeout(function () {
        that.setData({
          bottom_four: 'animated slideInUp'
        });
      }, 2400);
      setTimeout(function () {
        that.setData({
          bottom_one: 'bottom-4s-move'
        });
      }, 3100);
      setTimeout(function () {
        that.setData({
          bottom_two: 'bottom-3s-move'
        });
      }, 3200);
      setTimeout(function () {
        that.setData({
          bottom_three: 'bottom-2s-move'
        });
      }, 3300);
      setTimeout(function () {
        that.setData({
          bottom_four: 'bottom-1s-move'
        });
      }, 3400);
    }
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function onHide() {
    // TODO: onHide
    this.cleanAnimated();
    // this.aduioPause()
    if (!this.data.status) {
      // var s2 = 's2';
      this.audioControl();
    }

    // this.setData({
    //   bottom: '',
    //   bottom_one: '',
    //   bottom_two: '',
    //   bottom_three: '',
    //   bottom_four: ''
    // })
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
  },

  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '城市天气查询',
      path: '/pages/index/index',
      success: function success(res) {
        // 分享成功
      },
      fail: function fail(res) {
        // 分享失败
      }
    };
  }
});

