<template>
	<section>
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
        <!--操作按钮组部分-->
        <el-col :span="24">
            <el-button-group>
                <el-button size="small" type="primary" @click="addFormShow">新增</el-button>
                <el-button size="small" type="primary" @click="editFormShow2" :disabled="this.sels.length===0">编辑</el-button>
                <el-button size="small" type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
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
import {bus} from '@/common/EventBus'
	export default{
		name:'EmployeeForm',
		created(){
	
		},
		//默认数据state
		data(){
			return{
				title:'可以对员工进行增删改查的管理！',
				sels:[],
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
				},
				departments:[],
				defaultProps: {
                    children: 'children',
                    label: 'label'
                },
			}
		},
		methods:{
			getEmployees(){

			},
			addFormShow(){

			},
			editFormShow2(){

			},
			batchRemove(){

			},
			treeClick(data){

            }
		}
	}
</script>