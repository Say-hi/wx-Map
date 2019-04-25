'use strict';

/**
 * Created by jwq on 2019/1/23.
 */
wx.cloud.init({
  traceUser: true
});
var db = wx.cloud.database();

module.exports = {
  db: db,
  login: function login() {
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: function success(res) {
          resolve(res.result);
        },
        fail: function fail(err) {
          reject(err);
        }
      });
    });
  },
  getPhotoKey: function getPhotoKey() {
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: 'getphotokey',
        success: function success(res) {
          resolve(res.result);
        },
        fail: function fail(err) {
          reject(err);
        }
      });
    });
  },
  getWeather: function getWeather(data) {
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: 'getweather',
        data: data,
        success: function success(res) {
          resolve(JSON.parse(res.result));
        },
        fail: function fail(err) {
          reject(err);
        }
      });
    });
  },
  getdatanote: function getdatanote(data) {
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: 'getdaynote',
        data: data,
        success: function success(res) {
          resolve(JSON.parse(res.result));
        },
        fail: function fail(err) {
          reject(err);
        }
      });
    });
  },
  getMusic: function getMusic() {
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: 'getmusic',
        success: function success(res) {
          resolve(JSON.parse(res.result));
        },
        fail: function fail(err) {
          reject(err);
        }
      });
    });
  },
  getTabBar: function getTabBar() {
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: 'gettabbar',
        success: function success(res) {
          resolve(JSON.parse(res.result));
        },
        fail: function fail(err) {
          reject(err);
        }
      });
    });
  },
  getExchangeRate: function getExchangeRate() {
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: 'getexchangerate',
        success: function success(res) {
          resolve(JSON.parse(res.result));
        },
        fail: function fail(err) {
          reject(err);
        }
      });
    });
  },
  getExpress: function getExpress(data) {
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: 'getexpress',
        data: data,
        success: function success(res) {
          resolve(JSON.parse(res.result));
        },
        fail: function fail(err) {
          reject(err);
        }
      });
    });
  },
  getbaidumap: function getbaidumap(data) {
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: 'baidumaplocation',
        data: data,
        success: function success(res) {
          resolve(JSON.parse(res.result));
        },
        fail: function fail(err) {
          reject(err);
        }
      });
    });
  },
  sendformid: function sendformid(data) {
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: 'sendmessage',
        data: data,
        success: function success(res) {
          resolve(res);
        },
        fail: function fail(err) {
          reject(err);
        }
      });
    });
  }
};
//# sourceMappingURL=cloud.js.map
