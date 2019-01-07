'use strict';

// 获取全局应用程序实例对象
// const app = getApp()
var baseUrl = 'https://qf-restapi.mdscj.com/xp_express';
var getExpressBy100 = '/kuaidi100/query';
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'expressJump'
  },
  /**
   * 拨打电话
   * @param e
   */
  callPhone: function callPhone(e) {
    // console.log(e)
    // console.log(1)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    });
  },

  /**
   * 存储记录
   */
  save: function save() {
    var list = wx.getStorageSync('saveList') || [];
    for (var item in list) {
      if (list[item].nubmer === this.data.number) {
        return wx.showModal({
          tilte: '已有信息',
          content: '亲爱的小主，您已经保存过啦',
          showCancel: false
        });
      }
    }
    var obj = {
      nubmer: this.data.number,
      company: this.data.expressInfo.logisticCode,
      traces: this.data.expressInfo.traces[0]
    };
    // console.log(obj)
    list.unshift(obj);
    wx.setStorageSync('saveList', list);
    wx.showModal({
      tilte: '保存成功',
      content: '以保存该快递记录',
      showCancel: false
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(e) {
    var that = this;
    this.setData({
      number: e.number
    });
    var obj = {
      url: baseUrl + getExpressBy100 + '?logisticsNo=' + e.number,
      success: function success(res) {
        console.log(res);
        if (!res.data.data) {
          var _obj = {
            logisticCode: '请检查您的快递单号',
            traces: [{ acceptStation: '未查询到该快递单号信息，请检查您的快递单号' }]
          };
          that.setData({
            expressInfo: _obj
          });
          return;
        }
        var result = res.data.data;
        var reg = /(\d{11,20})/;
        for (var item in result.traces) {
          var str = result.traces[item].acceptStation;
          // console.log(str)
          var phone = str.match(reg);
          // console.log(phone)
          if (phone) {
            result.traces[item].phone = phone[0];
          }
        }
        that.setData({
          expressInfo: result
        });
      }
    };
    wx.request(obj);
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
//# sourceMappingURL=expressJump.js.map
