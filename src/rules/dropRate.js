/* 
  掉落概率 = 
    场景掉落概率 + 
    场景掉落概率 * 幸运 / (幸运 + 777) + 
    各层掉落概率(每层0.02%)
*/

import { BASE_LUCK,  DROPRATE_EACH_FLOOR} from '@/constants'
import stages from '@/db/stages'

export default function(knight, currentFloor, stageId){
  const { luck } = knight;
  let stage = stages.filter(({ id }) => stageId == id)[0]
  return ((stage.dropRate + (stage.dropRate * luck / (luck + BASE_LUCK)) + currentFloor * DROPRATE_EACH_FLOOR) * 100).toFixed(2)
}