import Vue from 'vue'
import App from './App'
import store from './store'
import api from './http/api'
import WXP from 'minapp-api-promise'

// 初始化云开发
wx.cloud.init({
  traceUser: true
})

const Bus = new Vue();
Vue.config.productionTip = false;
App.mpType = 'app';
Vue.use(api);
Vue.prototype.$store = store;
Vue.prototype.$bus = Bus;
Vue.prototype.$wx = WXP;

const app = new Vue(App);
app.$mount();
