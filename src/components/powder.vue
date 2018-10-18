<template>
    <div>
      魔幻水:{{powder}}
    </div>
</template>

<style lang="scss" scoped>

</style>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      powder: state => state.powder
    })
  }
}
</script>
