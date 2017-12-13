<template>
  <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
    杨春来<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="a">修改密码</el-dropdown-item>
    <el-dropdown-item command="b">设置</el-dropdown-item>
    <el-dropdown-item command="d" divided>退出</el-dropdown-item>
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
		methods:{
			handleCommand(command){
				this.$message('click on item'+command);
			}
		}
	}
</script>