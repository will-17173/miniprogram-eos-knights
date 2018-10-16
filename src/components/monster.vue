<template>
  <div class="monster">
    {{ knight.attack }}<br>
    {{ hp }}
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
import { hp } from '@/rules/monster'

export default {
  name: 'monster',
  props: {
    knight: Object
  },
  data(){
    return {
      hp
    }
  }
}
</script>


