'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*eslint-disable*/
// 获取全局应用程序实例对象
var app = getApp();
var md5 = require('./wxmd5');
var app_key = null;
var app_id = null;
var session = null;
var interstitialAd = null;
var adList = ['adunit-4f07cc10a5456874', 'adunit-6e87d676cfe14f11', 'adunit-052131219397beeb', 'adunit-4f07cc10a5456874', 'adunit-6e87d676cfe14f11', 'adunit-052131219397beeb', 'adunit-4f07cc10a5456874', 'adunit-6e87d676cfe14f11', 'adunit-052131219397beeb', 'adunit-052131219397beeb'];
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    chatList: [],
    inputValue: null,
    userName: '匿名用户--点击头像进行授权',
    userImg: 'https://c.jiangwenqiang.com/api/logo.jpg',
    id: 0,
    robot: 'https://7465-teach-1258324355.tcb.qcloud.la/image/eva_1.jpg'
  },
  showImg: function showImg() {
    var that = this;
    wx.previewImage({
      urls: [that.data.robot],
      current: that.data.robot
    });
  },
  genRequestSign: function genRequestSign(params) {
    // 1. 对请求参数按字典升序排序
    params = this.sortObject(params);
    // 2. 拼接键值对，value部分进行URL编码
    var paramStr = '';
    var keys = Object.keys(params);
    for (var idx in keys) {
      var key = keys[idx];
      paramStr += key + '=' + encodeURIComponent(params[key]) + '&';
    }
    // 3. 拼接key
    paramStr += 'app_key=' + app_key;
    // 4. md5
    return md5.hexMD5(paramStr).toUpperCase();
  },
  sortObject: function sortObject(obj) {
    var keys = Object.keys(obj).sort();
    var newObj = {};
    for (var i = 0; i < keys.length; i++) {
      newObj[keys[i]] = obj[keys[i]];
    }
    return newObj;
  },
  chat: function chat(e) {
    var that = this;
    var indexs = that.data.chatList.length;
    if (e) {
      this.setData(_defineProperty({
        inputValue: null
      }, 'chatList[' + indexs + ']', {
        type: 2,
        text: e.detail.value.length <= 0 ? '我也不知道说些什么' : e.detail.value
      }));
    }
    var params = {
      app_id: app_id,
      time_stamp: parseInt(new Date().getTime() / 1000).toString(),
      nonce_str: Math.random().toString(36).substr(2),
      session: session,
      question: e ? e.detail.value : 'EVA，你好呀'
    };
    params['sign'] = this.genRequestSign(params);
    app.wxrequest({
      url: 'https://api.ai.qq.com/fcgi-bin/nlp/nlp_textchat',
      method: 'POST',
      header: 'application/x-www-form-urlencoded',
      data: params,
      success: function success(res) {
        wx.hideLoading();
        var index = that.data.chatList.length;
        if (!res.data.data.answer.length) {
          that.setData(_defineProperty({
            id: index
          }, 'chatList[' + index + ']', {
            type: 1,
            text: '不知道说什么，那不如看看我的小广告'
          }));
        } else {
          that.setData(_defineProperty({
            id: index
          }, 'chatList[' + index + ']', {
            type: 1,
            text: res.data.data.answer
          }));
        }
      },
      fail: function fail() {},
      complete: function complete() {
        wx.hideLoading();
      }
    });
  },
  getUserInfo: function getUserInfo(e) {
    if (e.detail.userInfo) {
      this.setData({
        userName: e.detail.userInfo.nickName,
        userImg: e.detail.userInfo.avatarUrl
      });
    }
  },
  onLoad: function onLoad() {
    var that = this;
    wx.getUserInfo({
      success: function success(res) {
        if (res.userInfo) {
          that.setData({
            userName: res.userInfo.nickName,
            userImg: res.userInfo.avatarUrl
          });
        }
      }
    });
    if (!app.gs('session')) {
      session = Math.random().toString(36).substr(2);
      app.su('session', session);
    } else {
      session = app.gs('session');
    }
    this.setData({
      loading: true
    });
    app.cloud().getPhotoKey().then(function (res) {
      app_key = res.k;
      app_id = res.i;
      that.setData({
        loading: false
      }, that.chat);
    });
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
    // 在页面中定义插屏广告

    // 在页面onLoad回调事件中创建插屏广告实例
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: adList[Math.floor(Math.random() * 10)]
      });
    }
    // 在适合的场景显示插屏广告
    if (interstitialAd) {
      interstitialAd.show().catch(function (err) {
        console.error(err);
      });
    }
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
  onPullDownRefresh: function onPullDownRefresh() {},

  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '向您推荐一个有趣的小程序，快来围观吧',
      path: '/pages/index/index'
    };
  }
});
//# sourceMappingURL=chat.js.map
