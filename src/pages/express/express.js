// 获取全局应用程序实例对象
// const app = getApp()
/*eslint-disable*/
const baseUrl = "https://qf-restapi.mdscj.com/xp_express";

/**
 * 获取热门快递公司列表
 * 无参数!
 */
const getExpressType = "/logistics/company/list";

/**
 * 获取快递具体信息，根据公司码
 * tid 时间戳，companyCode 公司码，logisticCode 快递单号!
 */
const getExpressMessage = "/logistics/search";

/**
 * 获取快递公司列表排序之后结果
 * 无参数!
 */
const getExpressAllType = "/logistics/company-by-sort";

/**
 *  获取快递具体信息，无需公司码，自动匹配
 *  logisticsNo  快递单号!
 */
const geMessageNoType = "/logistics/query";

/**
 *  根据快递单号从买到获取信息
 *  logisticsNo  快递单号!
 */
const geMessageMD = "/logistics/query-product-logisticsno";

/**
 *  根据快递单号获取可能的快递类型
 *  logisticsNo  快递单号!
 */
const  hotMatch = "/logistics/query-company-quickly";

/**
 * 使用快递100接口查询，根据快递单号,查询快递详情
 * logisticsNo  快递单号!
 */
const getExpressBy100 = "/kuaidi100/query";

/**
 * 使用快递100接口查询，根据快递单号，查询快递可能的快递公司
 * logisticsNo  快递单号!
 */
const getCompanyBy100 = "/kuaidi100/query-company-quickly";
/*eslint-enable*/
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'express'
  },
  /**
   * 获取输入的快递单号
   * @param e
   */
  inputExpress (e) {
    // console.log(e)
    this.setData({
      expressValue: e.detail.value
    })
  },
  /**
   * 搜索快递单号
   */
  searchExpress () {
    // let number = this.data.expressValue
    let number = 400064671499
    let obj = {
      url: baseUrl + geMessageNoType + '?logisticsNo=' + number,
      success (res) {
        console.log(res)
      }
    }
    wx.request(obj)
  },
  /**
   * 调用微信扫码
   */
  scanExpressCode () {
    let that = this
    wx.scanCode({
      success (res) {
        that.setData({
          expressValue: res.result
        })
        that.searchExpress()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // TODO: onLoad
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
