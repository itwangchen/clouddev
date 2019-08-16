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
  const countResult = playlistCollection.count()
  const total = countResult.total
  const batchTimes=Math.ceil(total/MAX_LIMIT)
  const tasks=[]
  for(let i=0;i<batchTimes;i++){
    let promise = playlistCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT)
    tasks.push(promise)
  }
  let list={
    data:[]
  }
  if(tasks.length>0){
    list = (await Promise.all(tasks)).reduce((acc,cur)=>{
      return  {
        data:acc.data.concat(cur.data)
      }
    })
  }

  const playlist = await rp(URL).then((res) => {
    return JSON.parse(res).result;
  })
  const newData = [];
  for (let p = 0; p < playlist.length; p++) {
    let el = playlist[p];
    let flg = true;
    for (let l = 0; l < list.length; l++) {
      let ele = list[l]
      if (ele.id == el.id) {
        flg = false
        break
      }
    }
    if (flg) {
      newData.push(el);
    }
  }
  console.log(newData)
  for (let i = 0; i < newData.length; i++) {
    await playlistCollection.add({
      data: {
        ...newData[i],
        createTime: db.serverDate()
      }
    }).then((res) => {
      // console.log('插入成功')
    }).catch((res) => {
      console.log('插入失败')
    })
  }
  return newData.length;
}