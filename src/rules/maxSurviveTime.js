import { monsterAttack } from '@/rules/monster'
import { KNIGHT_HP_REDUCE_RATE } from '@/constants'


export default function(knights){
  let surviveTimes = [];
  knights.forEach(knight => {
    const { defense, hp } = knight;
    const hpReducePerSecond = (monsterAttack - defense) / KNIGHT_HP_REDUCE_RATE // 每秒掉血
    const surviveTime = Math.ceil(hp / hpReducePerSecond)
    surviveTimes.push(surviveTime);
  })
  return Math.max(...surviveTimes)
}