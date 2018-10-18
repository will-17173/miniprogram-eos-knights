<template>
  <div class="knight-data">
    TYPE: {{knight.type}}<br>
    HP: {{ knight.hpLeft }} / {{ knight.hp }}<br>
    Kills: {{knight.kills}}<br>
    掉落概率: {{dropRate}}<br>
    魔幻水: {{magicWater}}
  </div>
</template>

<style lang="scss" scoped>
.knight-data {
  margin-bottom: 20px;
}
</style>

<script>
import { POWDER_PER_KILL } from '@/constants'

export default {
  props: {
    knight: Object,
  },
  data() {
    return {
      dropRate: 0,
    };
  },
  computed: {
    magicWater(){
      return (this.knight.kills * POWDER_PER_KILL).toFixed(2)
    }
  }
};
</script>


