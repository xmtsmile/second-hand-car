var API = require('../../../lib/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adminFlag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo().then(res=>{
      let username = res.userInfo.avatarUrl;
      API.get('jurisdiction', {}, (res) => {
        let usernames = res.data[0].usernames;
        let adminFlag = usernames.includes(username);
        this.setData({adminFlag})
      })
    })
   
  },
  go(e){
    let id = e.target.id;
    console.log(id);
     if(id==='1'){
       wx.navigateTo({
         url: '/pages/tab4/myCarInfo/myCarInfo'
       })
     }else if(id==='2'){
       wx.navigateTo({
         url: '/pages/tab4/myQgInfo/myQgInfo'
       })
     } else if (id === '3') {
       wx.navigateTo({
         url: '/pages/tab4/infoAdministration/infoAdministration'
       })
     } else if (id === '4') {
       wx.navigateTo({
         url: '/pages/tab4/billboardAdministration/billboardAdministration'
       })
     }
  },
  
  getUserInfo(){
    return new Promise((resolve, reject)=>{
      wx.getUserInfo({
        withCredentials: true,
        success: res => {
          resolve(res)
        },
        fail:(err)=>{
          reject(err)
        }
      }) 
    })
    
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