// pages/success/success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    template: 'islidetemplate.pptx',
    email: 'username@qq.com'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    
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