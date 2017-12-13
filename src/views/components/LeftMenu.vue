<template>
	<el-menu :collapse="collapsed"
	  router
	  unique-opened
      default-active="2"
      @open="handleOpen"
      @close="handleClose"
      background-color="#031529"
      style="border-right:0px;"
      text-color="#b7bcc2"
      active-text-color="#fff"
      >
      <el-menu-item index="dashboard">
        <i class="el-icon-date"></i>
        <span slot="title">Dashboard</span>
        </el-menu-item>
       <el-submenu index="1" background-color="#fff">
        
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>组件</span>
        </template>


          <el-menu-item index="form">表单</el-menu-item>
          <el-menu-item index="table" >表格</el-menu-item>
          <el-menu-item index="vuextest" >vuex测试</el-menu-item>
          <el-menu-item index="slide" >跑马灯</el-menu-item>
          <el-menu-item index="notify" >通知</el-menu-item>
          <el-menu-item index="collapse" >折叠面板</el-menu-item>
          <el-menu-item index="dialog" >对话框</el-menu-item>
          <el-menu-item index="Upload" >文件上传</el-menu-item>
          <el-menu-item index="test1" >测试1</el-menu-item>

        <el-submenu index="1-4">
          <template slot="title" >测试2</template>
          <el-menu-item index="test2">测试2</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="notfound">
        <i class="el-icon-menu"></i>
        <span slot="title">404页</span>
      </el-menu-item>
      <el-menu-item index="login">
        <i class="el-icon-setting"></i>
        <span slot="title">登录页</span>
      </el-menu-item>
    </el-menu>


</template>


<script>
  export default {
  	name:'LeftMenu',
  	data(){
  		return{
  		}
  	},
  	props:['collapsed'],
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style>
  ul.el-menu > li > ul > li {
    background: rgb(1,12,23) !important;
  }
  ul.el-menu > li > ul > li.is-active {
    background:rgb(62,144,254) !important;
  }
</style>