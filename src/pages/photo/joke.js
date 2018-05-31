/*eslint-disable*/
// 获取全局应用程序实例对象
const app = getApp()
const md5 = require('../../utils/wxmd5')
const upng = require('../../utils/UPNG.js')
const app_key = 'VTtsGXNXUeTqzIBX'
const app_id = 1106941934
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showImg: '',
    qrcode: '../../images/qrcode.jpg'
  },
  chooseImage () {
    let that = this
    wx.chooseImage({
      count: 1,
      success (res) {
        that.setData({
          showImg: res.tempFilePaths[0],
          BackshowImg: null
        })
      }
    })
  },
  getBottomList () {
    let that = this
    app.wxrequest({
      url: app.data.baseDomain + '/api/tuFun.json',
      data: {},
      success (res) {
        console.log(res)
        that.setData({
          showImg: res.data[0].showImg,
          bottomList: res.data[0].bottomList
        })
      }
    })
  },
  // 获取腾讯AI机器视觉api
  getApi (base64Img, model) {
    let that = this

    let params = {
      app_id: app_id,
      image: base64Img,
      nonce_str: Math.random().toString(36).substr(2),
      model: model || 1,
      time_stamp: parseInt(new Date().getTime() / 1000).toString()
    }
    params['sign'] = this.genRequestSign(params)
    // console.log(params);
    app.wxrequest({
      url: 'https://api.ai.qq.com/fcgi-bin/ptu/ptu_facemerge',
      method: 'POST',
      header: 'application/x-www-form-urlencoded',
      data: params,
      success (res) {
        wx.hideLoading()
        if (res.data.ret != 0) {
          return wx.showToast({
            title: '酷到无法识别'
          })
        }
        that.setData({
          BackshowImg: "data:image/png;base64," + res.data.data.image
        })
      },
      fail () {
        wx.hideLoading()
        wx.showToast({
          title: '囧服务器崩了'
        })
      }
    })
  },
  genRequestSign (params)  {
    // 1. 对请求参数按字典升序排序
    params = this.sortObject(params)
    // 2. 拼接键值对，value部分进行URL编码
    let paramStr = ''
    let keys = Object.keys(params)
    for (let idx in keys) {
      let key = keys[idx]
      paramStr += key + '=' + encodeURIComponent(params[key]) + '&'
    }
    // 3. 拼接key
    paramStr += 'app_key=' + app_key
    // 4. md5
    return md5.hexMD5(paramStr).toUpperCase()
  },
  sortObject (obj)  {
    var keys = Object.keys(obj).sort()
    var newObj = {}
    for (var i = 0; i < keys.length; i++) {
      newObj[keys[i]] = obj[keys[i]]
    }
    return newObj
  },

  getbase64 (e) {
    wx.showLoading({
      title: '努力转换中',
      mask: true
    })
    let that = this
    wx.createSelectorQuery().select('#showImg').fields({
      size: true
    }, function (res) {
      that.setCanvas(res.width, res.height, e.currentTarget.dataset.model)
    }).exec()
  },

  setCanvas (wdith, height, model) {
    let that = this
    this.setData({
      wdith,
      height
    })
    let ctx = wx.createCanvasContext('myCanvas')
    ctx.drawImage(this.data.showImg, 0, 0, wdith, height)
    ctx.draw(false, () => {
      // 2. 获取图像数据， API 1.9.0
      wx.canvasGetImageData({
        canvasId: 'myCanvas',
        x: 0,
        y: 0,
        width: wdith,
        height: height,
        success(res) {
          let platform = wx.getSystemInfoSync().platform
          if (platform == 'ios') {
            // 兼容处理：ios获取的图片上下颠倒
            res = that.reverseImgData(res)
          }
          // 3. png编码
          let pngData = upng.encode([res.data.buffer], res.width, res.height)
          // 4. base64编码
          let base64 = wx.arrayBufferToBase64(pngData)
          // let base64 = "data:image/png;base64," + wx.arrayBufferToBase64(pngData)
          that.getApi(base64, model)
        }
      })
    })
  },
  reverseImgData(res) {
    var w = res.width
    var h = res.height
    let con = 0
    for (var i = 0; i < h / 2; i++) {
      for (var j = 0; j < w * 4; j++) {
        con = res.data[i * w * 4 + j]
        res.data[i * w * 4 + j] = res.data[(h - i - 1) * w * 4 + j]
        res.data[(h - i - 1) * w * 4 + j] = con
      }
    }
    return res
  },
  savePhoto () {
    let that = this
    wx.createSelectorQuery().select('#showImg').fields({
      size: true
    }, function (res) {
      that.shareImg(res.width, res.height)
    }).exec()
  },
  // 绘图分享图片
  shareImg (ctxW, ctxH) {
    let that = this
    wx.getImageInfo({
      src: that.data.BackshowImg,
      success (res) {
        console.log(res)
      }
    })
    let ctx = wx.createCanvasContext('myCanvas')
    let XS = that.data.windowWidth / 375
    ctx.setFillStyle('#ffffff')
    ctx.fillRect(0, 0, ctxW, ctxH)
    ctx.drawImage(that.data.BackshowImg, 0, 0, ctxW, ctxH)
    ctx.setFontSize(14 * XS)
    ctx.setFillStyle('#999999')
    ctx.setTextAlign('right')
    ctx.setTextBaseline('middle')
    ctx.fillText('长按识别小程序码访问', ctxW / 2 - 90 * XS, 170 * XS + 100)
    ctx.drawImage(that.data.qrcode, ctxW - 40, ctxH - 40, 40, 40)
    ctx.draw()
    setTimeout(() => {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function (res) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success () {
              wx.showToast({
                title: '图片保存成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    }, 200)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // TODO: onLoad
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          pixelRatio: res.pixelRatio,
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        })
      }
    })
    this.getBottomList()
    // this.getApi()
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
    let that = this
    let choose = this.data.choose
    if (choose === this.data.videoArr.length) {
      let ojbs = {
        url: that.data.secondUrl,
        success (res) {
          let videoArr = []
          for (let i of res.data.data.data) {
            // console.log(i['group']['480p_video']['url_list'][0])
            videoArr.push(i['group']['480p_video']['url_list'][0]['url'].replace('http://', 'https://'))
          }
          // let videoArr = res.data.data.data
          that.setData({
            choose: 0,
            videoArr: videoArr
          })
        }
      }
      app.wxrequest(ojbs)
    } else {
      ++choose
      this.setData({
        choose: choose
      })
    }
    this.setData({
      autoplays: true
    })
    this.videoContext = wx.createVideoContext('videos')
    setTimeout(function () {
      that.videoContext.play()
      wx.stopPullDownRefresh()
    }, 200)
  }
})
