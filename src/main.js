import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false

Vue.use(Antd);

Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

