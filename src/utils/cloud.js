/**
 * Created by jwq on 2019/1/23.
 */
wx.cloud.init({
  traceUser: true
})
const db = wx.cloud.database()

module.exports = {
  db,
  login () {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success (res) {
          resolve(res.result)
        },
        fail (err) {
          reject(err)
        }
      })
    })
  },
  getPhotoKey () {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'getphotokey',
        success (res) {
          resolve(res.result)
        },
        fail (err) {
          reject(err)
        }
      })
    })
  },
  getWeather (data) {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'getweather',
        data,
        success (res) {
          resolve(JSON.parse(res.result))
        },
        fail (err) {
          reject(err)
        }
      })
    })
  },
  getdatanote (data) {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'getdaynote',
        data,
        success (res) {
          resolve(JSON.parse(res.result))
        },
        fail (err) {
          reject(err)
        }
      })
    })
  },
  getMusic () {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'getmusic',
        success (res) {
          resolve(JSON.parse(res.result))
        },
        fail (err) {
          reject(err)
        }
      })
    })
  },
  getTabBar () {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'gettabbar',
        success (res) {
          resolve(JSON.parse(res.result))
        },
        fail (err) {
          reject(err)
        }
      })
    })
  },
  getExchangeRate () {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'getexchangerate',
        success (res) {
          resolve(JSON.parse(res.result))
        },
        fail (err) {
          reject(err)
        }
      })
    })
  },
  getExpress (data) {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'getexpress',
        data,
        success (res) {
          resolve(JSON.parse(res.result))
        },
        fail (err) {
          reject(err)
        }
      })
    })
  },
  getbaidumap (data) {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'baidumaplocation',
        data,
        success (res) {
          resolve(JSON.parse(res.result))
        },
        fail (err) {
          reject(err)
        }
      })
    })
  },
  sendformid (data) {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'sendmessage',
        data,
        success (res) {
          resolve(res)
        },
        fail (err) {
          reject(err)
        }
      })
    })
  }
}
