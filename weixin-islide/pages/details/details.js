// pages/details/details.js
//获取应用实例
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: 1,
    images: [
      '../images/1.png',
      '../images/2.png',
      '../images/3.png',
      '../images/4.png'
    ],
    showdialog: 'none',
    gainbtn: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.setData({
            gainbtn: true
          })
        } else {
          this.setData({
            gainbtn: false
          })
        }
      }
    })
  },

  /*按钮点击获取用户信息 */
  getUserInfo: function(e) {
    if (e.detail.errMsg.indexOf('ok') >= 0) {
      app.globalData.userInfo = e.detail.userInfo;
      wx.setStorageSync('login', 'true')
      //   // 登录
      //   wx.login({
      //     success: res => {
      //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
      //       // console.log(res)
      //     }
      //   })
      this.setData({
        gainbtn: true,
        showdialog: 'block'
      })
    }
  },
  //打开dialog
  openConfirm(e) {
    this.setData({
      showdialog: 'block'
    })
  },
  //关闭dialog
  closemodal(e) {
    this.setData({
      showdialog: 'none'
    })
  },

  //发送邮件
  modalSubmit(e) {
    //然后这里要判断email格式问题
    let val = e.detail.value.email;
    let email = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/;
    if (!val) {
      var that = this;
      wx.showModal({
        title:'提示',
        content: '邮箱地址不能为空',
        showCancel: false,
        confirmColor:'#cc4a4b',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
      return
    }
    if (!email.test(val)) {
      var that = this;
      wx.showModal({
        title: '提示',
        content: '请输入有效的邮箱地址',
        showCancel: false,
        confirmColor: '#cc4a4b',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
      return
    }
    //这里需要一波ajax然后拿success的errno去判定去success页面还是fail页面,然后success后才调用下面的navigateTo和closemodal
    wx.navigateTo({
      url: '/pages/success/success?pptx=abcd&email=' + val,
    })
    this.closemodal();
  },
  /**
   * 用户点击右上角分享
   */
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
  }
})