// 获取全局应用程序实例对象
// const app = getApp()
const baseUrl = 'https://qf-restapi.mdscj.com/xp_express'
const getExpressBy100 = '/kuaidi100/query'
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
  callPhone (e) {
    // console.log(e)
    // console.log(1)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },
  /**
   * 存储记录
   */
  save () {
    let list = wx.getStorageSync('saveList') || []
    for (var item in list) {
      if (list[item].nubmer === this.data.number) {
        return wx.showModal({
          tilte: '已有信息',
          content: '亲爱的小主，您已经保存过啦',
          showCancel: false
        })
      }
    }
    let obj = {
      nubmer: this.data.number,
      company: this.data.expressInfo.logisticCode,
      traces: this.data.expressInfo.traces[0]
    }
    // console.log(obj)
    list.unshift(obj)
    wx.setStorageSync('saveList', list)
    wx.showModal({
      tilte: '保存成功',
      content: '以保存该快递记录',
      showCancel: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (e) {
    let that = this
    this.setData({
      number: e.number
    })
    let obj = {
      url: baseUrl + getExpressBy100 + '?logisticsNo=' + e.number,
      success (res) {
        console.log(res)
        if (!res.data.data) {
          let obj = {
            logisticCode: '请检查您的快递单号',
            traces: [{acceptStation: '未查询到该快递单号信息，请检查您的快递单号'}]
          }
          that.setData({
            expressInfo: obj
          })
          return
        }
        var result = res.data.data
        var reg = /(\d{11,20})/
        for (var item in result.traces) {
          let str = result.traces[item].acceptStation
          // console.log(str)
          let phone = str.match(reg)
          // console.log(phone)
          if (phone) {
            result.traces[item].phone = phone[0]
          }
        }
        that.setData({
          expressInfo: result
        })
      }
    }
    wx.request(obj)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // TODO: onReady
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // TODO: onShow
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    // TODO: onHide
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
