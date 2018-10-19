// 通过分享消息进小程序的场景值
export const SHARE_SCENE_CODE = [
  1017, // 前往体验版入口
  1007, // 单人聊天会话中的小程序消息卡片
  1008, // 群聊会话中的小程序消息卡片
  1036, // App 分享消息卡片
  1011, // 扫描二维码
  1012, // 长按识别二维码
  1013, // 手机相册识别二维码
  1044, // 带 shareTicket 的小程序消息卡片
  1047, // 扫描小程序码
  1048, // 长按图片识别小程序码
  1049, // 手机相册选取小程序码
  1014, // 小程序模版消息
]

// 调用云函数成功
export const CALL_CLOUD_FUNCTION_OK = 'cloud.callFunction:ok'

//英雄掉血系数 (怪物攻 - 英雄防) / 系数 = 每秒掉血 
export const KNIGHT_HP_REDUCE_RATE = 10000

// 杀掉一只怪得到的魔法水
export const POWDER_PER_KILL = .03

// 掉落率幸运系数
export const BASE_LUCK = 777

// 每层掉落概率(累加)
export const DROPRATE_EACH_FLOOR = .0002

// 1级升2级打怪数量，以后每级*2
export const LEVEL_UP_MONSTER_COUNT = 40

// 默认材料格子数量
export const DEFAULT_MATERIALS_CAPACITY = 28

// 默认装备格子数量
export const DEFAULT_ITEM_CAPACITY = 12

// 删除材料得到的魔幻水
export const MATERIAL_DELETE_POWDER_RETURN = [8, 16, 32, 64, 128]