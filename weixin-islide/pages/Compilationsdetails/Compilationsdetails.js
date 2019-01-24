// pages/Compilationsdetails/Compilationsdetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: [{
        id: 1,
        image: '../images/1.png',
        title: '标题一',
        wxtype: '23432'
      },
      {
        id: 2,
        image: '../images/2.png',
        title: '标题二',
        wxtype: '23432'
      },
      {
        id: 3,
        image: '../images/3.png',
        title: '标题3',
        wxtype: '23432'
      },
      {
        id: 4,
        image: '../images/4.png',
        title: '标题4',
        wxtype: '23432'
      },
      {
        id: 5,
        image: '../images/4.png',
        title: '标题5',
        wxtype: '23432'
      },
      {
        id: 6,
        image: '../images/3.png',
        title: '标题6',
        wxtype: '23432'
      },
      {
        id: 7,
        image: '../images/2.png',
        title: '标题7',
        wxtype: '23432'
      },
      {
        id: 8,
        image: '../images/1.png',
        title: '标题8',
        wxtype: '23432'
      }
    ],
    inputShowed: false,
    inputVal: "",
    compilationtitle:""
  },
  tapdetails(e){
    wx.navigateTo({
      url: '/pages/details/details?id=' + e.currentTarget.dataset.id,
    })
  },
  //搜索栏
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  navSearch: function () {
    //这里应该跳转之搜索页面
    // this.setData({
    //   inputVal: "",
    //   inputShowed: false
    // });
    //这里应该ajax去更新this.data.details的数据
  },
  clearInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  inputblur: function (e) {
    this.setData({
      // inputVal: "",
      inputShowed: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      compilationtitle: options.name
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      return {
        title: 'iSlide PPT模板',
        path: '/pages/index/index?id=' + res.target.dataset.id,
        imageUrl: '/pages/images/bottom.png'
      }
    }
    return {
      title: 'iSlide PPT模板',
      path: '/pages/index/index',
      imageUrl: '/pages/images/bottom.png'
    }
  }
})