<template>
	<section>
        <!--新增界面-->
	    <el-dialog title="新增员工" :visible.sync="addFormVisible" :close-on-click-modal="false">
	        <el-col :span="6">
                <el-tree 
                  :data="departments"
                  :props="defaultProps"
                  node-key="id"
                  default-expand-all
                  :expand-on-click-node="false"
                  @node-click="treeClick">
                </el-tree>
	        </el-col>   
	        <el-col :span="18" style="border-left:2px solid rgb(234,234,234);">
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
				        <el-date-picker type="date" placeholder="选择日期"  v-model="addForm.employeehiredate"></el-date-picker>
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
	        <el-col :span="6">
                <el-tree 
                  :data="departments"
                  :props="defaultProps"
                  node-key="id"
                  default-expand-all
                  :expand-on-click-node="false"
                  @node-click="treeClick">
                </el-tree>
	        </el-col>   
	        <el-col :span="18" style="border-left:2px solid rgb(234,234,234);">
	    	    <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
	    	        <el-form-item label="所属部门" prop="departmentname">
	                    <el-input v-model="editForm.departmentname" auto-complete="off" :disabled="true"></el-input>
	                </el-form-item>
	                <el-form-item label="员工编号" prop="employeeno">
	                    <el-input v-model="editForm.employeeno" auto-complete="off"></el-input>
	                </el-form-item>
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
				        <el-date-picker type="date" placeholder="选择日期"  v-model="editForm.employeehiredate"></el-date-picker>
			        </el-form-item>
			        <el-form-item label="状态">
                        <el-switch v-model="editForm.status"></el-switch>
                    </el-form-item>
	            </el-form>
	        </el-col>
	        <div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editFormSubmit" :loading="editLoading">提交</el-button>
		    </div>
	    </el-dialog>
        <!--操作按钮组部分-->
        <el-col :span="24">
            <el-button-group>
                <el-button size="small" type="primary" @click="addFormShow">新增</el-button>
                <el-button size="small" type="primary" @click="editFormShow" :disabled="$store.state.EmployeeStore.selects.length===0">编辑</el-button>
                <el-button size="small" type="danger" @click="remove" :disabled="$store.state.EmployeeStore.selects.length===0">删除</el-button>
                <el-button size="small" type="info">导出Excel</el-button>
            </el-button-group>
        </el-col>
        <!--默认提示信息部分-->
        <el-col :span="24">
            <el-alert :title="title" type="info" show-icon style="margin-top:10px;"></el-alert>
        </el-col>
	</section>
</template>

<script>
import {batchremoveEmployee,addEmployee,editEmployee,getDepartmentList} from '@/service/system';
import util from '@/common/util';
import store from '@/store'
	export default{
		name:'EmployeeForm',
		//默认数据state
		data(){
			return{
				title:'可以对员工进行增删改查的管理！',
				sels:[],
				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					departmentname:[
					    { required:true,message:'请选择所属部门',trigger:'blur'}
					],
				    employeeno:[
				        { required:true,message:'请输入员工编号',trigger:'blur'}
				    ],
				    employeename: [
					    { required: true, message: '请输入员工姓名', trigger: 'blur' }
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
				},
				departments:[],
				defaultProps: {
                    children: 'children',
                    label: 'label'
                },
			}
		},
		mounted(){
			this.getDepartments();
		},
		methods:{
			getDepartments(){
               let para={};
               getDepartmentList(para).then((res)=>{
               this.departments=res.data.departments;
               });
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
					status:true,
					isdel:false,
					version:1,
					created_at:Date(),
					updated_at:Date()
				}
			},
			addFormSubmit(){
				this.$refs.addForm.validate((valid)=>{
					if(valid){
						this.$store.state.EmployeeStore.addLoading=true;
						let param=Object.assign({},this.addForm);
						param.employeehiredate=(!param.employeehiredate||param.employeehiredate=='')?'':util.formatDate.format(new Date(param.employeehiredate), 'yyyy-MM-dd');
						param.created_at=(!param.created_at||param.created_at=='')?'':util.formatDate.format(new Date(param.created_at), 'yyyy-MM-dd');
						param.status==true?1:0;
						addEmployee(param).then((data)=>{
							this.$store.state.EmployeeStore.addLoading=false;
							let {code}=data;
							if(code===200){
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.$store.commit('getEmployees');
							}
						});
					}
				});
			},
			editFormShow(){
				if(this.$store.state.EmployeeStore.selects.length>1){
					this.$message.error('只能选择一条进行编辑!');
					return;
				}
				this.editFormVisible=true;
				this.editForm={
					sysno:this.$store.state.EmployeeStore.selects[0].sysno,
					employeename:this.$store.state.EmployeeStore.selects[0].employeename,
					employeesex:this.$store.state.EmployeeStore.selects[0].employeesex,
					employeeage:this.$store.state.EmployeeStore.selects[0].employeeage,
					employeehiredate:this.$store.state.EmployeeStore.selects[0].employeehiredate,
					department_sysno:this.$store.state.EmployeeStore.selects[0].department_sysno,
					departmentname:this.$store.state.EmployeeStore.selects[0].departmentname,
					employeeno:this.$store.state.EmployeeStore.selects[0].employeeno,
					employeejobtitle:this.$store.state.EmployeeStore.selects[0].employeejobtitle,
					updated_at:this.$store.state.EmployeeStore.selects[0].updated_at,
					status:this.$store.state.EmployeeStore.selects[0].status==1?true:false
				}
			},
			editFormSubmit(){
				this.$refs.editForm.validate((valid)=>{
					if(valid){
						this.$store.state.EmployeeStore.editLoading=true;
						let param=Object.assign({},this.editForm);
						param.employeehiredate=(!param.employeehiredate||param.employeehiredate=='')?'':util.formatDate.format(new Date(param.employeehiredate), 'yyyy-MM-dd');
						editEmployee(param).then((data)=>{
							this.$store.state.EmployeeStore.editLoading=false;
							let {code}=data;
							if(code===200){
								this.$message({
									message: '修改成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.$store.dispatch('getEmployees');
							}
						});
					}
				});
			},
			remove(){
				let sysnos=this.$store.state.EmployeeStore.selects.map(item=>item.sysno).toString();
				this.$confirm('确认删除选中的 ['+this.$store.state.EmployeeStore.selects.length+'] 条记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.$store.state.EmployeeStore.listLoading=true;
					let param={sysnos:sysnos};
					batchremoveEmployee(param).then((res)=>{
						this.$store.state.EmployeeStore.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.$store.dispatch('getEmployees');
					});
				}).catch(() => {
				});
			},
			treeClick(data){
				this.addForm.departmentname=data.departmentname;
      		    this.addForm.parent_sysno=data.sysno;
      		    this.editForm.departmentname=data.departmentname;
      		    this.editForm.parent_sysno=data.sysno;
            }
		}
	}
</script>