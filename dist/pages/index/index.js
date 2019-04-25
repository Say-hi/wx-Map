'use strict';

// 获取全局应用程序实例对象
/*eslint-disable*/
var app = getApp();
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
  getLocation: function getLocation() {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function success(res) {
        app.data.lat = res.latitude;
        app.data.lng = res.longitude;
        that.getBaiduMap(res.latitude, res.longitude);
      },
      fail: function fail(res) {}
    });
  },
  getBaiduMap: function getBaiduMap(lat, lng) {
    var that = this;
    this.setData({
      loading: true
    });
    app.cloud().getbaidumap({
      type: 'baiduweather',
      location: lng + ',' + lat
    }).then(function (res) {
      that.setData({
        baiduWeather: res.results[0]
      });
    });

    app.cloud().getbaidumap({
      location: lat + ',' + lng
    }).then(function (res) {
      if (res.result.pois && res.result.pois.length >= 1) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = res.result.pois[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var v = _step.value;

            v.tag = v.tag.split(';');
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
      that.setData({
        locInfo: res.result
      }, that.getWeatherData);
    });
  },
  getWeatherData: function getWeatherData() {
    var that = this;
    app.cloud().getWeather({ type: 'now', location: app.data.lng + ',' + app.data.lat }).then(function (res) {
      that.setData({
        weather: res.HeWeather6[0]
      }, that.getSevenWeatherData);
    }).catch(function (err) {
      console.log(err);
      that.getWeatherData();
    });
  },
  getSevenWeatherData: function getSevenWeatherData() {
    var that = this;
    app.cloud().getWeather({ type: 'forecast', location: app.data.lng + ',' + app.data.lat }).then(function (res) {
      that.setData({
        weatherSeven: res.HeWeather6[0].daily_forecast,
        loading: false
      });
      wx.stopPullDownRefresh();
    }).catch(function (err) {
      console.log(err);
      that.getSevenWeatherData();
    });
  },
  getDayNote: function getDayNote() {
    var that = this;
    if (this.data.topDate) return;
    app.cloud().getdatanote({ date: new Date().getFullYear() + '-' + (new Date().getMonth() * 1 + 1) + '-' + new Date().getDate() }).then(function (res) {
      that.setData({
        topDate: res.data,
        show: true
      });
      wx.setStorageSync('topDate', res.data);
    }).catch(function (err) {
      that.setData({
        topDate: wx.getStorageSync('topDate')
      });
    });
  },
  opensetting: function opensetting(e) {
    if (e.detail.authSetting['scope.userLocation']) {
      var that = this;
      setTimeout(function () {
        that.getLocation();
      }, 100);
    }
  },
  chooseCity: function chooseCity() {
    var that = this;
    wx.chooseLocation({
      success: function success(res) {
        app.data.lat = res.latitude;
        app.data.lng = res.longitude;
        setTimeout(function () {
          that.getBaiduMap(res.latitude, res.longitude);
        }, 100);
      },
      cancel: function cancel(res) {
        console.log(res);
      },
      fail: function fail(res) {
        console.log(res);
      }
    });
  },
  showNear: function showNear() {
    this.setData({
      maskshow: !this.data.maskshow
    });
  },
  goPoint: function goPoint(e) {
    var that = this;
    wx.openLocation({
      latitude: that.data.locInfo.pois[e.currentTarget.dataset.index].point.y,
      longitude: that.data.locInfo.pois[e.currentTarget.dataset.index].point.x,
      scale: 15,
      name: that.data.locInfo.pois[e.currentTarget.dataset.index].name,
      address: that.data.locInfo.pois[e.currentTarget.dataset.index].address
    });
  },
  showShares: function showShares() {
    // wx.showShareMenu()
    if (wx.canIUse('showShareMenu')) {
      // console.log(1)
      wx.showShareMenu();
    } else {
      wx.showToast({
        title: '请小主点击右上角的按钮分享小程序给朋友',
        image: '../../images/keai.png',
        mask: 'true',
        duration: 3000
      });
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
  onLoad: function onLoad() {
    this.getLocation();
    // this.getIndexData()
    app.cloud().login();
    app.loadFontE();
    app.loadFontC();
  },

  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    // this.changeColor()
    this.getDayNote();
    if (wx.getStorageSync('topDate')) {
      this.setData({
        topDate: wx.getStorageSync('topDate'),
        show: true
      });
    }
    // console.log(' ---------- onShow ----------')
  },

  /*
   * 生命周期函数--监听页面隐藏
   */
  onHide: function onHide() {
    // console.log(' ---------- onHide ----------')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function onUnload() {
    // console.log(' ---------- onUnload ----------')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    // this.getIndexData()
    this.getLocation();
  },

  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '向您推荐一个有趣的小程序，快来围观吧',
      path: '/pages/index/index'
    };
  }
});
//# sourceMappingURL=index.js.map
