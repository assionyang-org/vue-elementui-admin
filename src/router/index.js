import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/layout/Main'
import Blank from '@/views/layout/Blank'
import Login from '@/views/Login'
import NotFound from '@/views/404'
import Test1 from '@/views/test/Test1'
import Test2 from '@/views/test/Test2'
import Form from '@/views/test/Form'
import Table from '@/views/test/Table'
import Dashboard from '@/views/test/Dashboard'
import VuexTest from '@/views/test/VuexTest'
import Slide from '@/views/test/Slide'
import Notify from '@/views/test/Notify'
import Collapse from '@/views/test/Collapse'
import Dialog from '@/views/test/Dialog'
import Upload from '@/views/test/Upload'

Vue.use(Router)

export default new Router({
  routes: [
   {
    	path:'/blank',
    	name:'',
    	component:Blank,
    	children:[
    	{
    		path:'/login',
            name:'登录',
            component:Login
    	},
    	{
        path:'/404',
        name:'NotFound',
        component:NotFound
        }
    	]
    },
    {
      path: '/',
      name: '系统',
      component: Main,
      children:[
        {
            path:'/',
            redirect:{path:'/dashboard'}
        },
        {
            path:'vuextest',
            name:'Vuex测试',
            component:VuexTest
        },
        {
            path:'slide',
            name:'跑马灯',
            component:Slide
        },
        {
            path:'dialog',
            name:'对话框',
            component:Dialog
        },
        {
            path:'collapse',
            name:'折叠面板',
            component:Collapse
        },
        {
            path:'Notify',
            name:'通知',
            component:Notify
        },
        {
            path:'Upload',
            name:'文件上传',
            component:Upload
        },
        {
        	path:'test1',
        	name:'测试1',
        	component:Test1
        },
        {
        	path:'test2',
        	name:'测试2',
        	component:Test2
        },
        {
            path:'Form',
            name:'表单',
            component:Form
        },
        {
            path:'Table',
            name:'表格',
            component:Table
        }
        ,
        {
            path:'dashboard',
            name:'dashboard',
            component:Dashboard
        }
      ]
    },
    {
    	path:'*',
    	redirect:{path:'/404'}
    }
  ]
})
