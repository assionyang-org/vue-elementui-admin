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

      <!--跟据菜单数据动态生成菜单，深度支持3级-->
      <template v-for="menu in menus">
          <!--判断是否有子菜单，无子菜单则直接生成菜单项-->
          <el-menu-item v-if="menu.children.length<1" :index="menu.path">
          <i :class="menu.icon"></i>
          <span slot="title">{{menu.title}}</span>
          </el-menu-item>
          <!--判断是否有子菜单，有子菜单生成子菜单-->
          <el-submenu v-if="menu.children.length>0" :index="menu.path" background-color="#fff">
              <template slot="title">
              <i :class="menu.icon"></i>
              <span>{{menu.title}}</span>
              </template>
              <template v-for="menu2 in menu.children">
                  <!--判断是否有子菜单，无子菜单则直接生成菜单项-->
                  <el-menu-item v-if="menu2.children.length<1" :index="menu2.path">{{menu2.title}}</el-menu-item>
                  <!--判断是否有子菜单，有子菜单生成子菜单-->
                  <el-submenu v-if="menu2.children.length>0" :index="menu2.id">
                       <template slot="title" >{{menu2.title}}</template>
                       <template v-for="menu3 in menu2.children">
                           <el-menu-item :index="menu3.path">{{menu3.title}}</el-menu-item>
                       </template>
                  </el-submenu>
              </template>
          </el-submenu>
      </template>

    </el-menu> 

</template>


<script>
import {getMenus} from '../../service/api';
  export default {
  	name:'LeftMenu',
  	data(){
  		return{
        menus:[]
  		}
  	},
  	props:['collapsed'],
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      getMenus(){
        let para={};
        getMenus(para).then((res)=>{
          this.menus=res.data.menus;
        });
      }
    },
    mounted(){
      console.log('ok');
      this.getMenus();
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