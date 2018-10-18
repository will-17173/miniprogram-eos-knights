import Vue from 'vue';
import Vuex from 'vuex';

import { UPDATE_POWDER } from './mutation-types'

Vue.use(Vuex);

const state = {
  powder: 0
};

const actions = {

};

const mutations = {
  [UPDATE_POWDER](state, payload){
    state.powder = payload.powder;
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
