// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'money',
    // url: 'https://sapi.k780.com/?app=finance.rate',
    url2: 'https://www.qingsongriyu.com/currency2',
    curChoose: 'xxx',
    showFlag: false,
    first_number: false,
    itemArr: {
      USD: {
        img: '../../images/usd.png',
        country: 'USD',
        moneyKind: '美元/$'
      },
      CNY: {
        img: '../../images/cny.png',
        country: 'CNY',
        moneyKind: '人民币/￥'
      },
      HKD: {
        img: '../../images/hkd.png',
        country: 'HKD',
        moneyKind: '港币HK/￥'
      },
      EUR: {
        img: '../../images/eur.png',
        country: 'EUR',
        moneyKind: '欧元/€'
      }
    },
    caculateArr: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '←'
    ],
    rateArr: ['USD', 'CNY', 'HKD', 'EUR'],
    rateArr2: [],
    curIndex: 99
  },
  // touchStart (e) {
  //   this.setData({
  //     curIndex: e.currentTarget.dataset.index
  //   })
  // },
  // touchEnd () {
  //   this.setData({
  //     curIndex: 99
  //   })
  // },
  // 货币初始单位选择
  choose (e) {
    this.setData({
      curChoose: e.currentTarget.dataset.index,
      flag: true
    })
  },
  // 键盘
  number (e) {
    let that = this
    this.setData({
      curIndex: e.currentTarget.dataset.index
    })
    setTimeout(function () {
      that.setData({
        curIndex: 99
      })
    }, 100) // 因为在我写这个的时候还没有view上的hove-class属性， 所以这里是为了实现点击阴影的效果
    if (!this.data.flag) { // 首先判断用户是否选择了某个币种，如无退出告知用户
      return wx.showToast({
        title: '请选择币种',
        image: '../../images/keai.png',
        mask: true
      })
    }
    let cur = this.data.curChoose
    let number = e.currentTarget.dataset.index * 1 + 1
    let money = that.data.itemArr[cur].rate.toString().split(',').join('')
    // 第一次点击清空
    if (!this.data.first_number) {
      if (number < 10) {
        that.caculate(cur, number)
      } else if (number === 11) {
        that.caculate(cur, '0')
      }
      if (!that.data.showFlag) {
        that.setData({
          first_number: true
        })
      }
      that.setData({
        showFlag: true
      })
      return
    }
    // 非第一次点击
    if (money.indexOf('.') > 0 && number !== 12) {
      if (money.indexOf('.') + 2 === money.length - 1) {
        return wx.showToast({
          title: '不能有比分更小的啦',
          image: '../../images/hi_HL.png',
          mask: true
        })
      }
    } else {
      if (money.length > 12 && number !== 12) {
        return wx.showToast({
          title: '超出计算范围啦',
          image: '../../images/hi_HL.png',
          mask: true
        })
      }
    }
    if (number < 10) {
      that.caculate(cur, (money + number) * 1)
    } else if (number === 10) {
      if (money.indexOf('.') < 0) {
        that.data.itemArr[cur].rate += '.'
        that.setData({
          itemArr: that.data.itemArr
        })
      }
    } else if (number === 11) {
      if (money.indexOf('.') > 0) {
        that.data.itemArr[cur].rate += '0'
        that.setData({
          itemArr: that.data.itemArr
        })
        return
      }
      if (money === '0') {
        return
      }
      that.caculate(cur, (money + '0') * 1)
    } else if (number === 12) {
      let moneyDel = money.slice(0, money.length - 1)
      if (moneyDel === '') {
        return that.caculate(cur, '0')
      }
      that.caculate(cur, moneyDel * 1)
    }
  },
  // 计算
  caculate (scurs, moneys) {
    let scur = scurs || 'CNY'
    let money = moneys || 100
    let that = this
    let rateBase = this.data.itemArrUse
    let rateUse = this.data.itemArr
    let rateBaseMoney = rateBase[scur].rate.toString().split(',').join('') * 1
    let baseMoneyRate = money / (rateBaseMoney)
    for (let i in rateBase) {
      let ss = rateBase[i].rate.toString().split(',').join('') * 1
      let moneyUse = (Math.round(ss * baseMoneyRate * 100) / 100).toString()
      let moneyPointArr = []
      let getMoney = ''
      moneyPointArr = moneyUse.split('.')
      let moneyOne = moneyPointArr[0].split('').reverse()
      let lenght = moneyOne.length
      if (lenght >= 4) {
        for (let i = 1, j = 0; i <= Math.floor(lenght / 3); i++, j++) {
          if (moneyOne[3 * i + j]) {
            moneyOne.splice(3 * i + j, 0, ',')
          }
        }
      }
      getMoney = moneyOne.reverse().join('')
      if (moneyPointArr[1]) {
        getMoney = getMoney + '.' + moneyPointArr[1]
      }
      rateUse[i].rate = getMoney || moneyUse
    }
    that.setData({
      itemArr: rateUse
    })
  },
  // numberLong (e) {
  //   if (e.currentTarget.dataset.index * 1 + 1 === 12) {
  //     console.log(1)
  //   }
  // },
   /**
   * 生命周期函数--监听页面加载
   */
  getRate () {
    let that = this
    wx.showLoading({
      title: '更新数据中...',
      mask: true
    })
    wx.request({
      url: this.data.url2,
      method: 'GET',
      success (res) {
        wx.hideLoading()
        wx.stopPullDownRefresh()
        for (let i of res.data.common) {
          if (i.symbol === 'CNY') that.data.itemArr.CNY.rate = i.rate
          else if (i.symbol === 'USD') that.data.itemArr.USD.rate = i.rate
          else if (i.symbol === 'HKD') that.data.itemArr.HKD.rate = i.rate
          else if (i.symbol === 'EUR') that.data.itemArr.EUR.rate = i.rate
        }
        that.setData({
          itemArr: that.data.itemArr,
          itemArrUse: that.data.itemArr
        })
        that.caculate()
      }
    })
  },
  onLoad () {
    // TODO: onLoad
    // let that = this
    // let startArr = this.data.rateArr
    // startArr.shift()
    // for (let i = 0; i < startArr.length; i++) {
    //   that.getRate('USD', startArr[i])
    // }
    this.getRate()
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
    this.getRate()
  },
  onShareAppMessage: function () {
    return {
      title: '向您推荐一个有趣的小程序，快来围观吧',
      path: '/pages/index/index'
    }
  }
})
