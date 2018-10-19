<template>
  <div class="container">
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
      <button>制作</button>
      <button @click="toggleCanSelect">{{canSelect ? '完成' : '删除'}}</button>
      {{ myMaterialsCount }} <br>
      <div class="item" v-for="(material, i) in myMaterials" :key="i" @click="onClickMyMaterial(material.id)">
        <span class="check" :class="{checked: material.isChecked}" v-if="canSelect">√</span>
        {{material.name}}<br>
        稀有度： {{material.rare}}<br>
        类型: <span class="type" :class="'type' + material.type"></span>
      </div>
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
          稀有值：{{material.rare}}<br>
          材料类型： <span class="type" :class="'type' + material.type"></span><br>
          最近交易价格: 
        </div>
      </div>
    </div>

    <div class="foot" v-if="canSelect">
      <button @click="removeMaterials">魔幻水：{{powderReturn}}</button>
      <button @click="toggleCanSelect">取消</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .active{
    color: red;
  }

  .foot{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
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
      border: 1rpx solid #ccc;
      width: 30%;
      display: inline-block;
      .check{
        width: 40rpx;
        height: 40rpx;
        background: gray;
        color: #fff;
        border-radius: 20rpx;
        &.checked{
          background: green;
        }
      }
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
import { GET_MY_MATERIALS, UPDATE_MY_MATERIALS, UPDATE_POWDER } from '@/store/mutation-types'
import { MATERIAL_DELETE_POWDER_RETURN, CALL_CLOUD_FUNCTION_OK } from '@/constants'
import { mapState, mapGetters } from 'vuex'
import { showModal } from '@/utils'

export default {
  data(){
    return {
      currentTab: 0,
      materialTypes,
      materials,
      currentCategory: null,
      canSelect: false,
      powderReturn: 0
    }
  },
  computed:{
    ...mapState({
      myMaterials: state => state.myMaterials,
      powder: state => state.powder
    }),
    ...mapGetters([
      'myMaterialsCount'
    ]),

  },
  methods: {
    switchTab(i){
      this.currentTab = i;
    },
    async removeMaterials(){
      if(this.powderReturn == 0){
        return;
      }
      let materialsToRemove = []
      let remainMaterials = this.myMaterials.filter(({ id, isChecked }) => {
        if(isChecked){
          materialsToRemove.push(id)
        }
        return !isChecked;
      })

      const res = await wx.cloud
        .callFunction({ name: 'remove-materials', data: {
          ids: materialsToRemove,
          powder: this.powderReturn,
          openId: this.openId
        } })

      if(res.errMsg == CALL_CLOUD_FUNCTION_OK){
        this.$store.commit(UPDATE_MY_MATERIALS, remainMaterials);
        this.$store.commit(UPDATE_POWDER, {
          powder: this.powder + this.powderReturn
        })
        showModal('提示', '删除成功,你得到' + this.powderReturn + '魔幻水')
        this.canSelect = false;
      }

    },
    toggleCanSelect(){
      this.canSelect = !this.canSelect
      if(!this.canSelect){
        this.powderReturn = 0;
        this.clearSelections()
      }
    },
    clearSelections(){
        const myMaterials = this.myMaterials.map(material => {
          material.isChecked = false;
          return material;
        })
        this.$store.commit(UPDATE_MY_MATERIALS, myMaterials)
    },
    onClickMyMaterial(id){
      if(this.canSelect){
        const myMaterials = this.myMaterials.map(material => {
          if(material.id == id){
            if(material.isChecked){
              material.isChecked = false;
              this.powderReturn -= MATERIAL_DELETE_POWDER_RETURN[material.type]
            } else{
              material.isChecked = true;
              this.powderReturn += MATERIAL_DELETE_POWDER_RETURN[material.type]
            }
          }
          return material;
        })
        this.$store.commit(UPDATE_MY_MATERIALS, myMaterials)
      } else{

      }
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
  },
  mounted(){
    const openId = this.openId = this.$wx.getStorageSync('openId')
    this.$store.dispatch(GET_MY_MATERIALS, { openId })
  }
}
</script>


