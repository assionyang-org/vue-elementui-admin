<template>
    <section>
    	<!--工具条-->
	<el-col :span="24" class="toolbar" style="padding-top:10px;">
		<el-form :inline="true">
			<el-form-item>
				<el-input  placeholder="姓名"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" >查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" >新增</el-button>
			</el-form-item>
		</el-form>
    </el-col>
 
	<el-col :span="24">
    <el-table :data="users" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120">
			</el-table-column>
			<el-table-column prop="sex" label="性别" width="100">
			</el-table-column>
			<el-table-column prop="age" label="年龄" width="100">
			</el-table-column>
			<el-table-column prop="birth" label="生日" width="120">
			</el-table-column>
			<el-table-column prop="addr" label="地址" min-width="180">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
	</el-table>
	</el-col>
	<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" >批量删除</el-button>
			<el-pagination layout="prev, pager, next" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
    </section>
</template>

<script>
import util from '../../common/util'
import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../service/api';
	export default{
		name:'Table',
		data(){
			return {
				users: [],
				total: 100,
				page: 1,
			}
		},
		methods:{
			getUsers(){
				let para = {
					page: this.page,
					name: ''
				};
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					//NProgress.done();
				});
			}
		},
		mounted(){
			console.log('ok');
			this.getUsers();
		}
	}
</script>