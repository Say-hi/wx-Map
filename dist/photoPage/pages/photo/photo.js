'use strict';

/*eslint-disable*/
// 获取全局应用程序实例对象
var app = getApp();
var md5 = require('../wxmd5');
var upng = require('../UPNG.js');
var manager = wx.getFileSystemManager();
var base64 = null;
var app_key = null;
var app_id = null;
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */

  data: {
    showImg: 'https://7465-teach-1258324355.tcb.qcloud.la/image/photo2.png',
    showImgs: 'https://7465-teach-1258324355.tcb.qcloud.la/image/photo2.png',
    lists: [{
      title: '人物滤镜',
      style: 'background-image: linear-gradient(135deg, #FAD7A1 0%, #E96D71 100%)',
      choose: [{
        t: '黛紫',
        type: 1,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/1.png'
      }, {
        t: '岩井',
        type: 2,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/2.png'
      }, {
        t: '粉嫩',
        type: 3,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/3.png'
      }, {
        t: '错觉',
        type: 4,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/4.png'
      }, {
        t: '暖阳',
        type: 5,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/5.png'
      }, {
        t: '浪漫',
        type: 6,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/6.png'
      }, {
        t: '蔷薇',
        type: 7,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/7.gif'
      }, {
        t: '睡莲',
        type: 8,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/8.gif'
      }, {
        t: '糖果玫瑰',
        type: 9,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/9.gif'
      }, {
        t: '新叶',
        type: 10,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/10.gif'
      }, {
        t: '尤加利',
        type: 11,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/11.gif'
      }, {
        t: '墨',
        type: 12,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/12.png'
      }, {
        t: '墨',
        type: 12,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/12.png'
      }, {
        t: '玫瑰初雪',
        type: 13,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/13.png'
      }, {
        t: '樱桃布丁',
        type: 14,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/14.png'
      }, {
        t: '白茶',
        type: 15,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/15.png'
      }, {
        t: '甜薄荷',
        type: 16,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/16.png'
      }, {
        t: '樱红',
        type: 17,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/17.png'
      }, {
        t: '圣代',
        type: 18,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/18.png'
      }, {
        t: '莫斯科',
        type: 19,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/19.png'
      }, {
        t: '冲绳',
        type: 20,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/20.png'
      }, {
        t: '粉碧',
        type: 21,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/21.png'
      }, {
        t: '地中海',
        type: 22,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/22.png'
      }, {
        t: '首尔',
        type: 23,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/23.png'
      }, {
        t: '佛罗伦萨',
        type: 24,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/24.png'
      }, {
        t: '札幌	',
        type: 25,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/25.png'
      }, {
        t: '栀子	',
        type: 26,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/26.png'
      }, {
        t: '东京	',
        type: 27,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/27.png'
      }, {
        t: '昭和	',
        type: 28,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/28.png'
      }, {
        t: '自然	',
        type: 29,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/29.gif'
      }, {
        t: '清逸	',
        type: 30,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/30.png'
      }, {
        t: '染	',
        type: 31,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/31.png'
      }, {
        t: '甜美	',
        type: 32,
        ico: 'https://c.jiangwenqiang.com/api/peoplefilter/32.png'
      }],
      fn: 'peopleFilter'
    }, {
      title: '风景滤镜',
      style: 'background-image: linear-gradient(135deg, #30E3CA 0%, #11999E 100%)',
      choose: [{
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/1-01.jpg',
        type: 1
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/2-03.jpg',
        type: 2
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/3-04.jpg',
        type: 3
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/4-07.jpg',
        type: 4
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/5-08.jpg',
        type: 5
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/6-09.jpg',
        type: 6
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/7-11.jpg',
        type: 7
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/8-12.jpg',
        type: 8
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/9-13.jpg',
        type: 9
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/10-16.jpg',
        type: 10
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/11-17.jpg',
        type: 11
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/12-19.jpg',
        type: 12
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/13-28.jpg',
        type: 13
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/14-30.jpg',
        type: 14
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/15-65.jpg',
        type: 15
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/16-80.jpg',
        type: 16
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/17-87.jpg',
        type: 17
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/18-125.jpg',
        type: 18
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/19-149.jpg',
        type: 19
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/20-154.jpg',
        type: 20
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/21-172.jpg',
        type: 21
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/22-176.jpg',
        type: 22
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/23-206.jpg',
        type: 23
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/24-207.jpg',
        type: 24
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/25-215.jpg',
        type: 25
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/26-225.jpg',
        type: 26
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/27-226.jpg',
        type: 27
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/28-239.jpg',
        type: 28
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/29-246.jpg',
        type: 29
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/30-326.jpg',
        type: 30
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/31-334.jpg',
        type: 31
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/32-340.jpg',
        type: 32
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/33-348.jpg',
        type: 33
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/34-350.jpg',
        type: 34
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/35-356.jpg',
        type: 35
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/36-357.jpg',
        type: 36
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/37-359.jpg',
        type: 37
      }, {
        t: '',
        ico: 'https://c.jiangwenqiang.com/api/worldfilter/38-391.jpg',
        type: 38
      }],
      fn: 'worldFilter'
    }, {
      title: '人脸变妆',
      style: 'background-image: linear-gradient(135deg, #CE9FFC 0%, #7367F0 100%)',
      choose: [{
        t: '埃及妆',
        ico: 'https://c.jiangwenqiang.com/api/facechange/1.jpg',
        type: 1
      }, {
        t: '巴西土著妆',
        ico: 'https://c.jiangwenqiang.com/api/facechange/2.jpg',
        type: 2
      }, {
        t: '灰姑娘妆',
        ico: 'https://c.jiangwenqiang.com/api/facechange/3.jpg',
        type: 3
      }, {
        t: '恶魔妆',
        ico: 'https://c.jiangwenqiang.com/api/facechange/4.jpg',
        type: 4
      }, {
        t: '武媚娘妆	',
        ico: 'https://c.jiangwenqiang.com/api/facechange/5.jpg',
        type: 5
      }, {
        t: '星光薰衣草',
        ico: 'https://c.jiangwenqiang.com/api/facechange/6.png',
        type: 6
      }, {
        t: '花千骨',
        ico: 'https://c.jiangwenqiang.com/api/facechange/7.jpg',
        type: 7
      }, {
        t: '僵尸妆',
        ico: 'https://c.jiangwenqiang.com/api/facechange/8.jpg',
        type: 8
      }, {
        t: '爱国妆',
        ico: 'https://c.jiangwenqiang.com/api/facechange/9.png',
        type: 9
      }, {
        t: '小胡子妆',
        ico: 'https://c.jiangwenqiang.com/api/facechange/10.jpg',
        type: 10
      }, {
        t: '美羊羊妆',
        ico: 'https://c.jiangwenqiang.com/api/facechange/11.jpg',
        type: 11
      }, {
        t: '火影鸣人妆',
        ico: 'https://c.jiangwenqiang.com/api/facechange/12.jpg',
        type: 12
      }, {
        t: '刀马旦妆	',
        ico: 'https://c.jiangwenqiang.com/api/facechange/13.jpg',
        type: 13
      }, {
        t: '泡泡妆	',
        ico: 'https://c.jiangwenqiang.com/api/facechange/14.jpg',
        type: 14
      }, {
        t: '桃花妆',
        ico: 'https://c.jiangwenqiang.com/api/facechange/15.jpg',
        type: 15
      }, {
        t: '女皇妆',
        ico: 'https://c.jiangwenqiang.com/api/facechange/16.jpg',
        type: 16
      }, {
        t: '权志龙',
        ico: 'https://c.jiangwenqiang.com/api/facechange/17.jpg',
        type: 17
      }, {
        t: '撩妹妆',
        ico: 'https://c.jiangwenqiang.com/api/facechange/18.png',
        type: 18
      }, {
        t: '印第安妆',
        ico: 'https://c.jiangwenqiang.com/api/facechange/19.jpg',
        type: 19
      }, {
        t: '印度妆',
        ico: 'https://c.jiangwenqiang.com/api/facechange/20.jpg',
        type: 20
      }, {
        t: '萌兔妆',
        ico: 'https://c.jiangwenqiang.com/api/facechange/21.jpg',
        type: 21
      }, {
        t: '大圣妆',
        ico: 'https://c.jiangwenqiang.com/api/facechange/22.png',
        type: 22
      }],
      fn: 'faceChange'
    }, {
      title: '大头贴',
      style: 'background-image: linear-gradient(135deg, #90F7EC 0%, #32CCBC 100%)',
      choose: [{
        t: 'NewDay',
        ico: 'https://c.jiangwenqiang.com/api/bighead/1.png',
        type: 1
      }, {
        t: '欢乐球吃球1',
        ico: 'https://c.jiangwenqiang.com/api/bighead/2.jpg',
        type: 2
      }, {
        t: 'Bonvoyage',
        ico: 'https://c.jiangwenqiang.com/api/bighead/3.jpg',
        type: 3
      }, {
        t: 'Enjoy',
        ico: 'https://c.jiangwenqiang.com/api/bighead/4.png',
        type: 4
      }, {
        t: 'ChickenSpring',
        ico: 'https://c.jiangwenqiang.com/api/bighead/5.png',
        type: 5
      }, {
        t: 'ChristmasShow',
        ico: 'https://c.jiangwenqiang.com/api/bighead/6.png',
        type: 6
      }, {
        t: 'ChristmasSnow',
        ico: 'https://c.jiangwenqiang.com/api/bighead/7.png',
        type: 7
      }, {
        t: 'CircleCat',
        ico: 'https://c.jiangwenqiang.com/api/bighead/8.jpg',
        type: 8
      }, {
        t: 'CircleMouse',
        ico: 'https://c.jiangwenqiang.com/api/bighead/9.jpg',
        type: 9
      }, {
        t: 'CirclePig',
        ico: 'https://c.jiangwenqiang.com/api/bighead/10.jpg',
        type: 10
      }, {
        t: 'Comicmn',
        ico: 'https://c.jiangwenqiang.com/api/bighead/11.png',
        type: 11
      }, {
        t: 'CuteBaby',
        ico: 'https://c.jiangwenqiang.com/api/bighead/12.jpg',
        type: 12
      }, {
        t: 'Envolope',
        ico: 'https://c.jiangwenqiang.com/api/bighead/13.jpg',
        type: 13
      }, {
        t: 'Fairytale',
        ico: 'https://c.jiangwenqiang.com/api/bighead/14.jpg',
        type: 14
      }, {
        t: 'GoodNight',
        ico: 'https://c.jiangwenqiang.com/api/bighead/15.jpg',
        type: 15
      }, {
        t: 'HalloweenNight',
        ico: 'https://c.jiangwenqiang.com/api/bighead/16.jpg',
        type: 16
      }, {
        t: 'LovelyDay',
        ico: 'https://c.jiangwenqiang.com/api/bighead/17.jpg',
        type: 17
      }, {
        t: 'Newyear2017',
        ico: 'https://c.jiangwenqiang.com/api/bighead/18.png',
        type: 18
      }, {
        t: 'PinkSunny',
        ico: 'https://c.jiangwenqiang.com/api/bighead/19.png',
        type: 19
      }, {
        t: 'KIRAKIRA',
        ico: 'https://c.jiangwenqiang.com/api/bighead/20.jpg',
        type: 20
      }, {
        t: '欢乐球吃球2',
        ico: 'https://c.jiangwenqiang.com/api/bighead/21.jpg',
        type: 21
      }, {
        t: 'SnowWhite',
        ico: 'https://c.jiangwenqiang.com/api/bighead/22.png',
        type: 22
      }, {
        t: 'SuperStar',
        ico: 'https://c.jiangwenqiang.com/api/bighead/23.png',
        type: 23
      }, {
        t: 'WonderfulWork',
        ico: 'https://c.jiangwenqiang.com/api/bighead/24.png',
        type: 24
      }, {
        t: 'Cold',
        ico: 'https://c.jiangwenqiang.com/api/bighead/25.png',
        type: 25
      }, {
        t: '狼人杀守卫',
        ico: 'https://c.jiangwenqiang.com/api/bighead/26.jpg',
        type: 26
      }, {
        t: '狼人杀猎人',
        ico: 'https://c.jiangwenqiang.com/api/bighead/27.jpg',
        type: 27
      }, {
        t: '狼人杀预言家',
        ico: 'https://c.jiangwenqiang.com/api/bighead/28.jpg',
        type: 28
      }, {
        t: '狼人杀村民',
        ico: 'https://c.jiangwenqiang.com/api/bighead/29.jpg',
        type: 29
      }, {
        t: '狼人杀女巫',
        ico: 'https://c.jiangwenqiang.com/api/bighead/30.jpg',
        type: 30
      }, {
        t: '狼人杀狼人',
        ico: 'https://c.jiangwenqiang.com/api/bighead/31.jpg',
        type: 31
      }],
      fn: 'bigHead'
    }, {
      title: '颜龄检测',
      style: 'background-image: linear-gradient(135deg, #5EFCE8 0%, #736EFE 100%)',
      choose: [{
        t: '点击检测',
        ico: 'https://7465-teach-1258324355.tcb.qcloud.la/image/facetest.jpg',
        type: 1
      }],
      fn: 'peopleAge'
    }, {
      title: '人脸美妆',
      style: 'background-image: linear-gradient(135deg, #FAD7A1 0%, #E96D71 100%)',
      choose: [{
        t: '日系妆	芭比粉',
        ico: 'https://c.jiangwenqiang.com/api/peoplebeauty/1.png',
        type: 1
      }, {
        t: '日系妆	清透',
        ico: 'https://c.jiangwenqiang.com/api/peoplebeauty/2.png',
        type: 2
      }, {
        t: '日系妆	烟灰',
        ico: 'https://c.jiangwenqiang.com/api/peoplebeauty/3.png',
        type: 3
      }, {
        t: '日系妆	自然',
        ico: 'https://c.jiangwenqiang.com/api/peoplebeauty/4.png',
        type: 4
      }, {
        t: '日系妆	樱花粉',
        ico: 'https://c.jiangwenqiang.com/api/peoplebeauty/5.png',
        type: 5
      }, {
        t: '日系妆	原宿红',
        ico: 'https://c.jiangwenqiang.com/api/peoplebeauty/6.png',
        type: 6
      }, {
        t: '韩妆	闪亮',
        ico: 'https://c.jiangwenqiang.com/api/peoplebeauty/7.png',
        type: 7
      }, {
        t: '韩妆	闪亮',
        ico: 'https://c.jiangwenqiang.com/api/peoplebeauty/8.png',
        type: 8
      }, {
        t: '韩妆	粉嫩',
        ico: 'https://c.jiangwenqiang.com/api/peoplebeauty/9.png',
        type: 9
      }, {
        t: '韩妆	自然	',
        ico: 'https://c.jiangwenqiang.com/api/peoplebeauty/10.png',
        type: 10
      }, {
        t: '韩妆	清透',
        ico: 'https://c.jiangwenqiang.com/api/peoplebeauty/11.png',
        type: 11
      }, {
        t: '韩妆	大地色',
        ico: 'https://c.jiangwenqiang.com/api/peoplebeauty/12.png',
        type: 12
      }, {
        t: '韩妆	玫瑰',
        ico: 'https://c.jiangwenqiang.com/api/peoplebeauty/13.png',
        type: 13
      }, {
        t: '裸妆	自然',
        ico: 'https://c.jiangwenqiang.com/api/peoplebeauty/14.png',
        type: 14
      }, {
        t: '裸妆	清透',
        ico: 'https://c.jiangwenqiang.com/api/peoplebeauty/15.png',
        type: 15
      }, {
        t: '裸妆	桃粉',
        ico: 'https://c.jiangwenqiang.com/api/peoplebeauty/16.png',
        type: 16
      }, {
        t: '裸妆	橘粉',
        ico: 'https://c.jiangwenqiang.com/api/peoplebeauty/17.png',
        type: 17
      }, {
        t: '裸妆	春夏',
        ico: 'https://c.jiangwenqiang.com/api/peoplebeauty/18.png',
        type: 18
      }, {
        t: '裸妆	秋冬',
        ico: 'https://c.jiangwenqiang.com/api/peoplebeauty/19.png',
        type: 19
      }, {
        t: '主题妆	经典复古',
        ico: 'https://c.jiangwenqiang.com/api/peoplebeauty/20.png',
        type: 20
      }, {
        t: '主题妆	性感混血',
        ico: 'https://c.jiangwenqiang.com/api/peoplebeauty/21.png',
        type: 21
      }, {
        t: '主题妆	炫彩明眸',
        ico: 'https://c.jiangwenqiang.com/api/peoplebeauty/22.png',
        type: 22
      }, {
        t: '主题妆	紫色魅惑',
        ico: 'https://c.jiangwenqiang.com/api/peoplebeauty/23.png',
        type: 23
      }],
      fn: 'peopleBeauty'
    }],
    chooseIndex: -1
  },
  showOriginal: function showOriginal() {
    this.setData({
      original: !this.data.original
    });
  },
  peopleBeauty: function peopleBeauty(base64Img, model) {
    var that = this;
    var params = {
      app_id: app_id,
      image: base64Img,
      nonce_str: Math.random().toString(36).substr(2),
      cosmetic: model.currentTarget.dataset.type || 1,
      time_stamp: parseInt(new Date().getTime() / 1000).toString()
    };
    params['sign'] = this.genRequestSign(params);
    // console.log(params);
    app.wxrequest({
      url: 'https://api.ai.qq.com/fcgi-bin/ptu/ptu_facecosmetic',
      method: 'POST',
      header: 'application/x-www-form-urlencoded',
      data: params,
      success: function success(res) {
        wx.hideLoading();
        if (res.data.ret != 0) {
          return wx.showToast({
            title: res.data.msg
          });
        }
        that.setData({
          BackshowImg: "data:image/png;base64," + res.data.data.image
        });
      },
      fail: function fail() {
        wx.hideLoading();
        wx.showToast({
          title: '囧服务器崩了'
        });
      }
    });
  },
  bigHead: function bigHead(base64Img, model) {
    var that = this;
    var params = {
      app_id: app_id,
      image: base64Img,
      nonce_str: Math.random().toString(36).substr(2),
      sticker: model.currentTarget.dataset.type || 1,
      time_stamp: parseInt(new Date().getTime() / 1000).toString()
    };
    params['sign'] = this.genRequestSign(params);
    // console.log(params);
    app.wxrequest({
      url: 'https://api.ai.qq.com/fcgi-bin/ptu/ptu_facesticker',
      method: 'POST',
      header: 'application/x-www-form-urlencoded',
      data: params,
      success: function success(res) {
        wx.hideLoading();
        if (res.data.ret != 0) {
          return wx.showToast({
            title: res.data.msg
          });
        }
        that.setData({
          BackshowImg: "data:image/png;base64," + res.data.data.image
        });
      },
      fail: function fail() {
        wx.hideLoading();
        wx.showToast({
          title: '囧服务器崩了'
        });
      }
    });
  },
  faceChange: function faceChange(base64Img, model) {
    var that = this;
    var params = {
      app_id: app_id,
      image: base64Img,
      nonce_str: Math.random().toString(36).substr(2),
      decoration: model.currentTarget.dataset.type || 1,
      time_stamp: parseInt(new Date().getTime() / 1000).toString()
    };
    params['sign'] = this.genRequestSign(params);
    // console.log(params);
    app.wxrequest({
      url: 'https://api.ai.qq.com/fcgi-bin/ptu/ptu_facedecoration',
      method: 'POST',
      header: 'application/x-www-form-urlencoded',
      data: params,
      success: function success(res) {
        wx.hideLoading();
        if (res.data.ret != 0) {
          return wx.showToast({
            title: res.data.msg
          });
        }
        that.setData({
          BackshowImg: "data:image/png;base64," + res.data.data.image
        });
      },
      fail: function fail() {
        wx.hideLoading();
        wx.showToast({
          title: '囧服务器崩了'
        });
      }
    });
  },
  worldFilter: function worldFilter(base64Img, model) {
    var that = this;
    var params = {
      app_id: app_id,
      image: base64Img,
      nonce_str: Math.random().toString(36).substr(2),
      session_id: Math.random().toString(36),
      filter: model.currentTarget.dataset.type || 1,
      time_stamp: parseInt(new Date().getTime() / 1000).toString()
    };
    params['sign'] = this.genRequestSign(params);
    // console.log(params);
    app.wxrequest({
      url: 'https://api.ai.qq.com/fcgi-bin/vision/vision_imgfilter',
      method: 'POST',
      header: 'application/x-www-form-urlencoded',
      data: params,
      success: function success(res) {
        wx.hideLoading();
        if (res.data.ret != 0) {
          return wx.showToast({
            title: res.data.msg
          });
        }
        that.setData({
          BackshowImg: "data:image/png;base64," + res.data.data.image
        });
      },
      fail: function fail() {
        wx.hideLoading();
        wx.showToast({
          title: '囧服务器崩了'
        });
      }
    });
  },

  // 人物滤镜
  peopleFilter: function peopleFilter(base64Img, model) {
    var that = this;
    var params = {
      app_id: app_id,
      image: base64Img,
      nonce_str: Math.random().toString(36).substr(2),
      filter: model.currentTarget.dataset.type || 1,
      time_stamp: parseInt(new Date().getTime() / 1000).toString()
    };
    params['sign'] = this.genRequestSign(params);
    // console.log(params);
    app.wxrequest({
      url: 'https://api.ai.qq.com/fcgi-bin/ptu/ptu_imgfilter',
      method: 'POST',
      header: 'application/x-www-form-urlencoded',
      data: params,
      success: function success(res) {
        wx.hideLoading();
        if (res.data.ret != 0) {
          return wx.showToast({
            title: res.data.msg
          });
        }
        that.setData({
          BackshowImg: "data:image/png;base64," + res.data.data.image
        });
      },
      fail: function fail() {
        wx.hideLoading();
        wx.showToast({
          title: '囧服务器崩了'
        });
      }
    });
  },

  // 选择图片
  chooseModel: function chooseModel(e) {
    this.setData({
      chooseIndex: e.currentTarget.dataset.index == this.data.chooseIndex ? -1 : e.currentTarget.dataset.index,
      showImg: this.data.showImgs,
      original: false,
      BackshowImg: ''
    });
  },
  chooseImage: function chooseImage() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: function success(res) {
        console.log(res);
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: function success(res2) {
            if (res2.type != 'jpg' && res2.type != 'png' && res2.type != 'jpeg') {
              return wx.showToast({
                title: '\u4E0D\u652F\u6301' + res2.type + '\u683C\u5F0F'
              });
            } else if (res.tempFiles[0].size > 5242880) {
              return wx.showToast({
                title: '超过5M体积过大'
              });
            }
            that.setData({
              showImg: res.tempFilePaths[0],
              userImg: res.tempFilePaths[0],
              BackshowImg: null
            });
            manager.readFile({
              filePath: res.tempFilePaths[0],
              encoding: 'base64',
              success: function success(res) {
                base64 = res.data;
                // that[that.data.lists[that.data.chooseIndex]['fn']](res.data, e)
              }
            });
            that.doUpload(res.tempFilePaths[0]);
          }
        });
      }
    });
  },

  // 上传图片
  doUpload: function doUpload(filePath) {
    app.cloud().login().then(function (res) {
      wx.cloud.uploadFile({
        cloudPath: 'userUp/' + res.openid + new Date().getTime() + filePath.match(/\.[^.]+?$/)[0],
        filePath: filePath
      });
    });
  },
  getBottomList: function getBottomList() {
    var that = this;
    app.wxrequest({
      url: app.data.baseDomain + '/api/tuFun.json',
      data: {},
      success: function success(res) {
        that.setData({
          showImg: res.data[0].showImg,
          showImgs: res.data[0].showImg,
          bottomList: res.data[0].bottomList
        });
      }
    });
  },

  // 获取腾讯AI机器视觉api
  getApi: function getApi(base64Img, model) {
    var that = this;
    var params = {
      app_id: app_id,
      image: base64Img,
      nonce_str: Math.random().toString(36).substr(2),
      model: model || 1,
      time_stamp: parseInt(new Date().getTime() / 1000).toString()
    };
    params['sign'] = this.genRequestSign(params);
    // console.log(params);
    app.wxrequest({
      url: 'https://api.ai.qq.com/fcgi-bin/ptu/ptu_facemerge',
      method: 'POST',
      header: 'application/x-www-form-urlencoded',
      data: params,
      success: function success(res) {
        wx.hideLoading();
        if (res.data.ret != 0) {
          return wx.showToast({
            title: '酷到无法识别'
          });
        }
        that.setData({
          BackshowImg: "data:image/png;base64," + res.data.data.image
        });
      },
      fail: function fail() {
        wx.hideLoading();
        wx.showToast({
          title: '囧服务器崩了'
        });
      }
    });
  },

  // 颜龄检测
  peopleAge: function peopleAge(base64Img, model) {
    var that = this;
    var params = {
      app_id: app_id,
      image: base64Img,
      nonce_str: Math.random().toString(36).substr(2),
      time_stamp: parseInt(new Date().getTime() / 1000).toString()
    };
    params['sign'] = this.genRequestSign(params);
    // console.log(params);
    app.wxrequest({
      url: 'https://api.ai.qq.com/fcgi-bin/ptu/ptu_faceage',
      method: 'POST',
      header: 'application/x-www-form-urlencoded',
      data: params,
      success: function success(res) {
        wx.hideLoading();
        if (res.data.ret != 0) {
          return wx.showToast({
            title: res.data.msg
          });
        }
        that.setData({
          BackshowImg: "data:image/png;base64," + res.data.data.image
        });
      },
      fail: function fail() {
        wx.hideLoading();
        wx.showToast({
          title: '囧服务器崩了'
        });
      }
    });
  },
  genRequestSign: function genRequestSign(params) {
    // 1. 对请求参数按字典升序排序
    params = this.sortObject(params);
    // 2. 拼接键值对，value部分进行URL编码
    var paramStr = '';
    var keys = Object.keys(params);
    for (var idx in keys) {
      var key = keys[idx];
      paramStr += key + '=' + encodeURIComponent(params[key]) + '&';
    }
    // 3. 拼接key
    paramStr += 'app_key=' + app_key;
    // 4. md5
    return md5.hexMD5(paramStr).toUpperCase();
  },
  sortObject: function sortObject(obj) {
    var keys = Object.keys(obj).sort();
    var newObj = {};
    for (var i = 0; i < keys.length; i++) {
      newObj[keys[i]] = obj[keys[i]];
    }
    return newObj;
  },
  getbase64: function getbase64(e) {
    if (this.data.showImg == 'https://7465-teach-1258324355.tcb.qcloud.la/image/photo2.png') {
      return wx.showToast({
        title: '请上传图片'
      });
    }
    wx.showLoading({
      title: '识别转换中',
      mask: false
    });
    this[this.data.lists[this.data.chooseIndex]['fn']](base64, e);
  },
  setCanvas: function setCanvas(wdith, height, model) {
    var that = this;
    this.setData({
      wdith: wdith,
      height: height
    });
    var ctx = wx.createCanvasContext('myCanvas');
    ctx.drawImage(this.data.userImg, 0, 0, wdith, height);
    ctx.draw(false, function () {
      // 基础库版本需在1.9.0以上
      try {
        wx.canvasGetImageData({
          canvasId: 'myCanvas',
          x: 0,
          y: 0,
          width: wdith,
          height: height,
          success: function success(res) {
            console.log(res);
            // let platform = wx.getSystemInfoSync().platform
            // if (platform == 'ios' && that.data.showImg !== 'https://7465-teach-1258324355.tcb.qcloud.la/image/photo2.png') {
            //   res = that.reverseImgData(res)
            // }
            var pngData = '';
            try {
              pngData = upng.encode([res.data.buffer], res.width, res.height);
            } catch (err) {
              wx.showToast({
                title: '换张图片试试'
              });
              return that.setData({
                showImg: that.data.showImgs,
                userImg: ''
              });
            }
            var base64 = wx.arrayBufferToBase64(pngData);
            that[that.data.lists[that.data.chooseIndex]['fn']](base64, model);
          }
        });
      } catch (err) {
        wx.showToast({
          title: '请换张图片试试'
        });
        that.setData({
          showImg: that.data.showImgs,
          userImg: ''
        });
      }
    });
  },
  reverseImgData: function reverseImgData(res) {
    var w = res.width;
    var h = res.height;
    var con = 0;
    for (var i = 0; i < h / 2; i++) {
      for (var j = 0; j < w * 4; j++) {
        con = res.data[i * w * 4 + j];
        res.data[i * w * 4 + j] = res.data[(h - i - 1) * w * 4 + j];
        res.data[(h - i - 1) * w * 4 + j] = con;
      }
    }
    return res;
  },
  savePhoto: function savePhoto() {
    wx.showLoading({
      title: '图片保存中'
    });
    var that = this;
    wx.createSelectorQuery().select('#showImg').fields({
      size: true
    }, function (res) {
      that.shareImg(res.width, res.height);
    }).exec();
  },

  // 绘图分享图片
  shareImg: function shareImg() {
    var path = wx.env.USER_DATA_PATH + '/photo/temp.png';
    manager.writeFileSync(path, this.data.BackshowImg.replace('data:image/png;base64,', ''), 'base64');
    wx.saveImageToPhotosAlbum({
      filePath: path,
      success: function success() {
        wx.showToast({
          title: '图片保存成功'
        });
      },
      fail: function fail() {
        wx.showToast({
          title: '在设置中允许保存'
        });
      }
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    // TODO: onLoad
    var that = this;
    this.setData({
      loading: true
    });
    wx.getSystemInfo({
      success: function success(res) {
        that.setData({
          pixelRatio: res.pixelRatio,
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        });
      }
    });
    // this.getBottomList()
    app.cloud().getPhotoKey().then(function (res) {
      app_key = res.k;
      app_id = res.i;
      that.setData({
        loading: false
      });
    });
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {
    // TODO: onReady
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    var that = this;
    setTimeout(function () {
      that.setData({
        noneed: true
      });
    }, 1500);
    // TODO: onShow
  },

  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '向您推荐一个有趣的小程序，快来围观吧',
      path: '/pages/index/index'
    };
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function onHide() {
    // TODO: onHide
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function onUnload() {
    // TODO: onUnload
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    // TODO: onPullDownRefresh
    // let that = this
    // let choose = this.data.choose
    // if (choose === this.data.videoArr.length) {
    //   let ojbs = {
    //     url: that.data.secondUrl,
    //     success (res) {
    //       let videoArr = []
    //       for (let i of res.data.data.data) {
    //         // console.log(i['group']['480p_video']['url_list'][0])
    //         videoArr.push(i['group']['480p_video']['url_list'][0]['url'].replace('http://', 'https://'))
    //       }
    //       // let videoArr = res.data.data.data
    //       that.setData({
    //         choose: 0,
    //         videoArr: videoArr
    //       })
    //     }
    //   }
    //   app.wxrequest(ojbs)
    // } else {
    //   ++choose
    //   this.setData({
    //     choose: choose
    //   })
    // }
    // this.setData({
    //   autoplays: true
    // })
    // this.videoContext = wx.createVideoContext('videos')
    // setTimeout(function () {
    //   that.videoContext.play()
    //   wx.stopPullDownRefresh()
    // }, 200)
  }
});
//# sourceMappingURL=photo.js.map
