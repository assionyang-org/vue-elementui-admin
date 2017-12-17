import Vue from 'vue';
import Vuex from 'vuex';
import EmployeeStore from './modules/system/EmployeeStore';

Vue.use(Vuex);

const store=new Vuex.Store({
	strict: false, //开启严格模式，state的变更只能通过mutation提交，不然报异常
    modules:{
        EmployeeStore:EmployeeStore
    }
});

export default store;