// components/component-tag-name.js
// const app = getApp()
/*eslint-disable*/
const app = getApp()
Component({
  properties: {},
  data: {
    show: false
  },
  lifetimes: {
    ready () {
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
  }
})
