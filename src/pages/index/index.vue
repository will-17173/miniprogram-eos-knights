<template>
  <div class="container">
    <div class="status">
      当前层：{{ currentFloor }}<br>
      {{currentFloorMonsterCount}} / 10
    </div>
    <div class="kick-ass">
      <div class="knights">
        <Knight v-for="(item ,index) in knights" :key="index" :knight="item" />
      </div>
      <div class="monsters">
        <Monster v-for="(item, index) in knights" :key="index" :knight="item" />
      </div>
      
    </div>
    <div class="info">
      <div class="tabs">
        <div class="tab" :class="{active: currentTab === 0}" @click="switchTab(0)">
          英雄
        </div>
        <div class="tab" :class="{active: currentTab === 1}" @click="switchTab(1)">
          骑士
        </div>
        <div class="tab" :class="{active: currentTab === 2}" @click="switchTab(2)">
          弓箭手
        </div>
        <div class="tab" :class="{active: currentTab === 3}" @click="switchTab(3)">
          魔法师
        </div>
      </div>
      <div class="contents">
        <div class="content" v-if="currentTab === 0">
          <button @click="rebirth">复活</button>
          <KnightData v-for="(item, index) in knights" :key="index" :knight="item" />
        </div>
        <div class="content" v-if="currentTab === 1">
          1
        </div>
        <div class="content" v-if="currentTab === 2">
          2
        </div>
        <div class="content" v-if="currentTab === 3">
          3
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '@/utils';
import config from '@/config';
import Knight from '@/components/knight'
import Monster from '@/components/monster'
import KnightData from '@/components/knightData'

export default {
  data() {
    return {
      currentTab: 0,
      knights: [],
      currentFloorMonsterCount: 0,
      currentFloor: 1
    };
  },

  components: {
    Knight,
    Monster,
    KnightData
  },

  methods: {
    switchTab(i){
      this.currentTab = i;
    },
    rebirth(){

    }
  },

  created() {},
  async mounted() {
    const openId = this.$wx.getStorageSync('openId');
    if(!openId){
      wx.cloud.callFunction({ name: 'user' })
        .then(res => {
          const openId = res.result.openId;
          this.$wx.setStorageSync('openId', openId);
          return openId;
        })
        .catch(err => console.error(err));
    }

    const db = wx.cloud.database({ env: config.cloudEnv });
    db.collection('knights')
      .get()
      .then(res => {
        const knights = res.data[0].rows;
        this.knights = knights;
        console.log(res.data[0].rows);
      })
      .catch(console.error);



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
  .kick-ass{
    display: flex;
    .knights{
      width: 50%;
      display: flex;
    }
    .monsters{
      width: 50%;
      display: flex;
    }
  }
  .info{
    margin-top: 20px;
    .tabs{
      display: flex;
      .tab{
        width: 25%;
        &.active{
          color: red;
        }
      }
    }
    .contents{
      margin-top: 20px;
    }
  }
}
</style>
