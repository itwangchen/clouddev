// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

const rp = require('request-promise')

const URL = 'http://musicapi.xiecheng.live/personalized'

const playlistCollection = db.collection('playlist')

const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async(event, context) => {
  let count=await playlistCollection.count();
  
  const wxContext = cloud.getWXContext()

  return {
    count,
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}