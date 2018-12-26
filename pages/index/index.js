//index.js
var API = require('../../lib/api.js');
const app = getApp()

Page({
  data: {
  },
  onLoad: function () {
      API.post('query',(res)=>{
        console.log('请求成功',res)
      })
  }
})
