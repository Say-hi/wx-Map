"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*eslint-disable*/
/**
 * @file 微信小程序JSAPI
 * @author 崔健 cuijian03@baidu.com 2017.01.10
 */
/**
 * 百度地图微信小程序API类
 *
 * @class
 */
var BMapWX = function () {

    /**
     * 百度地图微信小程序API类
     *
     * @constructor
     */
    function BMapWX(param) {
        _classCallCheck(this, BMapWX);

        this.ak = param["ak"];
    }

    /**
     * 使用微信接口进行定位
     *
     * @param {string} type 坐标类型
     * @param {Function} success 成功执行
     * @param {Function} fail 失败执行
     * @param {Function} complete 完成后执行
     */


    _createClass(BMapWX, [{
        key: "getWXLocation",
        value: function getWXLocation(type, success, fail, complete) {
            type = type || 'gcj02', success = success || function () {};
            fail = fail || function () {};
            complete = complete || function () {};
            wx.getLocation({
                type: type,
                success: success,
                fail: fail,
                complete: complete
            });
        }

        /**
         * POI周边检索
         *
         * @param {Object} param 检索配置
         * 参数对象结构可以参考
         * http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-placeapi
         */

    }, {
        key: "search",
        value: function search(param) {
            var that = this;
            param = param || {};
            var searchparam = {
                query: param["query"] || '生活服务$美食&酒店',
                scope: param["scope"] || 1,
                filter: param["filter"] || '',
                coord_type: param["coord_type"] || 2,
                page_size: param["page_size"] || 10,
                page_num: param["page_num"] || 0,
                output: param["output"] || 'json',
                ak: that.ak,
                sn: param["sn"] || '',
                timestamp: param["timestamp"] || '',
                radius: param["radius"] || 2000,
                ret_coordtype: 'gcj02ll'
            };
            var otherparam = {
                iconPath: param["iconPath"],
                iconTapPath: param["iconTapPath"],
                width: param["width"],
                height: param["height"],
                alpha: param["alpha"] || 1,
                success: param["success"] || function () {},
                fail: param["fail"] || function () {}
            };
            var type = 'gcj02';
            var locationsuccess = function locationsuccess(result) {
                searchparam["location"] = result["latitude"] + ',' + result["longitude"];
                wx.request({
                    url: 'https://api.map.baidu.com/place/v2/search',
                    data: searchparam,
                    header: {
                        "content-type": "application/json"
                    },
                    method: 'GET',
                    success: function success(data) {
                        var res = data["data"];
                        if (res["status"] === 0) {
                            var poiArr = res["results"];
                            // outputRes 包含两个对象，
                            // originalData为百度接口返回的原始数据
                            // wxMarkerData为小程序规范的marker格式
                            var outputRes = {};
                            outputRes["originalData"] = res;
                            outputRes["wxMarkerData"] = [];
                            for (var i = 0; i < poiArr.length; i++) {
                                outputRes["wxMarkerData"][i] = {
                                    id: i,
                                    latitude: poiArr[i]["location"]["lat"],
                                    longitude: poiArr[i]["location"]["lng"],
                                    title: poiArr[i]["name"],
                                    iconPath: otherparam["iconPath"],
                                    iconTapPath: otherparam["iconTapPath"],
                                    address: poiArr[i]["address"],
                                    telephone: poiArr[i]["telephone"],
                                    alpha: otherparam["alpha"],
                                    width: otherparam["width"],
                                    height: otherparam["height"]
                                };
                            }
                            otherparam.success(outputRes);
                        } else {
                            otherparam.fail({
                                errMsg: res["message"],
                                statusCode: res["status"]
                            });
                        }
                    },
                    fail: function fail(data) {
                        otherparam.fail(data);
                    }
                });
            };
            var locationfail = function locationfail(result) {
                otherparam.fail(result);
            };
            var locationcomplete = function locationcomplete(result) {};
            if (!param["location"]) {
                that.getWXLocation(type, locationsuccess, locationfail, locationcomplete);
            } else {
                var longitude = param.location.split(',')[1];
                var latitude = param.location.split(',')[0];
                var errMsg = 'input location';
                var res = {
                    errMsg: errMsg,
                    latitude: latitude,
                    longitude: longitude
                };
                locationsuccess(res);
            }
        }

        /**
         * sug模糊检索
         *
         * @param {Object} param 检索配置
         * 参数对象结构可以参考
         * http://lbsyun.baidu.com/index.php?title=webapi/place-suggestion-api
         */

    }, {
        key: "suggestion",
        value: function suggestion(param) {
            var that = this;
            param = param || {};
            var suggestionparam = {
                query: param["query"] || '',
                region: param["region"] || '全国',
                city_limit: param["city_limit"] || false,
                output: param["output"] || 'json',
                ak: that.ak,
                sn: param["sn"] || '',
                timestamp: param["timestamp"] || '',
                ret_coordtype: 'gcj02ll'
            };
            var otherparam = {
                success: param["success"] || function () {},
                fail: param["fail"] || function () {}
            };
            wx.request({
                url: 'https://api.map.baidu.com/place/v2/suggestion',
                data: suggestionparam,
                header: {
                    "content-type": "application/json"
                },
                method: 'GET',
                success: function success(data) {
                    var res = data["data"];
                    if (res["status"] === 0) {
                        otherparam.success(res);
                    } else {
                        otherparam.fail({
                            errMsg: res["message"],
                            statusCode: res["status"]
                        });
                    }
                },
                fail: function fail(data) {
                    otherparam.fail(data);
                }
            });
        }

        /**
         * rgc检索（坐标->地点描述）
         *
         * @param {Object} param 检索配置
         * 参数对象结构可以参考
         * http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding
         */

    }, {
        key: "regeocoding",
        value: function regeocoding(param) {
            var that = this;
            param = param || {};
            var regeocodingparam = {
                coordtype: param["coordtype"] || 'gcj02ll',
                pois: param["pois"] || 0,
                output: param["output"] || 'json',
                ak: that.ak,
                sn: param["sn"] || '',
                timestamp: param["timestamp"] || '',
                ret_coordtype: 'gcj02ll'
            };
            var otherparam = {
                iconPath: param["iconPath"],
                iconTapPath: param["iconTapPath"],
                width: param["width"],
                height: param["height"],
                alpha: param["alpha"] || 1,
                success: param["success"] || function () {},
                fail: param["fail"] || function () {}
            };
            var type = 'gcj02';
            var locationsuccess = function locationsuccess(result) {
                regeocodingparam["location"] = result["latitude"] + ',' + result["longitude"];
                wx.request({
                    url: 'https://api.map.baidu.com/geocoder/v2/',
                    data: regeocodingparam,
                    header: {
                        "content-type": "application/json"
                    },
                    method: 'GET',
                    success: function success(data) {
                        var res = data["data"];
                        if (res["status"] === 0) {
                            var poiObj = res["result"];
                            // outputRes 包含两个对象，
                            // originalData为百度接口返回的原始数据
                            // wxMarkerData为小程序规范的marker格式
                            var outputRes = {};
                            outputRes["originalData"] = res;
                            outputRes["wxMarkerData"] = [];
                            outputRes["wxMarkerData"][0] = {
                                id: 0,
                                latitude: result["latitude"],
                                longitude: result["longitude"],
                                address: poiObj["formatted_address"],
                                iconPath: otherparam["iconPath"],
                                iconTapPath: otherparam["iconTapPath"],
                                desc: poiObj["sematic_description"],
                                business: poiObj["business"],
                                alpha: otherparam["alpha"],
                                width: otherparam["width"],
                                height: otherparam["height"]
                            };
                            otherparam.success(outputRes);
                        } else {
                            otherparam.fail({
                                errMsg: res["message"],
                                statusCode: res["status"]
                            });
                        }
                    },
                    fail: function fail(data) {
                        otherparam.fail(data);
                    }
                });
            };
            var locationfail = function locationfail(result) {
                otherparam.fail(result);
            };
            var locationcomplete = function locationcomplete(result) {};
            if (!param["location"]) {
                that.getWXLocation(type, locationsuccess, locationfail, locationcomplete);
            } else {
                var longitude = param.location.split(',')[1];
                var latitude = param.location.split(',')[0];
                var errMsg = 'input location';
                var res = {
                    errMsg: errMsg,
                    latitude: latitude,
                    longitude: longitude
                };
                locationsuccess(res);
            }
        }

        /**
         * 天气检索
         *
         * @param {Object} param 检索配置
         */

    }, {
        key: "weather",
        value: function weather(param, _this) {
            var that = this;
            param = param || {};
            var weatherparam = {
                coord_type: param["coord_type"] || 'gcj02',
                output: param["output"] || 'json',
                ak: that.ak,
                sn: param["sn"] || '',
                timestamp: param["timestamp"] || ''
            };
            var otherparam = {
                success: param["success"] || function () {},
                fail: param["fail"] || function () {}
            };
            var type = 'gcj02';
            var locationsuccess = function locationsuccess(result) {
                wx.setStorageSync('siteInfo', result);
                weatherparam["location"] = result["longitude"] + ',' + result["latitude"];
                wx.request({
                    url: 'https://api.map.baidu.com/telematics/v3/weather',
                    data: weatherparam,
                    header: {
                        "content-type": "application/json"
                    },
                    method: 'GET',
                    success: function success(data) {
                        var res = data["data"];
                        if (res["error"] === 0 && res["status"] === 'success') {
                            var weatherArr = res["results"];
                            // outputRes 包含两个对象，
                            // originalData为百度接口返回的原始数据
                            // wxMarkerData为小程序规范的marker格式
                            var outputRes = {};
                            outputRes["originalData"] = res;
                            outputRes["currentWeather"] = [];
                            outputRes["currentWeather"][0] = {
                                currentCity: weatherArr[0]["currentCity"],
                                pm25: weatherArr[0]["pm25"],
                                date: weatherArr[0]["weather_data"][0]["date"],
                                curTemperature: weatherArr[0]["weather_data"][0]["date"].slice(weatherArr[0]["weather_data"][0]["date"].indexOf('：') + 1).slice(0, weatherArr[0]["weather_data"][0]["date"].slice(weatherArr[0]["weather_data"][0]["date"].indexOf('：') + 1).indexOf(')') - 1) + '°',
                                temperature: weatherArr[0]["weather_data"][0]["temperature"],
                                weatherDesc: weatherArr[0]["weather_data"][0]["weather"],
                                wind: weatherArr[0]["weather_data"][0]["wind"]
                            };
                            otherparam.success(outputRes);
                        } else {
                            otherparam.fail({
                                errMsg: res["message"],
                                statusCodeWx: res["status"]
                            });
                        }
                        wx.request({
                            url: 'https://free-api.heweather.com/v5/forecast',
                            data: {
                                city: wx.getStorageSync('siteInfo').longitude + ',' + wx.getStorageSync('siteInfo').latitude,
                                key: '10c6e97476d54c1f86d8ffcd5639475b'
                            },
                            success: function success(res) {
                                _this.setData({
                                    HeWeather: res.data.HeWeather5[0]
                                });
                            }
                        });
                    },
                    fail: function fail(data) {
                        otherparam.fail(data);
                    }
                });
            };
            var locationfail = function locationfail(result) {
                otherparam.fail(result);
            };
            var locationcomplete = function locationcomplete(result) {};
            if (!param["location"]) {
                that.getWXLocation(type, locationsuccess, locationfail, locationcomplete);
            } else {
                var longitude = param.location.split(',')[0];
                var latitude = param.location.split(',')[1];
                var errMsg = 'input location';
                var res = {
                    errMsg: errMsg,
                    latitude: latitude,
                    longitude: longitude
                };
                locationsuccess(res);
            }
        }
    }]);

    return BMapWX;
}();

module.exports.BMapWX = BMapWX;
//# sourceMappingURL=bmap-wx.js.map
