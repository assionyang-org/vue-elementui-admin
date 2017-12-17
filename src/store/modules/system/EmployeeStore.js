import Vue from 'vue';
//导入数据操作API
import {getEmployeeList} from '@/service/system';

const state={
	employees:[], //员工列表state
	total:0, //总记录数
	currentPage:1, //当前页
	pageSize:10, //每页显示记录数
	listLoading:false, //加载状态
	selects:[], //表格选择行数据
	//过滤条件
	filters:{
		employeename:'',
		employeesex:'',
		created_at:'',
		status:''
	}
};

const getters={
	employees:state=>state.employees,
	filters:state=>state.filters
};

const actions={
	getEmployees({commit,state}){
		commit('getEmployees');
	},
	sizeChange({commit},pageSize){
		commit('sizeChange',pageSize);
	}
};

const mutations={
	getEmployees(state){
	    let param={
			currentPage:state.currentPage,
			pageSize:state.pageSize,
			employeename:state.filters.employeename,
			employeesex:state.filters.employeesex,
			created_at:state.filters.created_at,
			status:state.filters.status
		};
		state.listLoading=true;
		getEmployeeList(param).then((res)=>{
			state.total=res.data.total;
			state.employees=res.data.employees;
			state.listLoading=false;
		});
	},
	selectsChange(state,selects){
		state.selects=selects;
	},
	currentChange(state,currentPage){
		state.currentPage=currentPage;
		this.commit('getEmployees');
	},
	sizeChange(state,pageSize){
		state.pageSize=pageSize;
		this.commit('getEmployees');
	}
};

export default{
	state,
	getters,
	actions,
	mutations
};