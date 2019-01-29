'use strict';

// components/component-tag-name.js
// const app = getApp()
/*eslint-disable*/
var app = getApp();
Component({
  options: {
    addGlobalClass: true
  },
  data: {},
  lifetimes: {
    ready: function ready() {
      var that = this;
      this.setData({
        selected: app.gs('selected') || 0
      });
      setTimeout(function () {
        if (app.gs('selected') <= 1) {
          that.setData({
            scrollid: 'index0'
          });
        } else {
          that.setData({
            scrollid: app.gs('scrollid')
          });
        }
      }, 10);
      if (app.gs('tabData')) {
        return this.setData({
          color: app.gs('tabData').color,
          selectedColor: app.gs('tabData').selectedColor,
          list: app.gs('tabData').list
        });
      }
      app.cloud().getTabBar().then(function (res) {
        app.su('tabData', res);
        that.setData({
          color: res.color,
          selectedColor: res.selectedColor,
          list: res.list
        });
      });
    }
  },
  methods: {
    goUrl: function goUrl(e) {
      if (this.data.list.length > 4) {
        app.su('scrollid', 'index' + e.currentTarget.dataset.index);
      }
      if (e.currentTarget.dataset.index == this.data.selected) return;
      if (e.currentTarget.dataset.type === 'navigate') {
        wx.navigateTo({
          url: e.currentTarget.dataset.path
        });
      } else {
        app.su('selected', e.currentTarget.dataset.index);
        wx.reLaunch({
          url: e.currentTarget.dataset.path
        });
      }
    }
  }
});
//# sourceMappingURL=my-tabbar.js.map
