<template>
  <div class="container">
    <div class="status">
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
          <KnightData v-for="(knight, index) in knights" :key="index" :knight="knight" :currentFloor="currentFloor" :currentStage="currentStage" />
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
import { showSuccess } from '@/utils';

const db = wx.cloud.database({ env: config.cloudEnv });

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
    };
  },

  components: {
    Knight,
    Monster,
    KnightData,
  },

  methods: {
    switchTab(i) {
      this.currentTab = i;
    },
    rebirth() {
      const now = Date.now()
      db
        .collection('players')
        .doc('W8cETJ25dhqgQPmq')
        .update({
          data: {
            last_rebirth: now,
          },
        })
        .then(console.log)
        .catch(console.error);
      
      this.last_rebirth = now
      
      this.knights = this.knights.map(knight => {
        knight.hpLeft = knight.hp;
        knight.kills = 0;
        return knight;
      })
      this.totalKills = 0;
      this.tick()

      showSuccess('复活成功');
    },
    tick() {
      this.interval = setInterval(() => {
        this.knights = this.knights.map(knight => {
          const { hp, defense, attack } = knight;
          knight.hpLeft = hpLeft(hp, defense, this.last_rebirth);
          knight.kills = kills(hp, defense, attack, this.last_rebirth);
          return knight;
        });

        this.totalKills = this.knights[0].kills + this.knights[1].kills + this.knights[2].kills;
        this.currentFloor = Math.floor(this.totalKills / 10) + 1

        let timePassed = Math.floor((Date.now() - this.last_rebirth) / 1000);
        if (timePassed > this.maxTime) {
          clearInterval(this.interval);
        }
      }, 1000);
    },
  },

  created() {},
  async mounted() {
    const openId = this.$wx.getStorageSync('openId');
    if (!openId) {
      wx.cloud
        .callFunction({ name: 'user' })
        .then(res => {
          const openId = res.result.openId;
          this.$wx.setStorageSync('openId', openId);
          return openId;
        })
        .catch(err => console.error(err));
    }

    const res = await db.collection('knights').get();
    let knights = res.data[0].rows;

    const res2 = await db.collection('players').get();
    const { last_rebirth, current_stage } = res2.data[0];

    this.last_rebirth = last_rebirth;
    this.currentStage = current_stage;

    //计算出剩余血量，已杀怪物数
    const timePassed = (Date.now() - last_rebirth) / 1000;

    knights = knights.map(knight => {
      const { hp, defense, attack } = knight;
      knight.hpLeft = hpLeft(hp, defense, last_rebirth);
      knight.kills = kills(hp, defense, attack, last_rebirth);
      return knight;
    });
    this.knights = knights;
    this.totalKills = this.knights[0].kills + this.knights[1].kills + this.knights[2].kills;
    this.currentFloor = Math.floor(this.totalKills / 10) + 1
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
