<!--
***系统主窗体布局***
-->
<template>
    <el-container v-loading="sysloading">
        <el-aside :class="collapsed?'aside-mini':'aside-long'" width="collapsed?'65px':'220px'">
            <!--左侧-->
            <el-col :span="24" :class="collapsed?'logo-mini':'logo-long'">
                {{collapsed?logoMiniName:logoLongName}}
            </el-col>
            <el-col :span="24">
                <LeftMenu :collapsed="collapsed"></LeftMenu>
            </el-col>
        </el-aside>
        <!--右侧-->
        <el-container>
            <!--头部-->
            <el-header class="header">
                <el-col :span="12" style="background-color:red;">
                    <el-button style="margin-left:10px;" @click="collapse"><i :class="collapsed?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></i></el-button>
                </el-col>
                <el-col :span="12" style="text-align:right;background-color:blue;"><UserInfo></UserInfo></el-col>
            </el-header>
            <!--正文-->
            <el-main :class="collapsed?'main-mini':''">
                <el-col :span="24" style="background-color:#fff;height:71px;;">
                    <!--面包屑-->
                    <Breadcrumb></Breadcrumb>
                </el-col>
                <el-col :span="24" style="background-color:#fff; border: 20px solid #f0f2f5; padding: 20px;">
                    <!--主体内容路由视图-->
                    <router-view></router-view>     
                </el-col>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
//引入菜单、面包屑、用户信息组件
import LeftMenu from '@/views/components/LeftMenu'
import UserInfo from '@/views/components/UserInfo'
import Breadcrumb from '@/views/components/Breadcrumb'
//引用vuex的导入语法糖功能
import {createNamespacedHelpers} from 'vuex';
const {mapGetters,mapActions}=createNamespacedHelpers('app');
	export default{
		name:'Main',
		components:{
			LeftMenu,
      UserInfo,
      Breadcrumb
		},
    computed:{
      ...mapGetters(['logoLongName','logoMiniName','collapsed','sysloading'])
    },
		data(){
			return{

			}
		},
		methods: {
      ...mapActions(['setLogoLongName','setLogoMiniName','setCollapsed','setSysLoading']),
			//折叠导航栏，状态保存在sessionStorage中刷新保持状态
			collapse:function(){
				let collapse=!this.collapsed;
        this.setCollapsed(collapse);
        localStorage.setItem('collapsed',collapse);

			}
		},
    mounted(){
      this.setCollapsed(localStorage.getItem('collapsed')=="true");
      //系统加载显示延迟一秒
      setTimeout(() => {
        this.setSysLoading(false);
      }, 1000);
    }
	}
</script>

<style scoped>
  .header {
    padding-left: 0px;
    background-color: #ffffff;
    color: #333;
    line-height: 60px;
    height:60px;
    color:#fff;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    box-shadow: 1px 1px 5px #ccc;
    -webkit-box-shadow: 1px 1px 5px #ccc;
    -moz-box-shadow: 1px 1px 5px #ccc;
    -o-box-shadow: 1px 1px 5px #ccc;
  }
  .logo-long,
  .logo-mini {
  	color:#fff;
    font-size:25px;
    width:260px;
    text-align: center;
    background-color: #072140;
    -webkit-box-shadow: 1px 1px 7px #333;
    -moz-box-shadow: 1px 1px 7px #333;
    -o-box-shadow: 1px 1px 7px #333;
  }
  .logo-mini  {
    width:65px;
  }
  .aside-long, .aside-mini{
  	background-color:#031529;
    width: 260px;
    position: fixed;
    top: 0;
    left: 0;
    margin-top: 59px;
    height: calc(100% - 59px);
    z-index: 6;
    -webkit-box-shadow: 1px 1px 7px #333;
    -moz-box-shadow: 1px 1px 7px #333;
    -o-box-shadow: 1px 1px 7px #333;
    overflow-y: auto;
  }
  .aside-mini {
    width: 65px;
    overflow: inherit;
  }
  .el-main {
    margin-top: 60px;
    padding: 0 0 0 260px;
    background-color: #f0f2f5;
    width: 100%;
  }
  .main-mini {
    margin-top: 60px;
    padding-left: 60px;
  }
  .el-menu--collapse .el-submenu .el-menu {
    display: block;
  }
  .el-menu-item {
    -webkit-transition: 0s !important;
    transition: 0s !important;
    background: #f00;
  }
</style>