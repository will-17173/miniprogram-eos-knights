// 云函数入口文件
const cloud = require('wx-server-sdk')
const shortid = require('shortid')

cloud.init()

function randomNumber(min, max) {
  var range = max - min,
    random = Math.random();
  return (min + Math.round(random * range));
}

let materials = [
  {
    code: 1,
    category: 0,
    rare: 222,
    type: 0,
    name: '树木'
  },
  {
    code: 2,
    category: 0,
    rare: 222,
    type: 1,
    name: '冶炼石'
  },
  {
    code: 31,
    category: 1,
    rare: 222,
    type: 1,
    name: '青铜'
  },
  {
    code: 32,
    category: 1,
    rare: 222,
    type: 3,
    name: '铁'
  },
  {
    code: 61,
    category: 2,
    rare: 222,
    type: 4,
    name: '野牛骨头'
  },
  {
    code: 62,
    category: 2,
    rare: 222,
    type: 0,
    name: '山羊骨头'
  },
  {
    code: 91,
    category: 3,
    rare: 222,
    type: 0,
    name: '纯棉'
  },
  {
    code: 92,
    category: 3,
    rare: 222,
    type: 0,
    name: '牛皮'
  },
  {
    code: 121,
    category: 4,
    rare: 222,
    type: 2,
    name: '蓝宝石'
  },
  {
    code: 122,
    category: 4,
    rare: 222,
    type: 4,
    name: '红宝石'
  }
];

function generateMaterial(owner){
  const material = materials[randomNumber(0, materials.length - 1)];
  material.id = shortid.generate();
  material.owner = owner;
  material.sale = 0;
  return material;
}

const db = cloud.database()
const collection = db.collection('materials')

// 云函数入口函数
exports.main = async (event, context) => {
  let materials = [];
  for(let i = 0; i < 3; i++){
    const material = generateMaterial(event.owner);
    materials.push(material)
    await collection.add({
      data: material
    })
  }
  return materials;
}