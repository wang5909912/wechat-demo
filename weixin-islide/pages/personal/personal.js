//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    login:false,
    tabs: ["浏览历史", "我的下载"],
    activeIndex: 0,
    productList: [
      {
        id:1,
        image: '../images/3.png',
        title: 100001,
        wxtype: 0,
        delect: false
      },
      {
        id: 2,
        image: '../images/2.png',
        title: 200001,
        wxtype: 5,
        delect: false
      },
      {
        id: 3,
        image: '../images/1.png',
        title: 300001,
        wxtype: 10,
        delect: false
      }
    ],
    gainHistory: [
      {
        id: 1,
        image: '../images/1.png',
        title: 100001,
        wxtype: 0,
        delect: false
      },
      {
        id: 2,
        image: '../images/4.png',
        title: 200001,
        wxtype: 5,
        delect: false
      },
      {
        id: 3,
        image: '../images/3.png',
        title: 300001,
        wxtype: 10,
        delect: false
      }
    ],
  },
//分享
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
  },
//进入页面加载
  onShow:function(){
    if (wx.getStorageSync('login') == 'true') {
      this.setData({
        login: true,
        hasUserInfo: true
      })
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } 
    // else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     console.log(res)
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }

    // }
     else {
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

  },

  /*按钮点击获取用户信息 */
  getUserInfo: function(e) {
    if (e.detail.errMsg.indexOf('ok') >= 0) {
      app.globalData.userInfo = e.detail.userInfo;
      wx.setStorageSync('login', 'true')
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          // console.log(res)
        }
      })
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
        login: true
      })
    }
  },
  /*转换tabs页面 */
  tabClick: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id
    });
  },
  /*  点击图片跳转之详情页面*/
  showBtndetails: function (e) {
    wx.navigateTo({
      url: '/pages/details/details?id=' + e.currentTarget.dataset.id,
    })
  },

/*以下是浏览历史逻辑
   * 显示删除按钮
   */
  showDeleteButton: function (e) {
    let productindex = e.currentTarget.dataset.productindex
    this.setXmove(productindex, -100)
  },

  /**
    * 隐藏删除按钮
    */
  hideDeleteButton: function (e) {
    let productindex = e.currentTarget.dataset.productindex
    this.setXmove(productindex, 0)
    let productList = this.data.productList;
    productList[productindex].delect = false;
    this.setData({
      productList: productList
    })

  },
  /**
   * 设置movable-view位移
   */
  setXmove: function (productindex, xmove) {
    let productList = this.data.productList
    productList[productindex].xmove = xmove
    this.setData({
      productList: productList
    })
  },
  /**
   * 处理movable-view移动事件
   */
  handleMovableChange: function (e) {
    if (e.detail.source === 'friction') {
      if (e.detail.x < -50) {
        this.showDeleteButton(e)
      } else {
        this.hideDeleteButton(e)
      }
    } else if (e.detail.source === 'out-of-bounds' && e.detail.x === 0) {
      this.hideDeleteButton(e)
    }
  },

  /**
 * 删除产品
 */
  readydeleteproduct(e) {
    let productindex = e.currentTarget.dataset.productindex;
    let productList = this.data.productList;
    productList[productindex].delect = true;
    this.setData({
      productList: productList
    })
    this.showDeleteButton(e)
  },
  handleDeleteProduct: function (e) {
    let productindex = e.currentTarget.dataset.productindex
    let productList = this.data.productList

    productList.splice(productindex, 1)

    this.setData({
      productList: productList
    })
    if (productList[productindex]) {
      this.setXmove(productindex, 0)
    }
  },


/* 以下是获取历史逻辑
 * 显示删除按钮
   */
  showbtngain: function (e) {
    let gainindex = e.currentTarget.dataset.gainindex
    this.setXmovegain(gainindex, -100)
  },

  /**
    * 隐藏删除按钮
    */
  hideBtngain: function (e) {
    let gainindex = e.currentTarget.dataset.gainindex
    this.setXmovegain(gainindex, 0);

    let gainHistory = this.data.gainHistory;
    gainHistory[gainindex].delect = false;
    this.setData({
      gainHistory: gainHistory
    })
  },
  /**
   * 设置movable-view位移
   */
  setXmovegain: function (gainindex, xmove) {
    let gainHistory = this.data.gainHistory
    gainHistory[gainindex].xmove = xmove
    this.setData({
      gainHistory: gainHistory
    })
  },
  /**
   * 处理movable-view移动事件
   */
  handleMovableChangegain: function (event) {
    if (event.detail.source === 'friction') {
      if (event.detail.x < -50) {
        this.showbtngain(event)
      } else {
        this.hideBtngain(event)
      }
    } else if (event.detail.source === 'out-of-bounds' && event.detail.x === 0) {
      this.hideBtngain(event)
    }
  },

  /**
 * 删除产品
 */
  readydelete(e) {
    let gainindex = e.currentTarget.dataset.gainindex;
    let gainHistory = this.data.gainHistory;
    gainHistory[gainindex].delect=true;
    this.setData({
      gainHistory: gainHistory
    })
    this.showbtngain(e)
  },

  handleDeleteGain: function (e) {
    let gainindex = e.currentTarget.dataset.gainindex;
    let gainHistory = this.data.gainHistory;
    gainHistory.splice(gainindex, 1);
    this.setData({
      gainHistory: gainHistory
    })
    if (gainHistory[gainindex]) {
      this.setXmovegain(gainindex, 0)
    }
  }










})