//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    navData: [{
        id: 1,
        name: '全部',
        list: [{
            id: 1,
            image: '../images/1.png',
            title: '标题一',
            wxtype: '123'
          },
          {
            id: 2,
            image: '../images/2.png',
            title: '标题二',
            wxtype: '4231'
          },
          {
            id: 3,
            image: '../images/3.png',
            title: '标题3',
            wxtype: '12412'
          },
          {
            id: 4,
            image: '../images/4.png',
            title: '标题4',
            wxtype: '12312'
          },
          {
            id: 5,
            image: '../images/4.png',
            title: '标题5',
            wxtype: '123'
          },
          {
            id: 6,
            image: '../images/3.png',
            title: '标题6',
            wxtype: '321'
          },
          {
            id: 7,
            image: '../images/2.png',
            title: '标题7',
            wxtype: '222'
          },
          {
            id: 8,
            image: '../images/1.png',
            title: '标题8',
            wxtype: '333'
          }
        ]
      },
      {
        id: 2,
        name: '工作报告',
        list: [{
            listid: 21,
          image: '../images/2.png',
            title: '工作报告一',
            wxtype: '1241'
          },
          {
            listid: 22,
            image: '../images/3.png',
            title: '工作报告二',
            wxtype: '4242'
          },
          {
            listid: 23,
            image: '../images/1.png',
            title: '工作报告三',
            wxtype: '21312'
          }
        ]
      },
      {
        id: 3,
        name: '商业计划',
        list: [{
            listid: 31,
          image: '../images/3.png',
            title: '商业计划一',
            wxtype: '4242'
          },
          {
            listid: 32,
            image: '../images/3.png',
            title: '商业计划二',
            wxtype: '4242'
          },
          {
            listid: 33,
            image: '../images/1.png',
            title: '商业计划三',
            wxtype: '12121'
          }
        ]
      },
      {
        id: 4,
        name: '个人简历',
        list: [{
            listid: 41,
          image: '../images/2.png',
            title: '商业计划一',
            wxtype: '2131'
          },
          {
            listid: 42,
            image: '../images/4.png',
            title: '商业计划二',
            wxtype: '1231'
          },
          {
            listid: 43,
            image: '../images/2.png',
            title: '商业计划三',
            wxtype: '123123'
          }
        ]
      },
      {
        id: 5,
        name: '任务计划',
        list: [{
            listid: 51,
          image: '../images/2.png',
            title: '任务计划一',
            wxtype: '123'
          },
          {
            listid: 52,
            image: '../images/3.png',
            title: '任务计划二',
            wxtype: '任务计划二'
          },
          {
            listid: 53,
            image: '../images/4.png',
            title: '任务计划三',
            wxtype: '321'
          }
        ]
      },
      {
        id: 6,
        name: '产品发布',
        list: [{
            listid: 61,
          image: '../images/1.png',
            title: '产品发布一',
            wxtype: '23232'
          },
          {
            listid: 62,
            image: '../images/2.png',
            title: '产品发布二',
            wxtype: '产品发布二'
          },
          {
            listid: 63,
            image: '../images/4.png',
            title: '产品发布三',
            wxtype: '222'
          }
        ]
      },
      {
        id: 7,
        name: '年终总结',
        list: [{
            listid: 71,
          image: '../images/3.png',
            title: '年终总结一',
            wxtype: '年终总结一'
          },
          {
            listid: 72,
            image: '../images/2.png',
            title: '年终总结二',
            wxtype: '333'
          },
          {
            listid: 73,
            image: '../images/1.png',
            title: '年终总结三',
            wxtype: '111'
          }
        ]
      }
    ],
    currentTab: 0,
    navScrollLeft: 0,
    dialogdisplay: 'none',
    inputShowed: false,
    inputVal: ""
  },
  //搜索栏
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  navSearch: function(e) {
    //这里应该跳转之搜索页面
    // this.setData({
    //   inputVal: "",
    //   inputShowed: false
    // });
    wx.navigateTo({
      url: "/pages/Compilationsdetails/Compilationsdetails?name=" + this.data.inputVal,
      success: function(e) {}
    })
  },
  clearInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  inputblur: function(e) {
    this.setData({
      // inputVal: "",
      inputShowed: false
    });
  },
  //分享
  onShareAppMessage: function(res) {
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
  },

  //事件处理函数
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })

    // wx.showShareMenu({
    //   withShareTicket: true
    // })
  },
  //展开栏选中事件
  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //tabs栏选中事件
  selectNav(event) {
    console.log(event)
    var cur = event.currentTarget.dataset.current;
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur,
        dialogdisplay: 'none'
      })
    }
  },
  //页面内滑动换页
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },
  //打开展开栏按钮
  selsectNav(event) {
    console.log(event);
    this.setData({
      dialogdisplay: 'block'
    });
  },
  //关闭展开栏按钮
  closedialog(event) {
    this.setData({
      dialogdisplay: 'none'
    });
  },
  //内容进入详情界面
  tapdetails(e) {
    wx.navigateTo({
      url: '/pages/details/details?id=' + e.currentTarget.dataset.id,
    })
  }
})