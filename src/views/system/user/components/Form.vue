<template>
	<section>
        <!--新增/修改界面-->
	    <el-dialog :title="formTitle" :visible.sync="formVisible" :close-on-click-modal="false">
	    	<el-form :model="form" label-width="100px" :rules="formRules" ref="form">
	            <el-form-item label="员工姓名" prop="employeename">
	                <el-input v-model="form.employeename" auto-complete="off"></el-input>
	            </el-form-item>
			    <el-form-item label="帐号" prop="employeename">
	                <el-input v-model="form.employeename" auto-complete="off"></el-input>
	            </el-form-item>
			    <el-form-item label="状态">
                    <el-switch v-model="form.status"></el-switch>
                </el-form-item>
                <el-form-item label="角色">
                    <el-transfer :titles="['所有权限', '我的权限']"></el-transfer>
                </el-form-item>
	        </el-form>
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
import {getUserList} from '@/service/api';


import util from '@/common/util';
import store from '@/store'
//引用vuex的导入语法糖功能
import {createNamespacedHelpers} from 'vuex';
const {mapGetters,mapActions}=createNamespacedHelpers('system/user');
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
				    employeename: [
					    { required: true, message: '请输入员工姓名', trigger: 'blur' }
				    ],
				    username: [
					    { required: true, message: '请输入员工姓名', trigger: 'blur' }
				    ],
				    password: [
					    { required: true, message: '请输入员工姓名', trigger: 'blur' }
				    ]
				},
				//表单状态数据
				form: {
					sysno:1,
					employee_sysno:-1,
					employeename:'',
					username:'',
					password: '',
					status:1,
					isdel:false,
					version:1,
					created_at:Date(),
					updated_at:Date()
				}
			}
		},
		//计算属性
		computed:{
			//导入store的getters属性
			...mapGetters(['selects'])
		},
		methods:{
			//导入actions方法
			...mapActions(['getUsers','listLoading']),
			//导出Excel
			exportExcel(){
				this.excelExportLoding=true;
				require.ensure([],()=>{
					const {export_json_to_excel} = require('@/common/Export2Excel');
					const tHeader=['员工姓名','帐号','最后登录时间'];
					const filterVal=['employeename','username','lastlogintime'];
					const list=this.selects;
					const data=this.formatJson(filterVal,list);
					export_json_to_excel(tHeader,data,'用户表');
					this.excelExportLoding=false;
				})
			},
			formatJson(filterVal,jsonData){
				return jsonData.map(v=>filterVal.map(j=>v[j]));
			},
            //显示新增/修改窗体
			formShow(show){
				this.formVisible=true;

				if(show=='add'){
					//新增
					this.formAdd=true;
					this.formTitle='新增帐号';
					this.form={

				    }
				}else if(show=='edit'){
					if(this.selects.length>1){
						 this.$message.error('只能选择一条进行编辑！');
						 this.formVisible=false;
						 return;
					}
					//修改
					this.formAdd=false;
					this.formTitle='修改帐号';
					this.form={

					}
				}
			},
			//新增/修改提交
			formSubmit(){
				this.$refs.form.validate((valid)=>{
					if(valid){
						this.formLoading=true;
						let param=Object.assign({},this.form);
						param.status==true?1:0;

						if(this.formAdd){
							//新增
							param.created_at=(!param.created_at||param.created_at=='')?'':util.formatDate.format(new Date(param.created_at), 'yyyy-MM-dd');
	
						}else{
							//修改
		
						}
						this.$refs['form'].resetFields();
						this.formVisible = false;
						this.getUsers();
					}
				});
			},
			//删除
			remove(){
				let sysnos=this.selects.map(item=>item.sysno).toString();
				this.$confirm('确认删除选中的 ['+this.selects.length+'] 条记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					
				}).catch(() => {
				});
			}
		}
	}
</script>

<style>
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
</style>