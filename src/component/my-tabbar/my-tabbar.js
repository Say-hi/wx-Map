// components/component-tag-name.js
// const app = getApp()
/*eslint-disable*/
const app = getApp()
let interstitialAd = null
let adList = ['adunit-4f07cc10a5456874', 'adunit-6e87d676cfe14f11', 'adunit-052131219397beeb', 'adunit-4f07cc10a5456874', 'adunit-6e87d676cfe14f11', 'adunit-052131219397beeb', 'adunit-4f07cc10a5456874', 'adunit-6e87d676cfe14f11', 'adunit-052131219397beeb', 'adunit-052131219397beeb']
Component({
  options: {
    addGlobalClass: true
  },
  data: {},
  lifetimes: {
    ready () {
      let that = this
      this.setData({
        selected: app.gs('selected') || 0
      })
      setTimeout(function () {
        if (app.gs('selected') <= 1) {
          that.setData({
            scrollid: 'index0'
          })
        } else {
          that.setData({
            scrollid: app.gs('scrollid')
          })
        }
      }, 10)
      if (app.gs('tabData')) {
        return this.setData({
          color: app.gs('tabData').color,
          selectedColor: app.gs('tabData').selectedColor,
          list: app.gs('tabData').list
        })
      }
      app.cloud().getTabBar().then(res => {
        app.su('tabData', res)
        that.setData({
          color: res.color,
          selectedColor: res.selectedColor,
          list: res.list
        })
      })
    }
  },
  pageLifetimes: {
    show () {
      // 在页面中定义插屏广告

// 在页面onLoad回调事件中创建插屏广告实例
      if (wx.createInterstitialAd) {
        interstitialAd = wx.createInterstitialAd({
          adUnitId: adList[Math.floor(Math.random() * 10)]
        })
      }

// 在适合的场景显示插屏广告
      if (interstitialAd) {
        interstitialAd.show().catch((err) => {
          console.error(err)
        })
      }
    }
  },
  methods: {
    goUrl(e) {
      if (e.currentTarget.dataset.index == this.data.selected) return
      if (e.currentTarget.dataset.type === 'navigate') {
        wx.navigateTo({
          url: e.currentTarget.dataset.path
        })
      } else {
        app.su('selected', e.currentTarget.dataset.index)
        wx.reLaunch({
          url: e.currentTarget.dataset.path
        })
      }
    }
  }
})
