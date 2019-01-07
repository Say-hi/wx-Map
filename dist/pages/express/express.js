"use strict";

// 获取全局应用程序实例对象
// const app = getApp()
/*eslint-disable*/
var baseUrl = "https://qf-restapi.mdscj.com/xp_express";

/**
 * 获取热门快递公司列表
 * 无参数!
 */
var getExpressType = "/logistics/company/list";

/**
 * 获取快递具体信息，根据公司码
 * tid 时间戳，companyCode 公司码，logisticCode 快递单号!
 */
var getExpressMessage = "/logistics/search";

/**
 * 获取快递公司列表排序之后结果
 * 无参数!
 */
var getExpressAllType = "/logistics/company-by-sort";

/**
 *  获取快递具体信息，无需公司码，自动匹配
 *  logisticsNo  快递单号!
 */
var geMessageNoType = "/logistics/query";

/**
 *  根据快递单号从买到获取信息
 *  logisticsNo  快递单号!
 */
var geMessageMD = "/logistics/query-product-logisticsno";

/**
 *  根据快递单号获取可能的快递类型
 *  logisticsNo  快递单号!
 */
var hotMatch = "/logistics/query-company-quickly";

/**
 * 使用快递100接口查询，根据快递单号,查询快递详情
 * logisticsNo  快递单号!
 */
var getExpressBy100 = "/kuaidi100/query";

/**
 * 使用快递100接口查询，根据快递单号，查询快递可能的快递公司
 * logisticsNo  快递单号!
 */
var getCompanyBy100 = "/kuaidi100/query-company-quickly";
/*eslint-enable*/
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'express',
    chosseIndex: -1,
    delStatus: false
  },
  /**
   * 获取输入的快递单号
   * @param e
   */
  inputExpress: function inputExpress(e) {
    // console.log(e)
    this.setData({
      expressValue: e.detail.value
    });
  },

  /**
   * 搜索快递单号
   */
  searchExpress: function searchExpress() {
    var number = this.data.expressValue;
    number = number.replace(/\s+/g, '');
    if (number.length === 0) return;
    wx.navigateTo({
      url: '../expressJump/expressJump?number=' + number
    });
  },

  /**
   * 调用微信扫码
   */
  scanExpressCode: function scanExpressCode() {
    var that = this;
    wx.scanCode({
      success: function success(res) {
        that.setData({
          expressValue: res.result
        });
        that.searchExpress();
      }
    });
  },

  /**
   * 打电话
   * @param e
   */
  call: function call(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    });
  },

  /**
   * 查询详细内容
   * @param e
   */
  goToExpress: function goToExpress(e) {
    console.log(e);
    var number = e.currentTarget.dataset.number;
    wx.navigateTo({
      url: '../expressJump/expressJump?number=' + number
    });
  },

  /**
   * 删除记录
   */
  delete: function _delete(e) {
    var that = this;
    if (this.data.delStatus) return;
    this.setData({
      delStatus: true
    });
    var index = e.currentTarget.dataset.index;
    var history = this.data.history;
    this.setData({
      chosseIndex: index
    });
    setTimeout(function () {
      history.splice(index, 1);
      wx.setStorageSync('saveList', history);
      that.setData({
        history: wx.getStorageSync('saveList'),
        delStatus: false,
        chosseIndex: -1
      });
    }, 1200);
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
    // TODO: onReady
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    // TODO: onShow
    this.setData({
      history: wx.getStorageSync('saveList')
    });
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
      title: '向您推荐一个有趣的小程序，快来围观吧',
      path: '/pages/index/index'
    };
  }
});
//# sourceMappingURL=express.js.map
