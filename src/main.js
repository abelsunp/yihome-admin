import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css
import App from './App'
import store from './store'
import router from './router'
import permission from './directive/permission'

import './assets/icons' // icon
import './permission' // permission control
import { getDicts } from "@/api/system/dict/data";
import { getConfigKey } from "@/api/system/config";
import { globalUpload,parseTime,myparseTime,myparseTime2,formatTime,OrderProcessNow,CommissionProcessNow, resetForm, addDateRange, selectDictLabel, download, handleTree } from "@/utils/ruoyi";
import Pagination from "@/components/Pagination";


// import VueUeditorWrap from 'vue-ueditor-wrap' // ES6 Module

// Vue.component('vue-ueditor-wrap', VueUeditorWrap)
// import { Button,Modal  } from 'ant-design-vue';

// Vue.component(Button.name,Button,Modal)

// 全局方法挂载
Vue.prototype.getDicts = getDicts
Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.parseTime = parseTime
Vue.prototype.myparseTime = myparseTime
Vue.prototype.myparseTime2 = myparseTime2


Vue.prototype.formatTime = formatTime

Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree

Vue.prototype.globalUpload = globalUpload

Vue.prototype.serverImgUrl = process.env.VUE_APP_IMAGE_URL 

Vue.prototype.OrderProcessNow = OrderProcessNow
Vue.prototype.CommissionProcessNow = CommissionProcessNow

Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
}

Vue.prototype.msgError = function (msg) {
  this.$message({ showClose: true, message: msg, type: "error" });
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg);
}

// 全局组件挂载
Vue.component('Pagination', Pagination)

Vue.use(permission)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.config.productionTip = false

window.$vm = new Vue({
  data() {
    return {
     
    }
  },
  methods: {
    upload(){
      document.querySelector('.my-custom-img input').click();
    }
  },
  
})


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
