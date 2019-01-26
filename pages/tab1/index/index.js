const app = getApp()
var API = require('../../../lib/api.js');
var dataHelper = require('../../../lib/utils/dataHelper.js');
let util = require('../../../lib/utils/util.js');

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
    commander: {text:null,value:null},
    carTypeOpen: false,
    selectValue: '',
    carData:[],
    moneys:{},
    moneyRangeList: dataHelper.moneyRange,
    moneyRange: null,
    moneyOpen:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
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
    
    this.carQuery();
  },
  carQuery(params={}){ 
    return new Promise((reslove,reject
    )=>{
      API.post('carQuery', params, res => {
        console.log('res11', res)
        res.data.forEach((item, index, arr) => {
          item.createTime = util.formatTime(new Date(item.createTime))
          this.fieldFilter(item, 'keyWord');
          this.fieldFilter(item, 'brightSpot');
        })
        this.setData({ carData: res.data });
        reslove()
      })
    })
   
  },
  fieldFilter(item,name){ 
    if(item[name]){
      item[name] = item[name].replace(/\s/g,'').split(/\/|\|/);
    }  
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
    let index = e.currentTarget.dataset.nav;
    if(index==='1') {
      if (this.data.carTypeOpen) {
        this.setData({
          carTypeOpen: false,
          shownavindex: 0,
          moneyOpen: false
        })
      } else {
        this.setData({
          carTypeOpen: true,
          moneyOpen: false,
          shownavindex: e.currentTarget.dataset.nav
        })
      }
    } else { 
      
      if (this.data.moneyOpen) {
        this.setData({
          carTypeOpen:false,
          moneyOpen: false,
          shownavindex: 0
        })
      } else {
        this.setData({
          carTypeOpen: false,
          moneyOpen: true,
          shownavindex: 2
        })
      }
    }
   
  },
  //选中车长的某个项
  selectcmditem: function(e) { 
    var commander = e.target.dataset.commander
    console.log(commander)
    this.setData({
      commander: commander

    })
  
  },
  selectMoney(e){
    var moneys = e.target.dataset.moneys
    this.setData({
      moneys
    })
  },
  getParams(){
    let params ={};
    if (this.data.commander.value){
      params.cartype = this.data.commander.value
    }
    if (this.data.moneys.value){
      params.money = this.data.moneys.value
    }
    return params;
  },
  sureSelect: function() {
    var that = this;
    let params =  this.getParams();
    console.log(params);
    this.carQuery(params).then(res=>{
      this.setData({
        selestValue: that.data.commander.text||'',
        money:this.data.moneys.text,
        carTypeOpen: false,
        shownavindex: 0,
        moneyOpen:false,
        
      })
    })
    
  },
  seeDetail: function(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/tab1/carDetail/carDetail?_id=${id}`
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