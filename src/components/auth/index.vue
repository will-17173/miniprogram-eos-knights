<template>
  <div>
    ddd
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
export default {
  name: 'authModal',
  data(){
    return {
      show: false,
      buttons: [
        {
          name: '一键登录',
          color: '#19be6b'
        },
        {
          name: '取消'
        }
      ]
    }
  },
  methods: {
    showAuth(){
      console.log('show')
      this.show = true;
    },
    handleClick(e){
      console.log(e.mp)
    }
  }
}
</script>