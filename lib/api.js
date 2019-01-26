var uploadImage = require('./utils/uploadFile.js');
var util = require('./utils/util.js');

(function (factory) {
  module.exports = factory();
})(function () {
  'use strict';

  var API = {};


  
  //云测 
  var accessServer = "https://a.suiwolvyou.com";

  var servers = {
    "query": "/car/query",
    "jurisdiction":"/jurisdiction",
    "getBanner": "/banner",
    "banner": "/banner",
    "getGgw": "/ggwei",
    "ggwei": "/ggwei",
    'carAdd':'/car/add',
    'carQuery':'/car/query',
    'carDeleteMulti':'car/deleteMulti'
  }

  function _obj2uri(obj) {
    return Object.keys(obj).map(function (k) {
      return k + "=" + obj[k];
    }).join('&');
  }

  API['post'] = function (url, params, callbackSuc, callbackFail) {
    var uri = accessServer + servers[url]
    console.log("请求地址" + uri);

    wx.request({
      url: uri,
      method: "POST",
      data: JSON.stringify(params),
      success: function (res) {
        wx.stopPullDownRefresh();
        callbackSuc(res.data)
      },
      complete() {
       
      },
      fail: function (err) {
        callbackFail(err)
      }
    })
  }

  API['delete'] = function (url, params, callbackSuc, callbackFail) {
    var uri = accessServer + servers[url]
    console.log("请求地址" + uri);

    wx.request({
      url: uri,
      method: "delete",
      data: JSON.stringify(params),
      success: function (res) {
        wx.stopPullDownRefresh();
        callbackSuc(res.data)
      },
      complete() {

      },
      fail: function (err) {
        callbackFail(err)
      }
    })
  }


  API['put'] = function (url, params, callbackSuc, callbackFail) {
    var uri = accessServer + servers[url]
    console.log("请求地址" + uri);

    wx.request({
      url: uri,
      method: "put",
      data: JSON.stringify(params),
      success: function (res) {
        wx.stopPullDownRefresh();
        callbackSuc(res.data)
      },
      complete() {

      },
      fail: function (err) {
        callbackFail(err)
      }
    })
  }


  API['get'] = function (url, params, callbackSuc, callbackFail) {
    var uri = accessServer + servers[url]
    console.log("请求地址" + uri);
    wx.request({
      url: uri + "?" + _obj2uri(params),
      method: "GET",
      success: function (res) {
        wx.stopPullDownRefresh();
        callbackSuc(res.data)
      }
    })
  }

  API['imgUpload'] = function () {
    var app = getApp();
    let arr = [];
    return  new Promise(function (resolve, reject) {
      wx.chooseImage({
        count: 9, // 默认最多一次选择9张图
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          var nowTime = util.formatTime(new Date());
         
          //支持多图上传
          for (let i = 0; i < res.tempFilePaths.length; i++) {
            //显示消息提示框
            wx.showLoading({
              title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
              mask: true
            })

            //上传图片
            //你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
            //图片路径可自行修改
          
            uploadImage(res.tempFilePaths[i], 'car/' + nowTime + '/',
              function (result) {
                  arr.push(result);
                if (arr.length >= res.tempFilePaths.length) {
                  resolve(arr)
                }
                console.log("======上传成功图片地址为：", result);
                wx.hideLoading();
              }, function (err) {
                reject(err)
                console.log("======上传失败======", result);
                wx.hideLoading()
              }
            )
          }
        }
      })
    });
       
  }
  return API;
})


