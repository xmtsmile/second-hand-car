(function (factory) {
  module.exports = factory();
})(function () {
  'use strict';
  var API = {};

  var accessServer = "https://fidebszltest.yuanbaopu.com/api/";

  var mappedURLs = {
  };

  function _obj2uri(obj) {
    return Object.keys(obj).map(function (k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]);
    }).join('&');
  }

  API['call'] = function (url, params, callbackSuc, callbackFail) {
    var path = mappedURLs[url].server + mappedURLs[url].url;
    var uri = accessServer + path;
    console.log("请求地址" + uri);

    params.token = wx.getStorageSync('token');
    console.log("请求参数" + JSON.stringify(params));
    
    let startTime = new Date().getTime();
    let endTime;

    wx.request({
      url: uri,
      method: "POST",
      data: params,
      success: function (res) {
        wx.stopPullDownRefresh();
        console.log(url, res.data);
        if (res.data.respCode != '100200') {
          if (res && res.data && res.data.respMsg){
            if (res.data.respCode !== '101604'){
              wx.showModal({
                content: res.data.respMsg,
                showCancel: false
              })
            }
             
            }
          if (res.data.respCode == '101604' || res.data.respCode == '101400') {
            try {
              wx.clearStorageSync();
              wx.redirectTo({
                url: '/pages/login/login'
              })
            } catch (e) {
              console.log(e);
            }
          }
          if (!!callbackFail) {
            callbackFail(res.data)
          }
        } else {
          var pages = getCurrentPages()
          var currentPage = pages[pages.length - 1]
          var url = currentPage.route
          if (!!res.data.data && !!res.data.data.zookeeper) {
            console.log(url.indexOf('maintain'))
            if (url.indexOf('maintain') != -1) {
              callbackSuc(res.data);
            } else {
              wx.redirectTo({
                url: '/pages/maintain/maintain'
              })
            }
          } else {
            callbackSuc(res.data);
          }
        }
      },
      complete(){
        endTime = new Date().getTime();
        console.log('startTime', endTime - startTime)
        console.log((endTime - startTime) >=5000)
        if ((endTime - startTime) >=60000) {
          callbackFail('true');
        }   
      },
      fail: function (err) {
        wx.hideLoading()
        console.log('fail',err)
        callbackFail('fail');
      }
    })
  }

  API['get'] = function (url, params, callbackSuc, callbackFail) {
    var path = mappedURLs[url].server + mappedURLs[url].url;
    var url = accessServer + path;
    console.log("请求地址" + url);

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
    var sign = app.globalData.sign;
    var uploadUrl = 'https://web.image.myqcloud.com/photos/v2/' + app.globalData.qcloud.appId + '/' + 
    app.globalData.qcloud.bucket + '/0?sign=' + encodeURIComponent(sign);
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


