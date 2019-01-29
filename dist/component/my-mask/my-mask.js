"use strict";

// components/component-tag-name.js
// const app = getApp()
/*eslint-disable*/
Component({
  properties: {
    propMaskshow: {
      type: Boolean,
      value: false,
      observer: function observer() {
        this.setData({
          show: true
        });
        this._maskChange();
      }
    }
  },
  data: {
    maskShow: false
  },
  methods: {
    _maskChange: function _maskChange() {
      var _this = this;

      this.setData({
        maskShow: !this.data.maskShow
      });
      setTimeout(function () {
        _this.setData({
          closeChange: !_this.data.closeChange
        });
      }, 400);
    }
  }
});
//# sourceMappingURL=my-mask.js.map
