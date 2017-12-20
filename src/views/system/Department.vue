<template>
  <section>
  	<el-row style="heigth:300px;">

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


  		<el-col :span="20" style="border-left:2px solid rgb(234,234,234);padding-left:10px;">
      <el-tabs type="card" v-model="activeName" @tab-click="tabClick">
      <el-tab-pane  label="新增" name="first">
          <el-form :model="addform" label-width="80px" ref="addForm" :rules="rules">
              <el-form-item label="上级部门" prop="parent_departmentname">
                <el-input v-model="addform.parent_departmentname" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="部门名称" prop="departmentname">
                <el-input v-model="addform.departmentname" ></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-switch v-model="addform.status"></el-switch>
              </el-form-item>
              <el-form-item label="角色">
                <el-transfer :titles="['所有角色', '授予角色']"></el-transfer>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="add" :disabled="addform.parent_sysno<=0 || addform.departmentname===''">新增</el-button>
                <el-button @click="clearForm">重置</el-button>
              </el-form-item>
        </el-form>
    </el-tab-pane>
    <el-tab-pane label="修改删除" name="second">
        <el-form :model="form" label-width="80px" ref="editForm" :rules="rules">
              <el-form-item label="上级部门" prop="parent_departmentname">
                <el-input v-model="form.parent_departmentname" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="部门名称"  prop="departmentname">
                <el-input v-model="form.departmentname"></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-switch v-model="form.status"></el-switch>
              </el-form-item>
              <el-form-item label="角色">
                <el-transfer :titles="['所有角色', '授予角色']"></el-transfer>
              </el-form-item>
              <el-form-item>
                <el-button type="warning" @click="edit" :disabled="form.sysno<=0 || form.departmentname===''">修改</el-button>
                <el-button type="danger" @click="remove" :disabled="form.sysno<=0 || form.departmentname===''">删除</el-button>
                <el-button @click="clearForm">重置</el-button>
              </el-form-item>
        </el-form>

    </el-tab-pane>
    </el-tabs>
  			
  		</el-col>
  	</el-row>
  </section>
</template>

<script>
import {getDepartmentList,removeDepartment,addDepartment,editDepartment} from '@/service/api';
	export default{
		name:'Department',
		 data() {
      return {
        departments:[],
        activeName:'first',
        addform:{
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
        rules: {
          departmentname: [
            { required: true, message: '部门名称不能为空', trigger: 'blur' }
          ],
          parent_departmentname:[
            { required: true, message: '上级部门不能为空', trigger: 'blur'}
          ]
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
	},
	methods: {
    clearForm(){
      this.form.sysno=-1;
      this.form.parent_sysno=-1;
      this.form.parent_departmentname='';
      this.form.departmentname='';
      this.form.status=1;
      this.form.isdel=false;
      this.form.version=1;
      this.form.created_at=Date();
      this.form.updated_at=Date();
      this.form.children=[];

      this.addform.sysno=-1;
      this.addform.parent_sysno=-1;
      this.addform.parent_departmentname='';
      this.addform.departmentname='';
      this.addform.status=1;
      this.addform.isdel=false;
      this.addform.version=1;
      this.addform.created_at=Date(),
      this.addform.updated_at=Date(),
      this.addform.children=[]
    },
    getDepartments(){
      let para={date:Date()};
      getDepartmentList(para).then((res)=>{
        this.departments=res.data.departments;
      });


    },
    treeClick(data){
      this.form.sysno=data.sysno;
      this.form.departmentname=data.departmentname;
      this.form.status=data.status==1;
      this.form.parent_departmentname=data.parent_departmentname;
      this.form.parent_sysno=data.parent_sysno;
      this.form.children=data.children!=undefined?data.children:[];

      this.addform.sysno=100;
      this.addform.status=data.status==1;
      this.addform.parent_departmentname=data.departmentname;
      this.addform.parent_sysno=data.sysno;
      this.addform.children=data.children!=undefined?data.children:[];
    },
    tabClick(){
      this.clearForm();
    },
    add(){
      this.$refs.addForm.validate((valid) => {
          if(valid){
            let para={sysno:this.addform.sysno,parent_sysno:this.addform.parent_sysno,departmentname:this.addform.departmentname,status:this.addform.status,isdel:this.addform.isdel,version:this.addform.version,created_at:this.addform.created_at,updated_at:this.addform.updated_at};
            addDepartment(para).then((data)=>{
                let {code}=data;
                if(code=='200'){
                  this.clearForm();
                  this.getDepartments();
                  this.$message({
                  message: '新增成功！',
                  type: 'success'
                  });
                }
            });

          }
      });
    },
    edit(){
      this.$refs.editForm.validate((valid)=>{
          if(valid){
              let para={sysno:this.form.sysno,parent_sysno:this.form.parent_sysno,departmentname:this.form.departmentname,status:this.form.status,isdel:this.form.isdel,
                version:this.form.version,created_at:this.form.created_at,updated_at:this.form.updated_at};
              editDepartment(para).then((data)=>{
                let {code}=data;
                if(code=='200'){
                  this.clearForm();
                  this.getDepartments();
                  this.$message({
                  message: '修改成功',
                  type: 'success'
                  });
                }
              });
          }
      });
    },
    remove(){
      if(this.form.sysno==-1){
        this.$message.error('没有选择要删除的部门！');
        return;
      }

      if(this.form.children.length>0){
        this.$message.error('该部门有下级部门，请先删除下级部门!');
        return;
      }


      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          let para={sysno:this.form.sysno}
          removeDepartment(para).then((res)=>{
          if(res.data.code=='200'){

            this.clearForm();
            this.getDepartments();
            this.$message({
               message: '删除成功！',
               type: 'success'
            });
           }
          });
        }).catch(() => {
       
        });
    }
  },
  mounted(){
      this.getDepartments();
  }
}
</script>