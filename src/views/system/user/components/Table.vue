<template>
	<section>
	    <!--表格部分-->
		<el-col :span="24">
    		<el-table :data="users" v-loading="listLoading" @selection-change="selectsChange" style="width: 100%;">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column type="index" width="60"></el-table-column>
				<el-table-column prop="employeename" label="姓名" width="150"></el-table-column>
				<el-table-column prop="username" label="帐号" width="150"></el-table-column>
				<el-table-column prop="lastlogintime" label="最后登录时间"></el-table-column>
				<el-table-column prop="status" label="状态" width="100">
			    	<template slot-scope="scope"><el-tag :type="scope.row.status==0?'danger':'success'" close-transition>{{formatStatus(scope.row.status)}}</el-tag></template>
				</el-table-column>
				<el-table-column prop="created_at" label="创建日期" width="100" sortable></el-table-column>
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
//引用数据操作API
import store from '@/store'
//引用vuex的导入语法糖功能
import {createNamespacedHelpers} from 'vuex';
const {mapGetters,mapActions}=createNamespacedHelpers('system/user');
	export default{
		name:'UserTable',
		//计算属性
		computed:{
			//导入store的getters属性
			...mapGetters(['users','listLoading','total','pageSize'])
		},
		//当前方法
		methods:{
			//导入actions方法
			...mapActions(['getUsers','selectsChange','currentChange','sizeChange']),
			//格式化状态列
			formatStatus:function(value){
				return value==1?'启用':'停用';
			},
		},
		//Vue勾子函数，重新渲染执行
		mounted(){
			//读取员工表格数据
			this.getUsers();
		}
	}
</script>