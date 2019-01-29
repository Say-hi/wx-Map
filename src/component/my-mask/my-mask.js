// components/component-tag-name.js
// const app = getApp()
/*eslint-disable*/
Component({
  properties: {
    propMaskshow: {
      type: Boolean,
      value: false,
      observer () {
        this.setData({
          show: true
        })
        this._maskChange()
      }
    }
  },
  data: {
    maskShow: false
  },
  methods: {
    _maskChange () {
      this.setData({
        maskShow: !this.data.maskShow
      })
      setTimeout(() => {
        this.setData({
          closeChange: !this.data.closeChange
        })
      }, 400)
    }
  }
})
