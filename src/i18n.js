import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
//获取用户浏览器优先选择语言
function get_language() {
  return 'zh'
  var strLang = localStorage.getItem("lang")
  if(!strLang){
    // first time set lang
    var language = "en"
    if (navigator.language) {
      language = navigator.language;
    }
    else {
      language = navigator.browserLanguage;
    }
    if(language.substr(0,2)=="zh"){
      return "zh"
    }else{
      return "en"
    }
  }else{
    return strLang
  }
}

// 以下为语言包单独设置的场景，单独设置时语言包需单独引入
const messages = {
  "zh": require('./lang/zh'),   // 中文语言包
  "en": require('./lang/en')    // 英文语言包
}
// 最后 export default，这一步肯定要写的。
export default new VueI18n({
  locale: get_language(), // set locale 默认显示英文
  messages // set locale messages
})



// WEBPACK FOOTER //
// ./src/i18n.js