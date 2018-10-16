import Auth from './index.vue'

const AuthPlugin = {
  install: function (Vue) {
    const AuthConstructor = Vue.extend(Auth)
    const instance = new AuthConstructor() // 创建子实例

    // instance.$mount(document.createElement('div')) // 挂载实例到我们创建的DOM上
    // document.body.appendChild(instance.$el)

    Vue.prototype.$showAuth = function () {
      console.log(33)
      instance.show = true // 调用$toast()则显示提示
    }
  }
}

// 导出模块
export default AuthPlugin
