'use strict';

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'joke',
    choose: 0,
    controls: true,
    objectFit: 'fill'
    // poster: 'https://www.jiangwenqiang.com/api/my.jpg'
  },
  getVideoUrl: function getVideoUrl() {
    var that = this;
    var obj = {
      url: 'https://lf.snssdk.com/neihan/service/tabs/',
      success: function success(res) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = res.data.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var i = _step.value;

            if (i.name === '视频') {
              var url = i.url.replace('http', 'https');
              that.setData({
                secondUrl: url
              });
              break;
            }
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

        var ojbs = {
          url: that.data.secondUrl,
          success: function success(res) {
            var videoArr = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = res.data.data.data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var i = _step2.value;

                // console.log(i['group']['480p_video']['url_list'][0])
                videoArr.push(i['group']['480p_video']['url_list'][0]['url'].replace('http://', 'https://'));
              }
              // let videoArr = res.data.data.data
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }

            that.setData({
              videoArr: videoArr
            });
          }
        };
        app.wxrequest(ojbs);
      }
    };
    app.wxrequest(obj);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    // TODO: onLoad
    this.getVideoUrl();
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
    var that = this;
    var choose = this.data.choose;
    if (choose === this.data.videoArr.length) {
      var ojbs = {
        url: that.data.secondUrl,
        success: function success(res) {
          var videoArr = [];
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = res.data.data.data[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var i = _step3.value;

              // console.log(i['group']['480p_video']['url_list'][0])
              videoArr.push(i['group']['480p_video']['url_list'][0]['url'].replace('http://', 'https://'));
            }
            // let videoArr = res.data.data.data
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          that.setData({
            choose: 0,
            videoArr: videoArr
          });
        }
      };
      app.wxrequest(ojbs);
    } else {
      ++choose;
      this.setData({
        choose: choose
      });
    }
    this.setData({
      autoplays: true
    });
    this.videoContext = wx.createVideoContext('videos');
    setTimeout(function () {
      that.videoContext.play();
      wx.stopPullDownRefresh();
    }, 200);
  },

  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '向您推荐一个有趣的小程序，快来围观吧',
      path: '/pages/index/index'
    };
  }
});
//# sourceMappingURL=joke.js.map
