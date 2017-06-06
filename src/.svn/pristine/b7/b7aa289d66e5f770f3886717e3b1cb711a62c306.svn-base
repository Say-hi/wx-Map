// 获取全局应用程序实例对象
const app = getApp()

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
  getVideoUrl () {
    let that = this
    let obj = {
      url: 'https://lf.snssdk.com/neihan/service/tabs/',
      success (res) {
        for (let i of res.data.data) {
          if (i.name === '视频') {
            let url = i.url.replace('http', 'https')
            that.setData({
              secondUrl: url
            })
            break
          }
        }
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
              videoArr: videoArr
            })
          }
        }
        app.wxrequest(ojbs)
      }
    }
    app.wxrequest(obj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // TODO: onLoad
    this.getVideoUrl()
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
