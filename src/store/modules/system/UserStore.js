import Vue from 'vue';
import {getUserList} from '@/service/api';

//状态
const state={
	//用户列表
	users:[],
	//表格选择行数据
	selects:[],
	//总记录数
	total:0,
	//当前页
	currentPage:1,
	//每页显示记录数
	pageSize:10,
	//表格加载状态
	listLoading:false,
	//过虑条件
	filters:{
		employeename:'',
		username:'',
		status:''
	}
}

//getter
const getters={
	users:state=>state.users,
	selects:state=>state.selects,
	pageSize:state=>state.pageSize,
	total:state=>state.total,
	listLoading:state=>state.listLoading,
	filters:state=>state.filters
}

//actions
const actions={
	getUsers({commit,state}){
		let param={
			currentPage:state.currentPage,
			pageSize:state.pageSize,
			employeename:state.filters.employeename,
			username:state.filters.username,
			status:state.filters.status
		};
		commit('listLoading',true);
		getUserList(param).then((res)=>{
			commit('loadList',res.data);
			commit('listLoading',false);
		});
	},
	//表格选择行
	selectsChange({commit,dispatch},selects){
		commit('selectsChange',selects);
	},
	//表格翻页
	currentChange({commit,dispatch},currentPage){
		commit('currentChange',currentPage);
		dispatch('getUsers');
	},
	//表格设置每页条数
	sizeChange({commit,dispatch},pageSize){
		commit('sizeChange',pageSize);
		dispatch('getUsers');
	},
	//重置过虑器
	resetFilters({commit,dispatch},filters){
		commit('resetFilters',filters);
		dispatch('getUsers');
	},
	//表格载入状态
	listLoading({commit},isShow){
		commit('listLoading',isShow);
	}
}

//mutations
const mutations={
	//用户列表数据状态变更
	loadList(state,param){
		state.total=param.total;
		state.users=param.users;
	},
	//表格载入状态变更
	listLoading(state,isShow){
		state.listLoading=isShow;
	},
	//表格选中行数据状态变更
	selectsChange(state,selects){
		state.selects=selects;
	},
	//表格翻页状态变更
	currentChange(state,currentPage){
		state.currentPage=currentPage;
	},
	//表格每页显示条数状态变更
	sizeChange(state,pageSize){
		state.pageSize=pageSize;
	},
	//查询条件过虑器状态充更
	resetFilters(state,filters){
		state.filters=filters;
	}
}

export default{
	namespaced:true,
	state,
	getters,
	actions,
	mutations
}