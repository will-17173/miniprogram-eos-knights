<template>
  <div class="container">
    <div class="status">
      <Powder/>
      当前层：{{ currentFloor }}<br>
      {{ totalKills % 10 }} / 10<br>
      总共杀掉 {{ totalKills }}
    </div>
    <div class="kick-ass">
      <div class="knights">
        <Knight v-for="(knight ,index) in knights" :key="index" :knight="knight" />
      </div>
      <div class="monsters">
        <Monster v-for="(knight, index) in knights" :key="index" :knight="knight" />
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
          <KnightData v-for="(knight, index) in knights" :key="index" :knight="knight" :currentFloor="currentFloor" :currentStage="player.current_stage" />
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
import Knight from '@/components/knight';
import Monster from '@/components/monster';
import KnightData from '@/components/knightData';
import kills from '@/rules/kills';
import hpLeft from '@/rules/hpLeft';
import maxSurviveTime from '@/rules/maxSurviveTime';
import { showSuccess, showModal } from '@/utils';
import { POWDER_PER_KILL, DEFAULT_MATERIALS_CAPACITY } from '@/constants'
import { UPDATE_POWDER, GET_MY_MATERIALS, UPDATE_PLAYER } from '@/store/mutation-types'
import Powder from '@/components/powder'
import { mapState } from 'vuex'

const db = wx.cloud.database({ env: config.cloudEnv });
wx.cloud.init()

export default {
  data() {
    return {
      currentTab: 0,
      knights: [],
      knightStatus: {},
      currentFloor: 1,
      maxTime: null,
      last_rebirth: null,
      currentStage: null,
      totalKills: 0,
      player: {}
    };
  },

  components: {
    Knight,
    Monster,
    KnightData,
    Powder
  },

  computed: {
    ...mapState({
      myMaterials: state => state.myMaterials
    })
  },

  methods: {
    switchTab(i) {
      this.currentTab = i;
    },
    async rebirth() {
      /* 
        重生要做的：
          1. 增加魔法水 √
          2. 得到材料 √
          3. 重置 英雄血量√，打怪数量√
          4. 更新 玩家最高层√ 上次复活时间√ 英雄总杀怪数 我的材料√
          5. 调用 tick √
      */
      const now = Date.now()

      const count = await this.$store.dispatch(GET_MY_MATERIALS, {openId: this.openId})

      if(count > DEFAULT_MATERIALS_CAPACITY){
        showModal('提示', '材料格子满了，清掉一些再复活')
        return;
      }

      this.interval && clearInterval(this.interval);

      /* 
        1. 增加魔幻水
      */
      let powderGet = Math.round(this.totalKills * POWDER_PER_KILL)
      this.player.powder += powderGet == 0 ? 1 : powderGet;
      this.$store.commit(UPDATE_POWDER, {
        powder: this.player.powder
      })

      /* 
        2. 如果层数破纪录，要更新下层数
      */   
      if(this.currentFloor > this.player.maxfloor){
        this.player.maxfloor = this.currentFloor
      }

      const playerDocId = this.player._id;
      let updatePlayerResult = await db.collection('players')
        .doc(playerDocId)
        .update({
          data: {
            last_rebirth: now,
            powder: this.player.powder,
            maxfloor: this.player.maxfloor
          }
        })

      if(updatePlayerResult.errMsg == 'document.update:ok' && updatePlayerResult.stats.updated == 1){

        this.player.last_rebirth = now
        this.knights = this.knights.map(knight => {
          knight.hpLeft = knight.hp;
          knight.kills = 0;
          return knight;
        })
        this.totalKills = 0;
        this.tick();

        /* 
          1. 得到材料
        */
        wx.cloud
          .callFunction({ name: 'material', data: {
            owner: this.openId
          } })
          .then(res => {
            this.$store.dispatch(GET_MY_MATERIALS, { openId: this.openId })

            /* 
              1. 弹出提示
            */    
            let names = [] 
            res.result.forEach(({ name }) => {
              names.push(name)
            })
            names = names.join(',');
            showModal('复活成功', names)
          })
      }
    },
    tick() {
      const { last_rebirth } = this.player;
      this.interval = setInterval(() => {

        this.knights = this.knights.map(knight => {
          const { hp, defense, attack } = knight;
          knight.hpLeft = hpLeft(hp, defense, last_rebirth);
          knight.kills = kills(hp, defense, attack, last_rebirth);
          return knight;
        });

        this.totalKills = this.knights[0].kills + this.knights[1].kills + this.knights[2].kills;
        this.currentFloor = Math.floor(this.totalKills / 10) + 1

        let timePassed = Math.floor((Date.now() - last_rebirth) / 1000);
        if (timePassed > this.maxTime) {
          clearInterval(this.interval);
        }

      }, 1000);
    },
  },

  created() {},
  async mounted() {

    let openId = this.$wx.getStorageSync('openId');
    if (!openId) {
      let userRes = await wx.cloud.callFunction({ name: 'user' })
      openId = userRes.result.openId;
      this.$wx.setStorageSync('openId', openId);
      // TODO: 未购买英雄的情况
    }
    const knightsRes = await db.collection('knights').where({owner: openId}).get();
    const playerRes = await db.collection('players').where({owner: openId}).get();

    console.log(knightsRes)

    /* 
      1. set openId
    */
    this.openId = openId;

    /* 
      2. 玩家信息
    */
    this.player = playerRes.data[0];
    const { last_rebirth, powder } = this.player;

    /* 
      3. 处理英雄
    */
    let knights = knightsRes.data[0].rows;
    this.knightDocId = knightsRes.data[0]._id;
    knights = knights.map(knight => {
      const { hp, defense, attack } = knight;
      knight.hpLeft = hpLeft(hp, defense, last_rebirth);
      knight.kills = kills(hp, defense, attack, last_rebirth);
      return knight;
    });
    this.knights = knights;

    /* 
      4. 设置player, powder
    */

    this.$store.commit(UPDATE_PLAYER, {
      player: this.player
    })
    this.$store.commit(UPDATE_POWDER, {
      powder: powder
    }) 
  
    /* 
      4. 计算已杀怪物数
    */
    this.totalKills = this.knights[0].kills + this.knights[1].kills + this.knights[2].kills;

    /* 
      5. 当前层
    */
    this.currentFloor = Math.floor(this.totalKills / 10) + 1

    /* 
      6. 如果有英雄还没死掉，调用tick进行计算
    */
    const timePassed = (Date.now() - last_rebirth) / 1000;
    this.maxTime = maxSurviveTime(knights);
    if (timePassed < this.maxTime) {
      this.tick();
    }


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
  .kick-ass {
    display: flex;
    .knights {
      width: 50%;
      display: flex;
    }
    .monsters {
      width: 50%;
      display: flex;
    }
  }
  .info {
    margin-top: 20px;
    .tabs {
      display: flex;
      .tab {
        width: 25%;
        &.active {
          color: red;
        }
      }
    }
    .contents {
      margin-top: 20px;
    }
  }
}
</style>
