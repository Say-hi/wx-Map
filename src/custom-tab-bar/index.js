/*eslint-disable*/
Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [
      {
        pagePath: "/pages/index/index",
        iconPath: "/images/hi.png",
        selectedIconPath: "/images/hi_HL.png",
        text: "首页"
      },
      {
        pagePath: "/chatPage/pages/chat/chat",
        iconPath: "/images/hi.png",
        selectedIconPath: "/images/hi_HL.png",
        text: "闲聊"
      },
      {
        pagePath: "/pages/mine/mine",
        iconPath: "/images/money.png",
        selectedIconPath: "/images/money_HL.png",
        text: "我的"
      },
      {
        pagePath: "/pages/AppUrl/AppUrl",
        iconPath: "/images/hi.png",
        selectedIconPath: "/images/hi_HL.png",
        text: "AppUrl"
      },
      {
        pagePath: "/pages/danmu/danmu",
        iconPath: "/images/money.png",
        selectedIconPath: "/images/money_HL.png",
        text: "danmu"
      },
      {
        pagePath: "/pages/express/express",
        iconPath: "/images/hi.png",
        selectedIconPath: "/images/hi_HL.png",
        text: "express"
      },
      {
        pagePath: "/pages/joke/joke",
        iconPath: "/images/money.png",
        selectedIconPath: "/images/money_HL.png",
        text: "joke"
      },
      {
        pagePath: "/pages/money/money",
        iconPath: "/images/hi.png",
        selectedIconPath: "/images/hi_HL.png",
        text: "money"
      },
      {
        pagePath: "/pages/more/more",
        iconPath: "/images/money.png",
        selectedIconPath: "/images/money_HL.png",
        text: "more"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      wx.switchTab({url: e.currentTarget.dataset.path})
      this.setData({
        selected: e.currentTarget.dataset.index
      })
    }
  }
})