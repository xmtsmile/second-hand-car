var API = require('../../../lib/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    banners: [],
    advList:[],
    viewHeight: wx.getSystemInfoSync().windowHeight
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var arr = ['a','b','c'];
    arr.splice(0,1);
    console.log(arr);
    API.get('getBanner', {}, (res) => { 
      if (!(res && res.data[0] && res.data[0].imgs)) return;
      this.setData({
        banners: res.data[0].imgs
      })
    });

    API.get('getGgw', {}, (res) => { 
      console.log('广告位',res)
      if (!(res && res.data[0] && res.data[0].imgs)) return;
      this.setData({
        advList: res.data[0].imgs
      })
    })

  },

  doDel(e) {
    // 点击删除
    
    let idx = e.target.id*1;
    let params = {};
    let url = 'banner';

    if (this.data.currentTab == 0) {
      params = {
        src: this.data.banners[e.target.id]
      }
      url = 'banner';
    } else {
      params = {
        src: this.data.advList[e.target.id]
      }
      url = 'ggwei';
    }
    
    API.delete(url, params, (res) => { 
      if (this.data.currentTab == 0) {
        let copyBanner = this.data.banners.slice(0);
        copyBanner.splice(idx, 1);
        this.setData({ banners: copyBanner });
      } else {
        let copyAdvList = this.data.advList.slice(0);
        copyAdvList.splice(idx, 1);
        this.setData({ advList: copyAdvList });
      }
    })
    
  },
  
  doEdit(e) {
    // 点击编辑
    let idx = e.target.id * 1 ;
    let that = this;
    let params = {};
    let url = 'banner';
    console.log(params);
    API['imgUpload']().then(res => {
      let src = res[0];
      if (this.data.currentTab == 0) {
        let copyBanner = that.data.banners.slice(0);
        let params = {
          src: copyBanner[e.target.id]
        };
        url = 'banner';
        let banners = that.data.banners;
        banners[idx] = src;
        that.setData({ banners });

      } else { 
        let copyAdvList = this.data.advList.slice(0);
        params = {
          src: copyAdvList[e.target.id]
        }
        url = 'ggwei';
        let advList = that.data.advList;
        advList[idx] = src;
        that.setData({ advList });
      }
      console.log('add成功');
      API.put(url, params, (res) => {
        console.log('del成功');
      })
    })
   
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
    if (id === '1' && this.data.advList.length===3) {
      wx.showModal({
        content: '广告位已满',
        showCancel: false
      })
      return;
    }

    API['imgUpload']().then(res => { 
      if (id === '0') { 
        let banners = this.data.banners;
        banners.push(...res)
        this.setData({ banners })
      } else {
        let advList = this.data.advList;
        advList.push(...res)
        this.setData({ advList })
      }
     
    })
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  releaseBanner(){ 
      let params = {
        imgs:this.data.banners
      }
      API.post('banner',params,(res)=>{ 
        wx.switchTab({
          url: '/pages/tab1/index/index'
        })
      })

  },


  releaseGggwei() {
    let params = {
      imgs: this.data.advList
    }
    API.post('ggwei', params, (res) => {
      wx.switchTab({
        url: '/pages/tab1/index/index'
      })
    })

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