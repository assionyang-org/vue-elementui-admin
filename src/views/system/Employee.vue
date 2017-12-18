<template>
    <section>
    <el-col :span="24" class="toolbar" style="padding-top:10px;">
		<el-form :inline="true" :model="filters" ref="filtersForm">
			<el-form-item label="员工姓名">
				<el-input v-model="filters.employeename"  placeholder="姓名"></el-input>
			</el-form-item>
			<el-form-item label="性别">
				<el-select v-model="filters.employeesex" placeholder="请选择">
				    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
                <el-button @click="resetFilters">重置</el-button>
			</el-form-item>
		</el-form>
    </el-col>
    <el-col :span="24">
        <el-button type="primary" @click="addFormShow">新增</el-button>
        <el-button type="primary" @click="editFormShow2" :disabled="this.sels.length===0">编辑</el-button>
        <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
        <el-button type="info">导出Excel</el-button>
    </el-col>
    <el-col :span="24">
        <el-alert title="消息提示的文案" type="info" show-icon style="margin-top:10px;"></el-alert>
    </el-col>
    <el-col :span="24">
    <el-table :data="employees" v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
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
			<el-table-column prop="employeejobtitle" label="职称" min-width="200">
			</el-table-column>
			<el-table-column prop="employeeage" label="年龄" width="100" sortable>
			</el-table-column>
			<el-table-column prop="status" label="状态" width="100">
			    <template slot-scope="scope"><el-tag :type="scope.row.status===0?'danger':'success'" close-transition>{{formatStatus(scope.row.status)}}</el-tag></template>
			</el-table-column>
			<el-table-column prop="created_at" label="创建日期" width="100" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="editFormShow(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="remove(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
	</el-table>
	</el-col>
	<el-col :span="24" class="toolbar">
		<el-pagination  background layout="total,sizes,prev, pager, next,jumper" @size-change="sizeChange"  @current-change="currentChange" :page-sizes="[10,20,50,100]" :page-size="pageSize" :total="total" style="float:right;">
		</el-pagination>
	</el-col>



	<!--新增界面-->
	<el-dialog title="新增员工" :visible.sync="addFormVisible" :close-on-click-modal="false">
	    <el-col :span="5">
            <el-tree 
              :data="departments"
              :props="defaultProps"
              node-key="id"
              default-expand-all
              :expand-on-click-node="false"
              @node-click="treeClick">
            </el-tree>
	    </el-col>   
	    <el-col :span="19">
	    	<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
	    	<el-form-item label="所属部门" prop="departmentname">
	            <el-input v-model="addForm.departmentname" auto-complete="off" :disabled="true"></el-input>
	        </el-form-item>
	        <el-form-item label="员工编号" prop="employeeno">
	            <el-input v-model="addForm.employeeno" auto-complete="off"></el-input>
	        </el-form-item>
	        <el-form-item label="员工姓名" prop="employeename">
	            <el-input v-model="addForm.employeename" auto-complete="off"></el-input>
	        </el-form-item>
	        <el-form-item label="员工性别">
			    <el-radio-group v-model="addForm.employeesex">
				<el-radio class="radio" :label="1">男</el-radio>
				<el-radio class="radio" :label="0">女</el-radio>
			    </el-radio-group>
			</el-form-item>
			<el-form-item label="员工年龄">
				<el-input-number v-model="addForm.employeeage" :min="0" :max="200"></el-input-number>
			</el-form-item>
			<el-form-item label="入职日期">
				<el-date-picker type="date" placeholder="选择日期" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" v-model="addForm.employeehiredate"></el-date-picker>
			</el-form-item>
			<el-form-item label="状态">
                <el-switch v-model="addForm.status"></el-switch>
            </el-form-item>
	        </el-form>
	    </el-col>
	    <div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addFormSubmit" :loading="addLoading">提交</el-button>
		</div>
	</el-dialog>
	<!--修改界面-->
	<el-dialog title="修改员工" :visible.sync="editFormVisible" :close-on-click-modal="false">
	    <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
	        <el-form-item label="员工姓名" prop="employeename">
	            <el-input v-model="editForm.employeename" auto-complete="off"></el-input>
	        </el-form-item>
	        <el-form-item label="员工性别">
			    <el-radio-group v-model="editForm.employeesex">
				<el-radio class="radio" :label="1">男</el-radio>
				<el-radio class="radio" :label="0">女</el-radio>
			    </el-radio-group>
			</el-form-item>
			<el-form-item label="员工年龄">
				<el-input-number v-model="editForm.employeeage" :min="0" :max="200"></el-input-number>
			</el-form-item>
			<el-form-item label="入职日期">
				<el-date-picker type="date" placeholder="选择日期" v-model="editForm.employeehiredate"></el-date-picker>
			</el-form-item>
	    </el-form>
	    <div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editFormSubmit" :loading="editLoading">提交</el-button>
		</div>
	</el-dialog>
    </section>
</template>
<script>
import {getDepartmentList,getEmployeeList,addEmployee,removeEmployee,batchremoveEmployee,editEmployee} from '@/service/api';
import util from '../../common/util';
	export default{
		name:'Employee',
		data(){
			return{
				options:[
				    {
				    	value:-1,
				    	label:'全部'
				    },
				    {
				    	value:1,
				    	label:'男'
				    },
				    {
				    	value:0,
				    	label:'女'
				    }
				],
				statusOptions:[
				    {
				    	value:-1,
				    	label:'全部'
				    },
				    {
				    	value:1,
				    	label:'启用'
				    },
				    {
				    	value:0,
				    	label:'停用'
				    }
				],
				employees:[],
				departments:[],
				defaultProps: {
                    children: 'children',
                    label: 'label'
                },
				sels: [],
				filters:{
					employeename:'',
					employeesex:'',
					created_at:'',
					status:''
				},
				total:0,
				page:1,
				pageSize:10,
				listLoading:false,

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
				employeename: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					sysno:1,
					parent_sysno:-1,
					departmentname:'',
					employeeno:'',
					employeename: '',
					employeesex: -1,
					employeeage: 0,
					employeehiredate: '',
					status:1,
					isdel:false,
					version:1,
					created_at:Date(),
					updated_at:Date()
				},


				editFormVisible: false,//修改界面是否显示
				editLoading: false,
				editFormRules: {
				employeename: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				editForm: {
					sysno:-1,
					employeename: '',
					employeesex: -1,
					employeeage: 0,
					employeehiredate: ''
				}
			}
		},
		methods:{
			getDepartments(){
               let para={};
               getDepartmentList(para).then((res)=>{
               this.departments=res.data.departments;
               });
            },
			getEmployees(){
				let param={
					page:this.page,
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
			resetFilters(){
				this.$refs.filtersForm.resetFields();
				this.filters.employeename='';
				this.filters.employeesex='';
				this.filters.created_at='';
				this.filters.status='';
				this.getEmployees();
			},
			selsChange(sels){
				this.sels = sels;
			},
			currentChange(val){
				this.page=val;
				this.getEmployees();
			},
			sizeChange(val){
			    this.pageSize=val;
			    this.getEmployees();
			},
			formatSex:function(row,column){
				return row.employeesex==1?'男':row.employeesex==0?'女':'未知';
			},
			formatStatus:function(value){
				return value===1?'启用':'停用';
			},
			addFormShow(){
				this.addFormVisible=true;
				this.addForm={
					sysno:1,
					parent_sysno:-1,
					departmentname:'',
					employeeno:'',
					employeename: '',
					employeesex: -1,
					employeeage: 0,
					employeehiredate: '',
					status:1,
					isdel:false,
					version:1,
					created_at:Date(),
					updated_at:Date()
				}
			},
			treeClick(data){
      		    this.addForm.departmentname=data.departmentname;
      		    this.addForm.parent_sysno=data.sysno;
            },
			addFormSubmit(){
				this.$refs.addForm.validate((valid)=>{
					if(valid){
						this.addLoading=true;
						let param=Object.assign({},this.addForm);
						param.employeehiredate=(!param.employeehiredate||param.employeehiredate=='')?'':util.formatDate.format(new Date(param.employeehiredate), 'yyyy-MM-dd');
						addEmployee(param).then((data)=>{
							this.addLoading=false;
							let {code}=data;
							console.log(code);
							if(code===200){
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getEmployees();
							}
						});
					}
				});
			},
			editFormShow(index,row){
				this.editFormVisible=true;
				this.editForm={
					sysno:row.sysno,
					employeename:row.employeename,
					employeesex:row.employeesex,
					employeeage:row.employeeage,
					employeehiredate:row.employeehiredate
				}
			},
			editFormShow2(){
				if(this.sels.length>1){
					this.$message.error('只能选择一条进行编辑!');
					return;
				}
				this.editFormVisible=true;
				this.editForm={
					sysno:this.sels[0].sysno,
					employeename:this.sels[0].employeename,
					employeesex:this.sels[0].employeesex,
					employeeage:this.sels[0].employeeage,
					employeehiredate:this.sels[0].employeehiredate
				}
			},
			editFormSubmit(){
				this.$refs.editForm.validate((valid)=>{
					if(valid){
						this.editLoading=true;
						let param=Object.assign({},this.editForm);
						param.employeehiredate=(!param.employeehiredate||param.employeehiredate=='')?'':util.formatDate.format(new Date(param.employeehiredate), 'yyyy-MM-dd');
						editEmployee(param).then((data)=>{
							this.editLoading=false;
							let {code}=data;
							console.log(code);
							if(code===200){
								this.$message({
									message: '修改成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getEmployees();
							}
						});
					}
				});
			},
			remove(index,row){
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let param = {sysno:row.sysno};
					removeEmployee(param).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getEmployees();
					});
				}).catch(() => {
				});
			},
			batchRemove(){
				let sysnos=this.sels.map(item=>item.sysno).toString();
				this.$confirm('确认删除选中记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading=true;
					let param={sysnos:sysnos};
					batchremoveEmployee(param).then((res)=>{
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getEmployees();
					});
				}).catch(() => {
				});
			}
		},
		mounted(){
			this.getDepartments();
			this.getEmployees();
		}
	}
</script>