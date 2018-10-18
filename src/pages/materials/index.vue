<template>
  <div>
    <div class="tabs">
      <div class="tab" :class="{active: currentTab === 0}" @click="switchTab(0)">
        我的材料
      </div>
      <div class="tab" :class="{active: currentTab === 1}" @click="switchTab(1)">
        市场
      </div>
      <div class="tab" :class="{active: currentTab === 2}" @click="switchTab(2)">
        材料图鉴
      </div>
    </div>
    <div class="content" v-if="currentTab === 0">
1
    </div>
    <div class="content" v-if="currentTab === 1">
2
    </div>
    <div class="content" v-if="currentTab === 2">
      <div class="filter">
        <button>筛选</button>
        <div>
          <div v-for="(type, i) in materialTypes" :key="i">
            <div :class="{active: currentCategory == type.id}" @click="showType(type.id)">{{type.name}}</div>
          </div>
          <div @click="showType(null)">清除</div>
        </div>
      </div>
      <div>
        <div class="item" v-for="(material, i) in materials" :key="i">
          {{material.name}}<br>
          稀有值：{{material.rate}}<br>
          材料类型： <span class="type" :class="'type' + material.type"></span><br>
          最近交易价格: 
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .active{
    color: red;
  }
  .tabs{
    display: flex;
    .tab{
      flex: 1;
      &.active{
        color: red;
      }
    }
  }
  .content{
    .filter{
      border-bottom: 3px solid #ccc;
      margin-bottom: 20px;
    }
    .item{
      border-bottom: 1rpx solid #ccc;
      .type{
        width: 32rpx;
        height: 32rpx;
        display: inline-block;
        &.type0{
          background: #ccc;
        }
        &.type1{
          background: yellow;
        }
        &.type2{
          background: green;
        }
        &.type3{
          background: purple;
        }
        &.type4{
          background: orange;
        }
      }
    }
  }
</style>

<script>
import materials from '@/db/materials'
import materialTypes from '@/db/material-types'

export default {
  data(){
    return {
      currentTab: 0,
      materialTypes,
      materials,
      currentCategory: null
    }
  },
  computed:{

  },
  methods: {
    switchTab(i){
      this.currentTab = i;
    },
    showType(categoryId){
      this.currentCategory = categoryId;
      if(categoryId === null){
        this.materials = materials;
        return;
      }
      this.materials = materials.filter(({ category }) => {
        return category == categoryId;
      })
    }
  }
}
</script>


