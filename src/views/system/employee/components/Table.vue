<template>
	<section>
	    <!--表格部分-->
		<el-col :span="24">
    		<el-table :data="employees" v-loading="$store.state.EmployeeStore.listLoading" @selection-change="selectsChange" style="width: 100%;">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column type="index" width="60"></el-table-column>
				<el-table-column prop="employeeno" label="员工编号" width="150"></el-table-column>
				<el-table-column prop="employeename" label="员工姓名" width="150"></el-table-column>
		        <el-table-column prop="employeesex" label="性别" width="80" :formatter="formatSex" sortable></el-table-column>
				<el-table-column prop="departmentname" label="部门" width="200"></el-table-column>
				<el-table-column prop="employeejobtitle" label="职称" min-width="200"></el-table-column>
				<el-table-column prop="employeeage" label="年龄" width="100" sortable></el-table-column>
				<el-table-column prop="status" label="状态" width="100">
			    	<template slot-scope="scope"><el-tag :type="scope.row.status==0?'danger':'success'" close-transition>{{formatStatus(scope.row.status)}}</el-tag></template>
				</el-table-column>
				<el-table-column prop="created_at" label="创建日期" width="100" sortable></el-table-column>
			</el-table>
		</el-col>
		<!--分页部分-->
		<el-col :span="24" class="toolbar">
			<el-pagination  background layout="total,sizes,prev, pager, next,jumper" @size-change="sizeChange"  @current-change="currentChange" :page-sizes="[10,20,50,100]" :page-size="$store.state.EmployeeStore.pageSize" :total="$store.state.EmployeeStore.total" style="float:right;">
			</el-pagination>
		</el-col>
	</section>
</template>

<script>
//导入数据操作API
import store from '@/store'
import {mapGetters} from 'vuex'
	export default{
		name:'EmployeeTable',
		computed:{
			...mapGetters([
				'employees'
			])
		},
		methods:{
			selectsChange(selects){
				this.$store.commit('selectsChange',selects);
			},
			currentChange(currentPage){
				this.$store.commit('currentChange',currentPage)
			},
			sizeChange(pageSize){
			    //this.$store.commit('sizeChange',pageSize)
			    this.$store.dispatch('sizeChange',pageSize);
			},
			formatSex:function(row,column){
				return row.employeesex==1?'男':row.employeesex==0?'女':'未知';
			},
			formatStatus:function(value){
				return value==1?'启用':'停用';
			},
		}
	}
</script>