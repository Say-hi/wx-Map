// components/component-tag-name.js
// const app = getApp()
/*eslint-disable*/
const app = getApp()
const adList = ['adunit-15c9aebab12c662a', 'adunit-8645b4208690d115', 'adunit-15c9aebab12c662a', 'adunit-8645b4208690d115', 'adunit-15c9aebab12c662a', 'adunit-8645b4208690d115', 'adunit-15c9aebab12c662a', 'adunit-8645b4208690d115', 'adunit-15c9aebab12c662a', 'adunit-8645b4208690d115', 'adunit-15c9aebab12c662a', 'adunit-8645b4208690d115']
let videoAd = null
Component({
  properties: {},
  data: {
    show: false,
    currentIndex: -1
  },
  lifetimes: {
    ready () {
      if (wx.createRewardedVideoAd) {
        videoAd = wx.createRewardedVideoAd({
          adUnitId: adList[Math.floor(Math.random() * 10)]
        })
        videoAd.onError(res => {
          console.log('onError', res)
        })
      }
      let that = this
      if (app.gs('musicPlay')) {
        this.setData({
          musicPlay: app.gs('musicPlay')
        })
        wx.playBackgroundAudio({
          dataUrl: app.gs('musicPlay').music,
          title: app.gs('musicPlay').name,
          coverImgUrl: app.gs('musicPlay').image
        })
      }
      if (!app.gs('musicList')) {
        app.cloud().getMusic().then(res => {
          app.su('musicList', res)
          that.setData({
            musicList: res
          })
        })
      } else {
        this.setData({
          musicList: app.gs('musicList')
        })
      }
    }
  },
  methods: {
    _getTemplate (e)  {
      // app.cloud().sendformid({formid: e.detail.formId})
      //   .then(res => {
      //     console.log(res)
      //   }, err => {
      //     console.log(err)
      //   })
      // 在页面中定义插屏广告
      if (this.data.currentIndex < 0 && !this.data.show) {
        if (videoAd) {
          videoAd.show().catch(() => {
            videoAd.load()
              .then(() => videoAd.show())
              .catch(err => {
                console.log(err)
                console.log('激励视频 广告显示失败')
              })
          })
        }
      }
    },
    _playMusic (e) {
      if (e.currentTarget.dataset.index == this.data.currentIndex) {
        wx.stopBackgroundAudio()
        this.setData({
          musicPlay: null,
          currentIndex: -1
        })
        return
      }
      wx.playBackgroundAudio({
        dataUrl: this.data.musicList[e.currentTarget.dataset.index].music,
        title: this.data.musicList[e.currentTarget.dataset.index].name,
        coverImgUrl: this.data.musicList[e.currentTarget.dataset.index].image
      })
      app.su('musicPlay', this.data.musicList[e.currentTarget.dataset.index])
      this.setData({
        currentIndex: e.currentTarget.dataset.index,
        musicPlay: this.data.musicList[e.currentTarget.dataset.index]
      })
    },
    _showMusic () {
      this.setData({
        show: !this.data.show
      })
    }
  },
  pageLifetimes: {
    show () {

    }
  }
})
