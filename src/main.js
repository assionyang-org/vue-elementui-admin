// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Mock from './mock'

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.config.productionTip = false

Mock.bootstrap();

router.beforeEach((to,from,next)=>{
	if(to.path=='/login'){
		sessionStorage.removeItem('user');
	}
	let user=JSON.parse(sessionStorage.getItem('user'));
	if(!user && to.path!='/login'){
		next({path:'/login'});
	}else{
		next();
	}
})

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