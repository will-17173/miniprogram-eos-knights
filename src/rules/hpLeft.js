/* 
  英雄剩余血量 = 
  英雄血量 - 每秒掉血 * (当前时间 - 上次重生时间)
*/
import { monsterAttack } from '@/rules/monster'
import { constants } from '@/config'
const { KNIGHT_HP_REDUCE_RATE } = constants;

export default function(knightHp, knightDefense, last_rebirth){
  const hpReducePerSecond = (monsterAttack - knightDefense) / KNIGHT_HP_REDUCE_RATE // 每秒掉血
  const hpLeft = Math.floor(knightHp - hpReducePerSecond * (Date.now() - last_rebirth) / 1000);
  return hpLeft <= 0 ? 0 : hpLeft;
}