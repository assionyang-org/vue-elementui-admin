// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'
import Vuex from 'vuex'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ECharts from 'vue-echarts/components/ECharts';
import Mock from './mock'

let EmployeeHub=new Vue();
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(ECharts)

Vue.config.productionTip = false

Mock.bootstrap();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

Vue.filter('getYMD',function(input){
	return input.split(' ')[0];
})