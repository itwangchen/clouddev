// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const {
    OPENID
  } = cloud.getWXContext()
  const result = await cloud.openapi.templateMessage.send({
    touser: OPENID,
    msgtype: 'text',
    text: {
      content: '收到',
    },
  })
  return result
}