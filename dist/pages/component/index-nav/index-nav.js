'use strict';

// components/component-tag-name.js
// const app = getApp()
Component({
  externalClasses: ['mask', 'mask-in'],
  properties: {
    propRotate: {
      type: Number,
      value: 0,
      observer: function observer(newValue) {
        this._setRotate(newValue);
      }
    },
    propCenter: {
      type: String,
      value: 'fff000',
      observer: function observer(newValue) {
        this._setCenter(newValue);
      }
    },
    propStart: {
      type: String,
      value: 'fff000',
      observer: function observer(newValue) {
        this._setStart(newValue);
      }
    },
    propEnd: {
      type: String,
      value: 'fff000',
      observer: function observer(newValue) {
        this._setEnd(newValue);
      }
    }
  },
  data: {
    navArr: [{
      url: '../express/express',
      type: 'navigate',
      name: '快递查询'
    }, {
      url: '../AppUrl/AppUrl',
      type: 'navigate',
      name: '地图导航'
    }, {
      url: '../voice/voice',
      type: 'navigate',
      name: '聆听歌曲'
    }, {
      url: '../danmu/danmu',
      type: 'reLaunch',
      name: '手持弹幕神器'
    }, {
      url: '/pagesOne/pages/phone/phone',
      type: 'navigate',
      name: '搞怪来电'
    }],
    showT: false,
    show: false,
    color_start: '',
    color_center: '',
    color_end: '',
    rotate: 0
  },
  methods: {
    _setCenter: function _setCenter(value) {
      if (this.data.color_center) return;
      this.setData({
        color_center: value
      });
    },
    _setStart: function _setStart(vlaue) {
      if (this.data.color_start) return;
      this.setData({
        color_start: vlaue
      });
    },
    _setEnd: function _setEnd(value) {
      if (this.data.color_end) return;
      this.setData({
        color_end: value
      });
    },
    _setRotate: function _setRotate(value) {
      if (this.data.rotate) return;
      this.setData({
        rotate: value
      });
    },
    _show: function _show() {
      var that = this;
      if (this.data.show) {
        that.setData({
          show: !that.data.show
        });
        setTimeout(function () {
          that.setData({
            showT: !that.data.showT
          });
        }, 490);
      } else {
        this.setData({
          showT: !that.data.showT,
          show: !that.data.show
        });
      }
    }
  }
});
//# sourceMappingURL=index-nav.js.map
