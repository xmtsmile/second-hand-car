const app = getApp()
var API = require('../../../lib/api.js');
var dataHelper = require('../../../lib/utils/dataHelper.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    advList: [],
    condition1: '车型',
    condition2: '价格',
    commanders: dataHelper.cartypeData,
    commander: '',
    carTypeOpen: false,
    carTypeShow: true,
    selectValue: '',
    carData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.initData();
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

  initData(){
    API.get('getBanner', {}, (res) => { 
      if (!(res && res.data[0] && res.data[0].imgs)) return;
      this.setData({
        imgUrls: res.data[0].imgs
      })
    })
    API.get('getGgw', {}, (res) => {
      
      if (!(res && res.data[0] && res.data[0].imgs))return;
      this.setData({
        advList: res.data[0].imgs
      })
     
    });
    API.post('carQuery', {}, res => { 
      this.setData({carData:res.data})
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.initData();
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