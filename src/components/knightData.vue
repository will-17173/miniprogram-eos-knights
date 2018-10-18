<template>
  <div class="knight-data">
    TYPE: {{knight.type}}<br>
    HP: {{ knight.hpLeft }} / {{ knight.hp }}<br>
    Kills: {{knight.kills}}<br>
    掉落概率: {{dropRate}}%<br>
    魔幻水: {{powder}}
  </div>
</template>

<style lang="scss" scoped>
.knight-data {
  margin-bottom: 20px;
}
</style>

<script>
import { POWDER_PER_KILL } from '@/constants'
import calcDropRate from '@/rules/dropRate'
import { SET_POWDER } from '@/store/mutation-types'

export default {
  props: {
    knight: Object,
    currentFloor: {
      default: 1,
      type: Number
    },
    currentStage: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {
    };
  },
  computed: {
    powder(){
      return (this.knight.kills * POWDER_PER_KILL).toFixed(2)
    },
    dropRate(){
      return calcDropRate(this.knight, this.currentFloor, this.currentStage)
    }
  },
  mounted(){

  }
};
</script>


