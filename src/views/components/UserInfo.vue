<template>
  <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
    {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="modpass">修改密码</el-dropdown-item>
    <el-dropdown-item command="logout" divided>退出</el-dropdown-item>
  </el-dropdown-menu>
  </el-dropdown>
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
        name:''
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
				
			}
		}
	}
</script>