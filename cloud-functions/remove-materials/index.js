// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const collection = db.collection('materials')
const collection2 = db.collection('players')
const _ = db.command

exports.main = async (event, context) => {
  let { ids, powder, openId } = event;

  const res = await collection.where({
    id: _.in(ids)
  }).remove()

  const res2 = await collection2.where({
    owner: openId
  }).get();

  console.log(res2)

  let data = res2.data[0]
  let _id = data._id;
  let currentPowder = data.powder;
  currentPowder += powder;

  await collection2.doc(_id)
    .update({
      data: {
        powder: currentPowder
      }
    })

  return {
    result: 'success'
  };
}