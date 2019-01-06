const app = getApp()
var API = require('../../../lib/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../../images/banner/banner1.png',
      '../../../images/banner/banner2.png',
      '../../../images/banner/banner3.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    condition1: '车型',
    condition2: '价格',
    commanders: ['不限', '轿车', '越野车/SUV', '面包车', '货车', '皮卡车', 'MPV'],
    commander: '',
    carTypeOpen: false,
    carTypeShow: true,
    selectValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    API.post('query', (res) => {
      console.log('请求成功', res)
    })
  },
  //选择照片
  choose: function() {
    API['imgUpload']().then(res => {
      this.setData({
        arr: res
      })
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  //选择车型
  listpx: function(e) {
    if (this.data.carTypeOpen) {
      this.setData({
        carTypeOpen: false,
        carTypeShow: true,
        shownavindex: 0
      })
    } else {
      this.setData({
        carTypeOpen: true,
        carTypeShow: false,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
    console.log(e.target)
  },
  //选中车长的某个项
  selectcmditem: function(e) {
    var commander = e.target.dataset.commander
    this.setData({
      commander: commander
    })
  },
  sureSelect: function() {
    var that = this
    console.log('ppppppp')
    this.setData({
      selectValue: that.data.commander
    })
  },
  seeDetail: function() {
    wx.navigateTo({
      url: '/pages/tab1/carDetail/carDetail',
    })
  },
  wantBuyDetail: function() {
    wx.navigateTo({
      url: '/pages/tab1/wantBuyInfo/wantBuyInfo',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})