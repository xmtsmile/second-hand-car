var API = require('../../../lib/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    banners: ['https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1319931194,1554592553&fm=173&app=25&f=JPEG?w=218&h=146&s=22A069A040023AE746947C9A0300A090'],
    ggws:[]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  doDel(e) {
    // 点击删除
    console.log(e.target.id); // 传入的标识
    let idx = e.target.id*1+1;
    let banners = this.data.banners.splice(idx,1);
    this.setData({banners}) 
    
  },
  
  doEdit(e) {
    // 点击编辑
    console.log(e.target.id); // 传入的标识
    console.log(e.target.id); // 传入的标识
    let idx = e.target.id * 1 + 1;
    let banners = this.data.banners;
    // banners[idx] = 
    this.setData({ banners }) 
  },
  /**  点击tab切换  **/
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  addImgHandle(e){
    let id = e.target.id;
    let banners = this.data.banners;
    if(id==='0'){
      API['imgUpload']().then(res => { 
        banners.push(res)
        this.setData({ banners})
      })
    } else {

    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})