<template>
  <div class="monster">
    {{ knight.attack }}<br>
    {{ monsterHp }}
  </div>
</template>

<style lang="scss" scoped>
  .monster{
    width: 33%;
    height: 60px;
    background: red;
  }
</style>

<script>
import { monsterHp } from '@/rules/monster'

export default {
  name: 'monster',
  props: {
    knight: Object
  },
  data(){
    return {
      monsterHp
    }
  }
}
</script>


