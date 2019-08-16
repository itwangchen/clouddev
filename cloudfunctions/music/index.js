// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const playlistCollection = db.collection('playlist')
// 云函数入口函数
exports.main = async(event, context) => {
  const list = await playlistCollection
  .skip(event.start)
  .limit(event.count)
  .orderBy('careateTime','desc')
  .get()
  .then((res) => {
    return res
  }).catch(console.error);
  return list
}