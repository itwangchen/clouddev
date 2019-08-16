// miniprogram/pages/openapi/callback/callback.js
Page({

  data: {

  },

  onLoad: function (options) {

  },

  onCustomerServiceButtonClick(e) {
    // openapi
    console.log(e)
    wx.cloud.callFunction({
      name: 'sendMessage',  
      data: {
        "FromUserName": "ohl4L0Rnhq7vmmbT_DaNQa4ePaz0",
        "ToUserName": "wx1a32ec69d158a6a8",
        "Content": "测试",
        "CreateTime": 1555684067,
        "MsgId": "rjXLqpr5wcD3psKWhwtiwzYuVIad_BpTnxSwXge_8Xs",
        "MsgType": "text"
      },    
      success: res => {
        console.log(res, 'ok')
        wx.showToast({
          title: '调用成功',
        })

      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [openapi] 调用失败：', err)
      }
    })
  },
})