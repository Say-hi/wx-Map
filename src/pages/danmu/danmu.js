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
        t: '给',
        size: 250,
        r: 0,
        g: 255,
        b: 255
      },
      {
        t: '强',
        size: 250,
        r: 255,
        g: 0,
        b: 255
      },
      {
        t: '哥',
        size: 250,
        r: 255,
        g: 255,
        b: 0
      },
      {
        t: '哥',
        size: 250,
        r: 255,
        g: 144,
        b: 255
      },
      {
        t: '打',
        size: 250,
        r: 144,
        g: 144,
        b: 144
      },
      {
        t: 'Call',
        size: 250,
        r: 20,
        g: 255,
        b: 144
      }
    ],
    colorArr: [
      {
        r: 255,
        g: 255,
        b: 255
      },
      {
        r: 10,
        g: 255,
        b: 255
      },
      {
        r: 255,
        g: 10,
        b: 255
      },
      {
        r: 255,
        g: 255,
        b: 10
      },
      {
        r: 10,
        g: 255,
        b: 10
      },
      {
        r: 255,
        g: 10,
        b: 10
      },
      {
        r: 255,
        g: 222,
        b: 173
      },
      {
        r: 148,
        g: 0,
        b: 211
      }
    ],
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
  showChange () {
    this.setData({
      show: !this.data.show
    })
  },
  inputfinish (e) {
    let t = e.detail.value
    if (t.length <= 0) {
      // wx.showToast({
      //   title: '请输入内容',
      //   icon: 'loading'
      // })
      return
    }
    let tArr = t.split('')
    let content = []
    let en = ''
    for (let v of tArr) {
      if (/[a-zA-Z]/.test(v)) {
        en += v
        if (!content.length) {
          content[0] = {
            size: 250,
            r: 255,
            g: 255,
            b: 255,
            t: en
          }
        } else {
          content[content.length - 1] = {
            size: 250,
            r: 255,
            g: 255,
            b: 255,
            t: en
          }
        }
        continue
      } else {
        en = ''
      }
      content.push({
        size: 250,
        r: 255,
        g: 255,
        b: 255,
        t: v
      })
    }
    this.setData({
      content,
      inputext: t
    })
  },
  chooseText (e) {
    if (e.currentTarget.dataset.index * 1 === this.data.textIndex * 1) {
      this.setData({
        textIndex: -1
      })
    } else {
      this.setData({
        textIndex: e.currentTarget.dataset.index
      })
    }
  },
  fastColor (e) {
    let {r, g, b} = e.currentTarget.dataset
    if (this.data.textIndex === -1) {
      for (let v of this.data.content) {
        v.r = r
        v.g = g
        v.b = b
      }
      this.setData({
        allR: r,
        allG: g,
        allB: b,
        content: this.data.content
      })
      return
    } else {
      this.data.content[this.data.textIndex].r = r
      this.data.content[this.data.textIndex].g = g
      this.data.content[this.data.textIndex].b = b
    }
    this.setData({
      content: this.data.content
    })
  },
  sliderchange (e) {
    if (e.currentTarget.dataset.type === 'size') {
      if (this.data.textIndex === -1) {
        for (let v of this.data.content) {
          v.size = e.detail.value
        }
        this.setData({
          content: this.data.content,
          allSize: e.detail.value
        })
        return
      }
      this.data.content[this.data.textIndex].size = e.detail.value
    } else if (e.currentTarget.dataset.type === 'r') {
      if (this.data.textIndex === -1) {
        for (let v of this.data.content) {
          v.r = e.detail.value
        }
        this.setData({
          content: this.data.content,
          allR: e.detail.value
        })
        return
      }
      this.data.content[this.data.textIndex].r = e.detail.value
    } else if (e.currentTarget.dataset.type === 'g') {
      if (this.data.textIndex === -1) {
        for (let v of this.data.content) {
          v.g = e.detail.value
        }
        this.setData({
          content: this.data.content,
          allG: e.detail.value
        })
        return
      }
      this.data.content[this.data.textIndex].g = e.detail.value
    } else if (e.currentTarget.dataset.type === 'b') {
      if (this.data.textIndex === -1) {
        for (let v of this.data.content) {
          v.b = e.detail.value
        }
        this.setData({
          content: this.data.content,
          allB: e.detail.value
        })
        return
      }
      this.data.content[this.data.textIndex].b = e.detail.value
    } else if (e.currentTarget.dataset.type === 'time') {
      this.setData({
        time: e.detail.value
      })
      return
    }
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
  },
  onShareAppMessage: function () {
    return {
      title: '手持弹幕神器，为你打CALL',
      path: '/pages/danmu/danmu'
    }
  }
})
