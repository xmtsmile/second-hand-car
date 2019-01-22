var app = getApp();
var API = require('../../../lib/api.js');
var util = require('../../../utils/util.js');
import { CARTYPE} from '../../../utils/data.js';
Page({ 

  /**
   * 页面的初始数据
   */
  data: { 
    transmissionCaseS:['手动','自动'],
    transmissionCaseIndex: '',
    registerDate: '',
    carYearInspection:'',
    cartypeList: ['不限', '轿车', '越野车SUV', '面包车', '货车', '皮卡车','MPV'],
    CARTYPE,
    imageList: ['https://upload.jianshu.io/users/upload_avatars/3407939/73366e49-edf5-43fd-a931-61be8f6afd38.png?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96', 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2849582180,2587936680&fm=27&gp=0.jpg', 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2849582180,2587936680&fm=27&gp=0.jpg','https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2849582180,2587936680&fm=27&gp=0.jpg'],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(CARTYPE)
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
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      transmissionCaseIndex: e.detail.value
    })
  },
  registerChange(e){//注册日期
    this.setData({
      registerDate: e.detail.value
    })
  },
  inspectionChange(e){ //年检
    this.setData({
      carYearInspection: e.detail.value
    })
  },
  insuranceChange(e){
    this.setData({
      carInsurance: e.detail.value
    })
  },
  cartypeChange(e){
    this.setData({
      cartypeIndex: e.detail.value
    })
  },
  chooseImage: function() {
    var _data = {}
    API.imgUpload(_data, function(result) {})
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  formSubmit(e) {
    console.log('eeee',e);
  }
})