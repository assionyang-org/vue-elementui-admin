<template>
	<section>
		<!--查询过滤条件部分-->
		<el-col :span="24" class="toolbar" style="padding-top:10px;">
		    <el-form :inline="true" :model="filters" ref="filtersForm">
			    <el-form-item label="员工姓名" prop="employeename">
				    <el-input v-model="filters.employeename"  placeholder="姓名"></el-input>
			    </el-form-item>
			   <el-form-item label="帐号" prop="username">
				    <el-input v-model="filters.username"  placeholder="姓名"></el-input>
			    </el-form-item>
			    <el-form-item label="状态">
				    <el-select v-model="filters.status" placeholder="请选择">
				        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
				    </el-select>
			    </el-form-item>
			    <el-form-item>
				    <el-button type="primary" @click="getUsers" >查询</el-button>
			    </el-form-item>
			    <el-form-item>
                    <el-button @click="resetFilters({employeename:'',username:'',status:''})">重置</el-button>
			    </el-form-item>
		    </el-form>
        </el-col>
	</section>
</template>
<script>
import store from '@/store'
import {createNamespacedHelpers} from 'vuex';
const {mapGetters,mapActions}=createNamespacedHelpers('system/user');
	export default{
		name:'EmployeeFilters',
		data(){
			return{
				//查询表单状态选项
				statusOptions:[{value:-1,label:'全部'},{	value:1,label:'启用'	},{value:0,label:'停用'}]
			}
		},
		//计算属性
		computed:{
			//导入store getters
			...mapGetters(['filters'])
		},
		//本地方法
		methods:{
			//导入store actions
			...mapActions(['getUsers','resetFilters'])
		}
	}
</script>