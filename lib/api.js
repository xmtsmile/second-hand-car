(function (factory) {
  module.exports = factory();
})(function () {
  'use strict';

  var API = {};


  //线上
  //var accessServer = "https://access.yuanbaopu.com/api/";
  //云测 
  var accessServer = "https://a.suiwolvyou.com";

  var servers = {
    "query": "/car/query",
  }

  function _obj2uri(obj) {
    return Object.keys(obj).map(function (k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]);
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
        console.log(url, res.data);
      },
      complete() {
       
      },
      fail: function (err) {
       
      }
    })
  }

  API['get'] = function (url, params, callbackSuc, callbackFail) {
    var url = accessServer + mappedURLs[url].server + mappedURLs[url].url;
    console.log("请求地址" + url);

    params.orgCode = "404000";
    params.token = wx.getStorageSync('token');
    console.log("请求参数" + JSON.stringify(params));

    wx.request({
      url: url + "?" + _obj2uri(params),
      method: "GET",
      success: function (res) {
        wx.stopPullDownRefresh();
        console.log(url, res.data);
        if (res.data.respCode != '100200' && !!params.showError) {
          wx.showModal({
            content: res.data.respMsg,
            showCancel: false
          })
        } else {
          callbackSuc(res.data);
        }
      }
    })
  }

  API['imgUpload'] = function (_data, cbSuc, cbFail) {
    var app = getApp();
    var sign = app.session.sign;
    var uploadUrl = 'https://web.image.myqcloud.com/photos/v2/' + app.globalData.qcloud.appId + '/' + app.globalData.qcloud.bucket + '/0?sign=' + encodeURIComponent(sign);
    var logs = wx.getStorageSync('logs') || [];
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showLoading({
          title: '上传中...',
          mask: true
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: uploadUrl,
          filePath: tempFilePaths[0],
          name: 'filecontent',
          header: {
            'Authorization': sign
          },
          formData: {
            'filename': new Date().getTime() + '.jpg'
          },
          success: function (res) {
            var data = JSON.parse(res.data);
            _data.matUrl = data.data.fileid;
            API.call("filesubmit", _data, function (result) {
              console.log('图片上传成功', result.data);
              wx.hideLoading();
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 2000
              })
              cbSuc(result);
            })

          },
          fail: function (res) {
            wx.hideLoading();
            if (!!cbFail) {
              cbFail();
            }
          }
        })
      }
    })
  }
  return API;
})


