// pages/wedding-photos/wedding-photos.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:0,
    imgArr: [
      
    ]
  },

  previewImg: function (e) {
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var imgArr = this.data.imgArr;
    wx.previewImage({
      current: imgArr[index],     //当前图片地址
      urls: imgArr,         //所有要预览的图片的地址集合 数组形式
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },

  download: function (options){
    var that = this;
    const downloadTask = wx.downloadFile({
      url: "https://api.jweddingpic.cn/wedding/images/id?userId=1&id=1",
      success: function (res){
        if(res.code === 200){
          console.log(res.tempFilePath);
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   * 
   * 页面加载时做的动作
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://api.jweddingpic.cn/wedding/images/folder/page?userId=1&prefix=thumbnail', //请求地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if(res.statusCode == 200){ //请求成功
          that.setData({ imgArr: res.data.images });
        } else {
          wx.showToast({
            title: '请求失败',
          })
        }
      }
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
    console.info("下拉");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    that.setData({page: that.data.page + 1})
    wx.request({ //到底时也要继续请求图片展示出来,分页请求
      url: 'https://api.jweddingpic.cn/wedding/images/folder/page',
      data:{
        userId:1,
        prefix:'thumbnail',
        page:that.data.page,
        pageSize:10
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.statusCode == 200) { //请求成功
          that.setData({imgArr:that.data.imgArr.concat(res.data.images)});
        } else {
          wx.showToast({
            title: '请求失败',
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})