<template>
	<section>
        <!--新增/修改界面-->
	    <el-dialog :title="formTitle" :visible.sync="formVisible" :close-on-click-modal="false">
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
	    	    <el-form :model="form" label-width="100px" :rules="formRules" ref="form">
	    	        <el-form-item label="所属部门" prop="departmentname">
	                    <el-input v-model="form.departmentname" auto-complete="off" :disabled="true"></el-input>
	                </el-form-item>
	                <el-form-item label="员工编号" prop="employeeno">
	                    <el-input v-model="form.employeeno" auto-complete="off"></el-input>
	                </el-form-item>
	                <el-form-item label="员工姓名" prop="employeename">
	                    <el-input v-model="form.employeename" auto-complete="off"></el-input>
	                </el-form-item>
	                <el-form-item label="员工性别">
			            <el-radio-group v-model="form.employeesex">
			        	    <el-radio class="radio" :label="1">男</el-radio>
			    	        <el-radio class="radio" :label="0">女</el-radio>
			            </el-radio-group>
			        </el-form-item>
			        <el-form-item label="员工年龄">
			    	    <el-input-number v-model="form.employeeage" :min="0" :max="200"></el-input-number>
			        </el-form-item>
			        <el-form-item label="入职日期">
				        <el-date-picker type="date" placeholder="选择日期"  v-model="form.employeehiredate"></el-date-picker>
			        </el-form-item>
			        <el-form-item label="状态">
                        <el-switch v-model="form.status"></el-switch>
                    </el-form-item>
	            </el-form>
	        </el-col>
	        <div slot="footer" class="dialog-footer">
				<el-button @click.native="formVisible = false">取消</el-button>
				<el-button type="primary" @click.native="formSubmit" :loading="formLoading">提交</el-button>
		    </div>
	    </el-dialog>
        <!--操作按钮组部分-->
        <el-col :span="24">
            <el-button-group>
                <el-button size="small" type="primary" @click="formShow('add')">新增</el-button>
                <el-button size="small" type="primary" @click="formShow('edit')" :disabled="selects.length!==1">编辑</el-button>
                <el-button size="small" type="danger" @click="remove" :disabled="selects.length===0">删除</el-button>
                <el-button size="small" type="info" @click="exportExcel" :loading="excelExportLoding" :disabled="selects.length===0">导出Excel</el-button>
            </el-button-group>
        </el-col>
        <!--默认提示信息部分-->
        <el-col :span="24">
            <el-alert :title="title" type="info" show-icon style="margin-top:10px;"></el-alert>
        </el-col>
	</section>
</template>

<script>
import {batchremoveEmployee,addEmployee,editEmployee,getDepartmentList} from '@/service/api';


import util from '@/common/util';
import store from '@/store'
//引用vuex的导入语法糖功能
import {createNamespacedHelpers} from 'vuex';
const {mapGetters,mapActions}=createNamespacedHelpers('system/employee');
	export default{
		name:'EmployeeForm',
		//默认数据state
		data(){
			return{
				title:'编辑同时只能选择一条数据进行编辑，删除可以选择多条批量删除，导出Excel是概据选择的数据进行导出的。',
				formTitle:'',
				//Excel导出loding状态
				excelExportLoding:false,
				//界面是否显示
				formVisible: false,
				//提交类型，true为新增，false为修改
				formAdd:true,
				//提交状态
				formLoading: false,
				//表单验证规则
				formRules: {
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
				//表单状态数据
				form: {
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
				//部门列表
				departments:[],
				//部门控件绑定字段属性
				defaultProps: {
                    children: 'children',
                    label: 'label'
                },
			}
		},
		mounted(){
			//查询部门
			this.getDepartments();
		},
		//计算属性
		computed:{
			//导入store的getters属性
			...mapGetters(['selects'])
		},
		methods:{
			//导入actions方法
			...mapActions(['getEmployees','listLoading']),
			//导出Excel
			exportExcel(){
				this.excelExportLoding=true;
				require.ensure([],()=>{
					const {export_json_to_excel} = require('@/common/Export2Excel');
					const tHeader=['员工姓名','所属部门','创建时间'];
					const filterVal=['employeename','departmentname','created_at'];
					const list=this.selects;
					const data=this.formatJson(filterVal,list);
					export_json_to_excel(tHeader,data,'员工表');
					this.excelExportLoding=false;
				})
			},
			formatJson(filterVal,jsonData){
				return jsonData.map(v=>filterVal.map(j=>v[j]));
			},
			//获得部门数据
			getDepartments(){
               let para={};
               getDepartmentList(para).then((res)=>{
               this.departments=res.data.departments;
               });
            },
            //显示新增/修改窗体
			formShow(show){
				this.formVisible=true;

				if(show=='add'){
					//新增
					this.formAdd=true;
					this.formTitle='新增员工';
					this.form={
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
				}else if(show=='edit'){
					if(this.selects.length>1){
						 this.$message.error('只能选择一条进行编辑！');
						 this.formVisible=false;
						 return;
					}
					//修改
					this.formAdd=false;
					this.formTitle='修改员工';
					this.form={
						sysno:this.selects[0].sysno,
						employeename:this.selects[0].employeename,
						employeesex:this.selects[0].employeesex,
						employeeage:this.selects[0].employeeage,
						employeehiredate:this.selects[0].employeehiredate,
						department_sysno:this.selects[0].department_sysno,
						departmentname:this.selects[0].departmentname,
						employeeno:this.selects[0].employeeno,
						employeejobtitle:this.selects[0].employeejobtitle,
						updated_at:this.selects[0].updated_at,
						status:this.selects[0].status==1?true:false
					}
				}
			},
			//新增/修改提交
			formSubmit(){
				this.$refs.form.validate((valid)=>{
					if(valid){
						this.editLoading=true;
						let param=Object.assign({},this.form);
						param.status==true?1:0;
						param.employeehiredate=(!param.employeehiredate||param.employeehiredate=='')?'':util.formatDate.format(new Date(param.employeehiredate), 'yyyy-MM-dd');
						if(this.formAdd){
							//新增
							param.created_at=(!param.created_at||param.created_at=='')?'':util.formatDate.format(new Date(param.created_at), 'yyyy-MM-dd');
							addEmployee(param).then((data)=>{
								this.formLoading=false;
								let {code}=data;
								if(code===200){
									this.$message({
										message: '提交成功',
										type: 'success'
									});
							    }
						    });
						}else{
							//修改
							editEmployee(param).then((data)=>{
								this.editLoading=false;
								let {code}=data;
								if(code===200){
									this.$message({
										message: '修改成功',
										type: 'success'
									});
								}
							});
						}
						this.$refs['form'].resetFields();
						this.formVisible = false;
						this.getEmployees();
					}
				});
			},
			//删除
			remove(){
				let sysnos=this.selects.map(item=>item.sysno).toString();
				this.$confirm('确认删除选中的 ['+this.selects.length+'] 条记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading(true);
					let param={sysnos:sysnos};
					batchremoveEmployee(param).then((res)=>{
						this.listLoading(false);
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getEmployees();
					});
				}).catch(() => {
				});
			},
			//部门树点击
			treeClick(data){
				this.form.departmentname=data.departmentname;
      		    this.form.parent_sysno=data.sysno;
            }
		}
	}
</script>