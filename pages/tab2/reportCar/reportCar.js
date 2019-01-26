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
    imageList: [],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
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
    API.imgUpload().then(res=>{
      console.log(res);
      let imageList = this.data.imageList;
      imageList.push(...res);
      this.setData({imageList})
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  formSubmit(e) {
    console.log('eeee',e);
    let params = e.detail.value;
    if(params.money){
      params.money = params.money*1;
    }
    params.imgs = this.data.imageList;
  
    API.post('carAdd',params,(res)=>{
      console.log(res);
      wx.showModal({
        title: '提示',
        content: '发布成功',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            wx.switchTab({
              url: '/pages/tab1/index/index'
            })
          } 
        }
      })
     
    })

  },
  allDelImgs(){ 
    let imageList = [...this.data.imageList];
    let params = {
      imgs: imageList
    }
    API.delete('carDeleteMulti',params,(res)=>{
      console.log(res);
      this.setData({imageList:[]})
    },(err)=>{
      console.log(err);
    })
  },
})