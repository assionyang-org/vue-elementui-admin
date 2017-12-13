<template>
  <section>
    <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
    {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="modpass">修改密码</el-dropdown-item>
    <el-dropdown-item command="logout" divided>退出</el-dropdown-item>
  </el-dropdown-menu>
  </el-dropdown>
  <el-dialog title="修改密码" :visible.sync="dialogFormVisible" >
  <el-form>
    <el-form-item label="旧密码" >
      <el-input  auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="新密码" >
      <el-input  auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认新密码">
      <el-input  auto-complete="off"></el-input>
    </el-form-item>
  
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
  </el-dialog>
  </section>
</template>

<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #8a8f8e;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>

<script>
	export default{
    data(){
      return{
        name:'',
        dialogFormVisible: false,
      }
    },
    mounted(){
      let user=JSON.parse(sessionStorage.getItem('user'));
      this.name=user.name;
    },
		methods:{
			handleCommand(command){
        if(command=="logout"){
          
          this.$confirm('确认退出系统吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('user');
          this.$router.push({path:'/login'});
        }).catch(() => {
        
        });
        }
        if(command=="modpass"){
          this.dialogFormVisible=true;
        }
				
			}
		}
	}
</script>