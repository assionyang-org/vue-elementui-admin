<template>
    <section>
    <el-col :span="24" class="toolbar" style="padding-top:10px;">
		<el-form :inline="true" :model="filters">
			<el-form-item>
				<el-input v-model="filters.employeename"  placeholder="姓名"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="getEmployees" >查询</el-button>
			</el-form-item>
			<el-form-item>
                <el-button type="primary" >新增</el-button>
			</el-form-item>
		</el-form>
    </el-col>
    <el-col :span="24">
        <el-alert title="消息提示的文案" type="info" show-icon style="margin-top:10px;"></el-alert>
    </el-col>
    <el-col :span="24">
    <el-table :data="employees" v-loading="listLoading" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="employeeno" label="员工编号" width="150">
			</el-table-column>
			<el-table-column prop="employeename" label="员工姓名" width="150">
			</el-table-column>
			<el-table-column prop="employeesex" label="性别" width="80" :formatter="formatSex" sortable>
			</el-table-column>
			<el-table-column prop="departmentname" label="部门" width="200">
			</el-table-column>
			<el-table-column prop="jobtitle" label="职称" min-width="200">
			</el-table-column>
			<el-table-column prop="employeeage" label="年龄" width="100" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
	</el-table>
	</el-col>
	<el-col :span="24" class="toolbar">
		<el-button type="danger" >批量删除</el-button>
		<el-pagination  background layout="prev, pager, next" @current-change="currentChange" :page-size="20" :total="total" style="float:right;">
		</el-pagination>
	</el-col>
    </section>
</template>
<script>
import {getEmployeeList} from '../../service/system';
	export default{
		name:'Employee',
		data(){
			return{
				employees:[],
				filters:{
					employeename:''
				},
				total:0,
				page:1,
				listLoading:false
			}
		},
		methods:{
			getEmployees(){
				let param={
					page:this.page,
					employeename:this.filters.employeename
				};
				this.listLoading=true;
				getEmployeeList(param).then((res)=>{
					this.total=res.data.total;
					this.employees=res.data.employees;
					this.listLoading=false;
				});
			},
			currentChange(val){
				this.page=val;
				this.getEmployees();
			},
			formatSex:function(row,column){
				return row.employeesex==1?'男':row.employeesex==0?'女':'未知';
			}
		},
		mounted(){
			this.getEmployees();
		}
	}
</script>