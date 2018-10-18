import Vue from 'vue';
import Vuex from 'vuex';
import config from '@/config'

import { UPDATE_POWDER, GET_MY_MATERIALS } from './mutation-types'

Vue.use(Vuex);

wx.cloud.init()
const db = wx.cloud.database({ env: config.cloudEnv });

const state = {
  powder: 0,
  myMaterials: []
};

const actions = {
  async GET_MY_MATERIALS({ commit }, params){
    const res = await db.collection('materials').where({
      owner: params.openId
    }).get();
    commit(GET_MY_MATERIALS, res.data)
  }
};

const mutations = {
  [UPDATE_POWDER](state, payload){
    state.powder = payload.powder;
  },
  [GET_MY_MATERIALS](state, payload){
    console.log(payload)
    state.myMaterials = payload;
  }
};

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  modules: [
  ],
});

export default store;
