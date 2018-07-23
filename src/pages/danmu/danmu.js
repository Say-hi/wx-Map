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
    content: [
      {
        t: '峰',
        size: 40,
        r: 0,
        g: 0,
        b: 0
      }
    ],
    contentFontSize: 100,
    longth: 0,
    contentColor: 'FFF000'
  },
  inputfinish (e) {
    let t = e.detail.value
    if (t.length <= 0) {
      wx.showToast({
        title: '请输入内容',
        icon: 'loading'
      })
      return
    }
    let tArr = t.split('')
    let content = []
    let s = {
      size: 40,
      r: 255,
      g: 255,
      b: 255
    }
    for (let v of tArr) {
      content.push(Object.assign(s, {t: v}))
    }
    this.setData({
     content
   })
  },
  chooseText (e) {
    this.setData({
      textIndex: e.currentTarget.dataset.index
    })
  },
  sliderchange (e) {
    if (e.currentTarget.dataset.type === 'size') this.data.content[this.data.textIndex].size = e.detail.value
    else if (e.currentTarget.dataset.type === 'r') this.data.content[this.data.textIndex].r = e.detail.value
    else if (e.currentTarget.dataset.type === 'g') this.data.content[this.data.textIndex].g = e.detail.value
    else if (e.currentTarget.dataset.type === 'b') this.data.content[this.data.textIndex].b = e.detail.value
    this.setData({
      content: this.data.content
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
    // this.checkLongth()
    // setTimeout(() => {
    //   this.textMove(5)
    // },100)
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
