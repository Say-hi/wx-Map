'use strict';

// 获取全局应用程序实例对象
// const app = getApp()
// let windHeight = wx.getSystemInfoSync().windowHeight
// let timer = null
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    wrap_bgc: '000000',
    content: [{
      t: '给',
      size: 250,
      r: 0,
      g: 255,
      b: 255
    }, {
      t: '强',
      size: 250,
      r: 255,
      g: 0,
      b: 255
    }, {
      t: '哥',
      size: 250,
      r: 255,
      g: 255,
      b: 0
    }, {
      t: '哥',
      size: 250,
      r: 255,
      g: 144,
      b: 255
    }, {
      t: '打',
      size: 250,
      r: 144,
      g: 144,
      b: 144
    }, {
      t: 'Call',
      size: 250,
      r: 20,
      g: 255,
      b: 144
    }],
    colorArr: [{
      r: 255,
      g: 255,
      b: 255
    }, {
      r: 10,
      g: 255,
      b: 255
    }, {
      r: 255,
      g: 10,
      b: 255
    }, {
      r: 255,
      g: 255,
      b: 10
    }, {
      r: 10,
      g: 255,
      b: 10
    }, {
      r: 255,
      g: 10,
      b: 10
    }, {
      r: 255,
      g: 222,
      b: 173
    }, {
      r: 148,
      g: 0,
      b: 211
    }],
    inputext: null,
    contentFontSize: 100,
    textIndex: -1,
    allSize: 250,
    allR: 255,
    allG: 255,
    allB: 255,
    time: 8,
    longth: 0,
    contentColor: 'FFF000'
  },
  showChange: function showChange() {
    this.setData({
      show: !this.data.show
    });
  },
  inputfinish: function inputfinish(e) {
    var t = e.detail.value;
    if (t.length <= 0) {
      // wx.showToast({
      //   title: '请输入内容',
      //   icon: 'loading'
      // })
      return;
    }
    var tArr = t.split('');
    var content = [];
    var en = '';
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = tArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var v = _step.value;

        if (/[a-zA-Z]/.test(v)) {
          en += v;
          if (!content.length) {
            content[0] = {
              size: 250,
              r: 255,
              g: 255,
              b: 255,
              t: en
            };
          } else {
            content[content.length - 1] = {
              size: 250,
              r: 255,
              g: 255,
              b: 255,
              t: en
            };
          }
          continue;
        } else {
          en = '';
        }
        content.push({
          size: 250,
          r: 255,
          g: 255,
          b: 255,
          t: v
        });
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

    this.setData({
      content: content,
      inputext: t
    });
  },
  chooseText: function chooseText(e) {
    if (e.currentTarget.dataset.index * 1 === this.data.textIndex * 1) {
      this.setData({
        textIndex: -1
      });
    } else {
      this.setData({
        textIndex: e.currentTarget.dataset.index
      });
    }
  },
  fastColor: function fastColor(e) {
    var _e$currentTarget$data = e.currentTarget.dataset,
        r = _e$currentTarget$data.r,
        g = _e$currentTarget$data.g,
        b = _e$currentTarget$data.b;

    if (this.data.textIndex === -1) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.data.content[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var v = _step2.value;

          v.r = r;
          v.g = g;
          v.b = b;
        }
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

      this.setData({
        allR: r,
        allG: g,
        allB: b,
        content: this.data.content
      });
      return;
    } else {
      this.data.content[this.data.textIndex].r = r;
      this.data.content[this.data.textIndex].g = g;
      this.data.content[this.data.textIndex].b = b;
    }
    this.setData({
      content: this.data.content
    });
  },
  sliderchange: function sliderchange(e) {
    if (e.currentTarget.dataset.type === 'size') {
      if (this.data.textIndex === -1) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.data.content[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var v = _step3.value;

            v.size = e.detail.value;
          }
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

        this.setData({
          content: this.data.content,
          allSize: e.detail.value
        });
        return;
      }
      this.data.content[this.data.textIndex].size = e.detail.value;
    } else if (e.currentTarget.dataset.type === 'r') {
      if (this.data.textIndex === -1) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this.data.content[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _v = _step4.value;

            _v.r = e.detail.value;
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        this.setData({
          content: this.data.content,
          allR: e.detail.value
        });
        return;
      }
      this.data.content[this.data.textIndex].r = e.detail.value;
    } else if (e.currentTarget.dataset.type === 'g') {
      if (this.data.textIndex === -1) {
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = this.data.content[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var _v2 = _step5.value;

            _v2.g = e.detail.value;
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }

        this.setData({
          content: this.data.content,
          allG: e.detail.value
        });
        return;
      }
      this.data.content[this.data.textIndex].g = e.detail.value;
    } else if (e.currentTarget.dataset.type === 'b') {
      if (this.data.textIndex === -1) {
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = this.data.content[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var _v3 = _step6.value;

            _v3.b = e.detail.value;
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
              _iterator6.return();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }

        this.setData({
          content: this.data.content,
          allB: e.detail.value
        });
        return;
      }
      this.data.content[this.data.textIndex].b = e.detail.value;
    } else if (e.currentTarget.dataset.type === 'time') {
      this.setData({
        time: e.detail.value
      });
      return;
    }
    this.setData({
      content: this.data.content
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    // TODO: onLoad
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {
    // this.checkLongth()
    // setTimeout(() => {
    //   this.textMove(5)
    // },100)
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
  },

  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '手持弹幕神器，为你打CALL',
      path: '/pages/danmu/danmu'
    };
  }
});
//# sourceMappingURL=danmu.js.map
