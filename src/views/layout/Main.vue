<template>
<el-container>
  	<el-header class="header">
      <el-col :span="12">
        <el-col :span="6" :class="collapsed?'logo-mini':'logo-long'">
          {{collapsed?logoMiniName:logoLongName}}
        </el-col>
        <el-col :span="6">
         
          <el-button style="margin-left:10px;" @click="collapse"><i :class="collapsed?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></i></el-button>
        </el-col>
      </el-col>
      
      <el-col :span="12">
        <el-col :span="24" style="text-align:right;"><UserInfo></UserInfo></el-col>
      </el-col>
  	</el-header>

    <el-container>
    <transition name="el-zoom-in-center">
     <el-aside :class="collapsed?'aside-mini':'aside-long'" width="collapsed?'65px':'220px'">
      <LeftMenu :collapsed="collapsed"></LeftMenu>
     </el-aside>
     </transition>
     <el-main :class="collapsed?'main-mini':''">
        <el-col :span="24" style="background-color:#fff;height:71px;;">
          <el-col :span="24" >
            <el-breadcrumb separator="/" style="margin-left:20px;line-height:40px;">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{ item.name }}
              </el-breadcrumb-item>
           </el-breadcrumb>
           <strong style="width:100px;color:#475669;margin-left:25px;line-height:31px;">{{$route.name}}</strong>
          </el-col>
        </el-col>
        <el-col :span="24" style="background-color:#fff; border: 20px solid #f0f2f5; padding: 20px;">
           <router-view></router-view>     
        </el-col>
        
     </el-main>
    </el-container>
</el-container>
</template>

<script>
import LeftMenu from '@/views/components/LeftMenu'
import UserInfo from '@/views/components/UserInfo'
	export default{
		name:'Main',
		components:{
			LeftMenu,
      UserInfo
		},
		data(){
			return{
				logoLongName:'国烨电商ERP',
				logoMiniName:'商',
			  collapsed:false
			}
		},
		methods: {
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			}
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
  

  .logo-long{
  	color:#fff;
    font-size:25px;
    width:260px;
    border-right:1px solid #072140;
    text-align: center;
    background-color: #072140;
    -webkit-box-shadow: 1px 1px 7px #333;
    -moz-box-shadow: 1px 1px 7px #333;
    -o-box-shadow: 1px 1px 7px #333;
  }
  .logo-mini{
  	color:#fff;
    font-size:25px;
    width:65px;
    border-right:1px solid #072140;
    text-align: center;
    background-color: #072140;
  }
  .aside-long{
  	background-color:#031529;
    width: 260px;
    border-right: 1px solid #031529;
    position: fixed;
    top: 59px;
    left: 0;
    height: 100%;
    z-index: 6;
    -webkit-box-shadow: 1px 1px 7px #333;
    -moz-box-shadow: 1px 1px 7px #333;
    -o-box-shadow: 1px 1px 7px #333;
  }
  .aside-mini{
  	background-color:#031529;
    width: 65px;
    position: fixed;
    left: 0;
    top: 59px;
    z-index: 6;
    height: 100%;
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
  .el-aside, .el-main {
    overflow: inherit;
  }
  .el-menu-item {
    -webkit-transition: 0s !important;
    transition: 0s !important;
    background: #f00;
  }
</style>