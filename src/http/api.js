import request from './http'
import env from '../env';

const host = {
  dev: 'http://localhost:8080/api',
  test: '',
  prod: '',
} [env];
const apiVersion = ''; // 接口版本

const api = {
  testGet: (params) => request.get(`${host}${apiVersion}/`, params),
  testPost: (params) => request.post(`${host}${apiVersion}/home`, params),
  testPut: (params) => request.put(`${host}${apiVersion}/home`, params),
  testDel: (params) => request.delete(`${host}${apiVersion}/home` + params.id, params),
}

export default {
  //作为组件库(install)
  install: function (Vue, name = '$http') {
    Object.defineProperty(Vue.prototype, name, {
      value: api
    });
  }
}
