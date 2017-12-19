import Vue from 'vue';
//导入数据操作API
import {getEmployeeList} from '@/service/api';

//状态
const state={
	//员工列表state
	employees:[], 
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
	//过滤条件
	filters:{
		employeename:'',
		employeesex:'',
		created_at:'',
		status:''
	}
};

//getter
const getters={
	employees:state=>state.employees,
	selects:state=>state.selects,
	total:state=>state.total,
	currentPage:state=>state.currentPage,
	pageSize:state=>state.pageSize,
	listLoading:state=>state.listLoading,
	filters:state=>state.filters
};

//action
const actions={
	//查询员工列表
	getEmployees({commit,state}){
		let param={
			currentPage:state.currentPage,
			pageSize:state.pageSize,
			employeename:state.filters.employeename,
			employeesex:state.filters.employeesex,
			created_at:state.filters.created_at,
			status:state.filters.status
		};
		commit('listLoading',true);
		getEmployeeList(param).then((res)=>{
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
		dispatch('getEmployees');
	},
	//表格设置每页条数
	sizeChange({commit,dispatch},pageSize){
		commit('sizeChange',pageSize);
		dispatch('getEmployees');
	},
	//重置过虑器
	resetFilters({commit,dispatch},filters){
		commit('resetFilters',filters);
		dispatch('getEmployees');
	},
	//表格载入状态
	listLoading({commit},isShow){
		commit('listLoading',isShow);
	}
};

//mutations
const mutations={loadList(state,param){
		state.total=param.total;
		state.employees=param.employees;
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
	//员工列表数据状态变更
	
};

//导出
export default{
	//启用命名空间
	namespaced:true,
	state,
	getters,
	actions,
	mutations
};