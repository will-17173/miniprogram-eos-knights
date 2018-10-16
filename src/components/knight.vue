<template>
  <div class="knight">
    {{knight.hp}}
    <br>
    {{ knight.defense }}
  </div>
</template>

<style lang="scss" scoped>
  .knight{
    width: 33%;
    height: 60px;
    background: #888;
  }
</style>
<script>
import { attack } from '@/rules/monster'

export default {
  props: {
    knight: Object
  }
}
</script>


