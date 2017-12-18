<template>
	<section>
		<!--查询过滤条件部分-->
		<el-col :span="24" class="toolbar" style="padding-top:10px;">
		    <el-form :inline="true" :model="filters" ref="filtersForm">
			    <el-form-item label="员工姓名" prop="employeename">
				    <el-input v-model="filters.employeename"  placeholder="姓名"></el-input>
			    </el-form-item>
			    <el-form-item label="性别">
				    <el-select v-model="filters.employeesex" placeholder="请选择">
				        <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
				    </el-select>
			    </el-form-item>
			    <el-form-item label="创建日期">
	                <el-date-picker
                    v-model="filters.created_at"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    format="yyyy年MM月dd日"
                    value-format="yyyy-MM-dd"
                    end-placeholder="结束日期">
                    </el-date-picker>
			    </el-form-item>
			    <el-form-item label="状态">
				    <el-select v-model="filters.status" placeholder="请选择">
				        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
				    </el-select>
			    </el-form-item>
			    <el-form-item>
				    <el-button type="primary" @click="getEmployees" >查询</el-button>
			    </el-form-item>
			    <el-form-item>
                    <el-button @click="resetFilters({employeename:'',employeesex:'',created_at:'',status:''})">重置</el-button>
			    </el-form-item>
		    </el-form>
        </el-col>
	</section>
</template>
<script>
import store from '@/store'
import {createNamespacedHelpers} from 'vuex';
const {mapGetters,mapActions}=createNamespacedHelpers('system/employee');
	export default{
		name:'EmployeeFilters',
		data(){
			return{
				//查询表单性别选项
				sexOptions:[{value:-1,label:'全部'},{value:1,label:'男'},{value:0,label:'女'}],
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
			...mapActions(['getEmployees','resetFilters'])
		}
	}
</script>