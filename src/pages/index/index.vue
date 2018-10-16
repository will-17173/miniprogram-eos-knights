<template>
  <div class="container">
  </div>
</template>

<script>
import utils from '@/utils';
import config from '@/config';

var app = getApp();

export default {
  data() {
    return {};
  },

  components: {},

  methods: {},

  created() {},
  async mounted() {
    // 调用云函数，返回用户openId，参数为云函数名称
    wx.cloud
      .callFunction({ name: 'user' })
      .then(res => {
        console.log(res);
        // 更新store中的openId
        // this.$store.commit('updateOpenId', res.result);
        // return this.WXP.getSetting();
      })
      // .then(res => {
      //   // 检验是否授权
      //   console.log(res)
      //   const authUserInfo = res.authSetting['scope.userInfo'];
      //   if (authUserInfo) {
      //     this.$store.commit('updateAuthUserInfo', authUserInfo);
      //   }
      // })
      .catch(err => console.error(err));

    const db = wx.cloud.database({ env: config.cloudEnv });
    db
      .collection('demo')
      .get()
      .then(res => {
        console.log(res);
      })
      .catch(console.error);

    let pages = getCurrentPages(); // 获取加载的页面
    let currentPage = pages[pages.length - 1];
    this.$http.testGet().then(res => {
      // console.log(res)
    });
    const res = await this.$http.testGet();
  },
  onShareAppMessage() {
    let title = '',
      path = '/pages/index/main';
    return utils.onShareAppMessage(title, path, function() {
      console.log('分享成功');
    });
  },
};
</script>

<style lang="scss" scoped>
.container {
  background: #000;
  color: #fff;
  a {
    color: #fff;
  }
}
</style>
