import Vue from 'vue';
import Vuex from 'vuex';
import config from '@/config'

import { UPDATE_POWDER, GET_MY_MATERIALS, UPDATE_PLAYER } from './mutation-types'

Vue.use(Vuex);

wx.cloud.init()
const db = wx.cloud.database({ env: config.cloudEnv });

const state = {
  powder: 0,
  myMaterials: [],
  player: {}
};

const actions = {
  async GET_MY_MATERIALS({ commit }, params){
    const collection = db.collection('materials');

    const resCount = await collection.where({
      owner: params.openId
    }).count(); 

    const pages = Math.ceil(resCount.total / 20);

    let result = []
    for(let i = 0; i < pages; i++){
      const resData = await collection.where({
        owner: params.openId
      }).skip(20 * i).get();
      result = result.concat(resData.data)
    }
    commit(GET_MY_MATERIALS, result)

    return new Promise(resolve => {
      resolve(resCount.total)
    })
  }
};

const mutations = {
  [UPDATE_POWDER](state, payload){
    state.powder = payload.powder;
  },
  [GET_MY_MATERIALS](state, payload){
    state.myMaterials = payload;
  },
  [UPDATE_PLAYER](state, payload){
    state.player = payload;
  }
};

const getters = {
  myMaterialsCount: state => state.myMaterials.length
}

const store = new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: [
  ],
});

export default store;
