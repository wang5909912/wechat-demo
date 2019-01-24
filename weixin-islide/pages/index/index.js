//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      '../images/1.png',
      '../images/2.png',
      '../images/3.png',
      '../images/4.png'
    ],
    Compilations: [{
      id: 1,
      image: '../images/1.png',
      title: '标题一',
      wxtype: '类别一'
    },
      {
        id: 2,
        image: '../images/2.png',
        title: '标题二',
        wxtype: '类别二'
      },
      {
        id: 3,
        image: '../images/3.png',
        title: '标题3',
        wxtype: '类别3'
      },
      {
        id: 4,
        image: '../images/4.png',
        title: '标题4',
        wxtype: '类别4'
      },
      {
        id: 5,
        image: '../images/4.png',
        title: '标题5',
        wxtype: '类别5'
      },
      {
        id: 6,
        image: '../images/3.png',
        title: '标题6',
        wxtype: '类别6'
      },
      {
        id: 7,
        image: '../images/2.png',
        title: '标题7',
        wxtype: '类别7'
      },
      {
        id: 8,
        image: '../images/1.png',
        title: '标题8',
        wxtype: '类别8'
      }
    ],
    inputShowed: false,
    inputVal: ""
  },

  //搜索栏
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  navSearch: function (e) {
    //这里应该跳转之搜索页面
    // this.setData({
    //   inputVal: "",
    //   inputShowed: false
    // });
    wx.navigateTo({
      url: "/pages/Compilationsdetails/Compilationsdetails?name=" + this.data.inputVal,
      success: function (e) {
      }
    })
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
  inputblur:function(e){
    this.setData({
      // inputVal: "",
      inputShowed: false
    });
  },

  //事件处理函数

  onLoad: function() {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },

  //查看详情
  lookdetails(e) {
    console.log(e)
    wx.navigateTo({
      url: "/pages/Compilationsdetails/Compilationsdetails?id=" + e.currentTarget.dataset.id+"&name="+e.currentTarget.dataset.name,
      success: function(e) {
        
      }
    })
  },
  //按钮分享
  operationShare(e) {
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  //分享
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      return {
        title:'iSlide PPT模板',
        path: '/pages/index/index?id=' + res.target.dataset.id,
        imageUrl: '/pages/images/bottom.png'
      }
    }
    return {
      title: 'iSlide PPT模板',
      path: '/pages/index/index',
      imageUrl:'/pages/images/bottom.png'
    }
  }
})