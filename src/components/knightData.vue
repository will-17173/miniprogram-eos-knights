<template>
  <div class="knight-data">
    TYPE: {{knight.type}}<br>
    HP: {{ knight.hp }} / {{ knight.hp }}<br>
    Kills: {{kills}}<br>
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
export default {
  props: {
    knight: Object,
  },
  data() {
    return {
      kills: 0,
      dropRate: 0,
      magicWater: 0,
    };
  },
};
</script>


