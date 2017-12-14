<template>
  <section>
  	<el-row>
  		<el-col :span="4">
        <el-tree
              :data="departments"
              :props="defaultProps"
              node-key="id"
              default-expand-all
              :expand-on-click-node="false"
              @node-click="treeClick">
        </el-tree>
  		</el-col>


  		<el-col :span="20" style="border-left:2px solid rgb(234,234,234);">
  			<el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="上级部门">
                <el-input v-model="form.parent_departmentname"></el-input>
              </el-form-item>
              <el-form-item label="部门名称">
                <el-input v-model="form.departmentname"></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-switch v-model="form.status"></el-switch>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" >保存</el-button>
                <el-button type="danger">删除</el-button>
                <el-button>重置</el-button>
              </el-form-item>
        </el-form>
  		</el-col>
  	</el-row>
  </section>
</template>

<script>
import {getDepartmentList} from '../../service/system';
import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../service/api';
	export default{
		name:'Department',
		 data() {
      return {
        departments:[],
      	form: {
          sysno: -1,
          parent_sysno:-1,
          parent_departmentname:'',
          departmentname:'',
          status:1,
          isdel:false,
          version:1,
          created_at:Date(),
          updated_at:Date()
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
	},
	methods: {
    getDepartments(){
      let para={};
      getDepartmentList(para).then((res)=>{
        this.departments=res.data.departments;
      });
    },
    treeClick(data){
      this.form.departmentname=data.departmentname;
      this.form.status=data.status==1;
      this.form.parent_departmentname=data.parent_departmentname;
    }
  },
    mounted(){
      this.getDepartments();
  }
}
</script>