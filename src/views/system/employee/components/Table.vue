<template>
	<section>
	    <!--表格部分-->
		<el-col :span="24">
    		<el-table :data="employees" v-loading="listLoading" @selection-change="selectsChange" style="width: 100%;">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column type="index" width="60"></el-table-column>
				<el-table-column prop="employeeno" label="员工编号" width="150"></el-table-column>
				<el-table-column prop="employeename" label="员工姓名" width="150"></el-table-column>
		        <el-table-column prop="employeesex" label="性别" width="80" :formatter="formatSex" sortable></el-table-column>
				<el-table-column prop="departmentname" label="部门" width="200"></el-table-column>
				<el-table-column prop="employeejobtitle" label="职称" min-width="200"></el-table-column>
				<el-table-column prop="employeeage" label="年龄" width="100" sortable></el-table-column>
				<el-table-column prop="status" label="状态" width="100">
			    	<template slot-scope="scope"><el-tag :type="scope.row.status===0?'danger':'success'" close-transition>{{formatStatus(scope.row.status)}}</el-tag></template>
				</el-table-column>
				<el-table-column prop="created_at" label="创建日期" width="100" sortable></el-table-column>
				<el-table-column label="操作" width="150">
					<template scope="scope">
						<el-button size="small" @click="editFormShow(scope.$index, scope.row)">编辑</el-button>
						<el-button type="danger" size="small" @click="remove(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-col>
		<!--分页部分-->
		<el-col :span="24" class="toolbar">
			<el-pagination  background layout="total,sizes,prev, pager, next,jumper" @size-change="sizeChange"  @current-change="currentChange" :page-sizes="[10,20,50,100]" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	</section>
</template>

<script>
//导入数据操作API
import {getEmployeeList} from '@/service/system';
//导入工具类用来处理日期格式
import util from '@/common/util';
//导入事件总线用于组件间通信
import {bus} from '@/common/EventBus'

	export default{
		name:'EmployeeTable',
		data(){
			return{
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
			}
		},
		created(){
			//注册事件
			bus.$on('setFilters',(filters)=>{
				this.filters=filters;
				this.getEmployees();
			});
		},
		methods:{
			getEmployees(){
				let param={
					currentPage:this.currentPage,
					pageSize:this.pageSize,
					employeename:this.filters.employeename,
					employeesex:this.filters.employeesex,
					created_at:this.filters.created_at,
					status:this.filters.status
				};
				this.listLoading=true;
				getEmployeeList(param).then((res)=>{
					this.total=res.data.total;
					this.employees=res.data.employees;
					this.listLoading=false;
				});
				console.log(this.filters.created_at);
			},
			selectsChange(selects){
				this.selects = selects;
			},
			currentChange(currentPage){
				this.currentPage=currentPage;
				this.getEmployees();
			},
			sizeChange(pageSize){
			    this.pageSize=pageSize;
			    this.getEmployees();
			},
			formatSex:function(row,column){
				return row.employeesex==1?'男':row.employeesex==0?'女':'未知';
			},
			formatStatus:function(value){
				return value===1?'启用':'停用';
			},
		},
		mounted(){
			this.getEmployees();
		}
	}
</script>