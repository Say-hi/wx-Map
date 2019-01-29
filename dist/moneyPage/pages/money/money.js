'use strict';

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    curChoose: 'xxx',
    showFlag: false,
    first_number: false,
    itemArr: {
      USD: {
        img: 'https://7465-teach-1258324355.tcb.qcloud.la/tab/usd.png',
        country: 'USD',
        moneyKind: '美元/$'
      },
      CNY: {
        img: 'https://7465-teach-1258324355.tcb.qcloud.la/tab/cny.png',
        country: 'CNY',
        moneyKind: '人民币/￥'
      },
      HKD: {
        img: 'https://7465-teach-1258324355.tcb.qcloud.la/tab/hkd.png',
        country: 'HKD',
        moneyKind: '港币HK/￥'
      },
      EUR: {
        img: 'https://7465-teach-1258324355.tcb.qcloud.la/tab/eur.png',
        country: 'EUR',
        moneyKind: '欧元/€'
      }
    },
    caculateArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '←'],
    rateArr: ['USD', 'CNY', 'HKD', 'EUR'],
    curIndex: 99
  },
  // 货币初始单位选择
  choose: function choose(e) {
    this.setData({
      curChoose: e.currentTarget.dataset.index,
      flag: true
    });
  },

  // 键盘
  number: function number(e) {
    var that = this;
    this.setData({
      curIndex: e.currentTarget.dataset.index
    });
    setTimeout(function () {
      that.setData({
        curIndex: 99
      });
    }, 100);
    if (!this.data.flag) {
      return wx.showToast({
        title: '请选择币种',
        image: '/images/hi_HL.png',
        mask: true
      });
    }
    var cur = this.data.curChoose;
    var number = e.currentTarget.dataset.index * 1 + 1;
    var money = that.data.itemArr[cur].rate.toString().split(',').join('');
    // 第一次点击清空
    if (!this.data.first_number) {
      if (number < 10) {
        that.caculate(cur, number);
      } else if (number === 11) {
        that.caculate(cur, '0');
      }
      if (!that.data.showFlag) {
        that.setData({
          first_number: true
        });
      }
      that.setData({
        showFlag: true
      });
      return;
    }
    // 非第一次点击
    if (money.indexOf('.') > 0 && number !== 12) {
      if (money.indexOf('.') + 2 === money.length - 1) {
        return wx.showToast({
          title: '不能有比分更小的啦',
          image: '/images/hi_HL.png',
          mask: true
        });
      }
    } else {
      if (money.length > 12 && number !== 12) {
        return wx.showToast({
          title: '超出计算范围啦',
          image: '/images/hi_HL.png',
          mask: true
        });
      }
    }
    if (number < 10) {
      that.caculate(cur, (money + number) * 1);
    } else if (number === 10) {
      if (money.indexOf('.') < 0) {
        that.data.itemArr[cur].rate += '.';
        that.setData({
          itemArr: that.data.itemArr
        });
      }
    } else if (number === 11) {
      if (money.indexOf('.') > 0) {
        that.data.itemArr[cur].rate += '0';
        that.setData({
          itemArr: that.data.itemArr
        });
        return;
      }
      if (money === '0') {
        return;
      }
      that.caculate(cur, (money + '0') * 1);
    } else if (number === 12) {
      if (money <= 0) return;
      var moneyDel = money.slice(0, money.length - 1);
      if (moneyDel.length <= 0) {
        return that.caculate(cur, '0');
      }
      that.caculate(cur, moneyDel * 1);
    }
  },

  // 计算
  caculate: function caculate(scurs, moneys) {
    var scur = scurs || 'CNY';
    var money = moneys || 100;
    var that = this;
    var rateBase = app.gs('rateBase');
    var rateUse = this.data.itemArr;
    var rateBaseMoney = rateBase[scur].rate.toString().split(',').join('') * 1;
    var baseMoneyRate = money / rateBaseMoney;
    for (var i in rateBase) {
      var ss = rateBase[i].rate.toString().split(',').join('') * 1;
      var moneyUse = (Math.round(ss * baseMoneyRate * 100) / 100).toString();
      var moneyPointArr = [];
      var getMoney = '';
      moneyPointArr = moneyUse.split('.');
      var moneyOne = moneyPointArr[0].split('').reverse();
      var lenght = moneyOne.length;
      if (lenght >= 4) {
        for (var _i = 1, j = 0; _i <= Math.floor(lenght / 3); _i++, j++) {
          if (moneyOne[3 * _i + j]) {
            moneyOne.splice(3 * _i + j, 0, ',');
          }
        }
      }
      getMoney = moneyOne.reverse().join('');
      if (moneyPointArr[1]) {
        getMoney = getMoney + '.' + moneyPointArr[1];
      }
      rateUse[i].rate = getMoney || moneyUse;
    }
    wx.stopPullDownRefresh();
    that.setData({
      itemArr: rateUse
    });
  },

  /**
  * 生命周期函数--监听页面加载
  */
  getRate: function getRate() {
    var that = this;
    this.setData({
      loading: true
    });
    app.cloud().getExchangeRate().then(function (res) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = res.common[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var i = _step.value;

          if (i.symbol === 'CNY') that.data.itemArr.CNY['rate'] = i.rate;else if (i.symbol === 'USD') that.data.itemArr.USD['rate'] = i.rate;else if (i.symbol === 'HKD') that.data.itemArr.HKD['rate'] = i.rate;else if (i.symbol === 'EUR') that.data.itemArr.EUR['rate'] = i.rate;
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

      app.su('rateBase', that.data.itemArr);
      that.setData({
        itemArr: that.data.itemArr,
        loading: false
      });
      that.caculate();
    });
  },
  onLoad: function onLoad() {
    app.loadFontE();
    this.getRate();
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
    this.getRate();
  },

  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '向您推荐一个有趣的小程序，快来围观吧',
      path: '/pages/index/index'
    };
  }
});
//# sourceMappingURL=money.js.map
