// 已杀怪物
// 公式： (当前时间 - 上次重生时间) / 1000 * 攻击力 / 怪物血量 = 已杀怪物数量
// 存活时间 = 英雄HP / 每秒掉血量
// 最大可杀怪物数 = 存活时间 * 英雄攻击力 / 怪物血量

import { monsterAttack, monsterHp } from '@/rules/monster'
import { KNIGHT_HP_REDUCE_RATE } from '@/constants'

export default function(knightHp, knightDefense, knightAttack, last_rebirth){
  const hpReducePerSecond = (monsterAttack - knightDefense) / KNIGHT_HP_REDUCE_RATE // 每秒掉血
  let kills = Math.floor((Date.now() - last_rebirth) / 1000 * knightAttack / monsterHp)
  let surviveTime = Math.ceil(knightHp / hpReducePerSecond)
  let maxKills = Math.floor(surviveTime * knightAttack / monsterHp)
  return kills > maxKills ? maxKills : kills;
}