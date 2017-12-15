import Main from '@/views/layout/Main'
import Login from '@/views/Login'

// 不作为Main组件的子页面展示的页面
export const loginRouter = {
    path: '/login',
    name: '登录',
    meta:{isAuth:false},
    component: resolve => { require(['@/views/Login'], resolve); }
};
export const page404Router = {
    path: '*',
    name: '404',
    meta:{isAuth:false},
    component: resolve => { require(['@/views/404'], resolve); }
};

//作为Main组件的子页面展示的页面
export const appRouter=[
    {
    	path:'/',
    	name:'系统',
    	component:Main,
    	children:[
        	{path:'/',redirect:{path:'/dashboard'}},
            {path:'/message',name:'消息显示页',component:resolve=>{require(['@/views/Message'],resolve);}},
    	    {path:'/dashboard',name:'Dashboard',component:resolve=>{require(['@/views/Dashboard'],resolve);}},
    	    {path:'/vuextest',name:'Vuex测试页',component:resolve=>{require(['@/views/test/VuexTest'],resolve);}},
    	    {path:'/slide',name:'跑马灯',component:resolve=>{require(['@/views/test/Slide'],resolve);}},
    	    {path:'/dialog',name:'对话框',component:resolve=>{require(['@/views/test/Dialog'],resolve);}},
    	    {path:'/collapse',name:'折叠面板',component:resolve=>{require(['@/views/test/Collapse'],resolve);}},
    	    {path:'/notify',name:'通知',component:resolve=>{require(['@/views/test/Notify'],resolve);}},
    	    {path:'/upload',name:'文件上传',component:resolve=>{require(['@/views/test/Upload'],resolve);}},
    	    {path:'/test1',name:'测试1',component:resolve=>{require(['@/views/test/Test1'],resolve);}},
    	    {path:'/test2',name:'测试2',component:resolve=>{require(['@/views/test/Test2'],resolve);}},
    	    {path:'/form',name:'表单',component:resolve=>{require(['@/views/test/Form'],resolve);}},
    	    {path:'/table',name:'表格',component:resolve=>{require(['@/views/test/Table'],resolve);}},
            {path:'/charts',name:'图表',component:resolve=>{require(['@/views/test/Charts'],resolve);}},
    	    {path:'/department',name:'部门管理',component:resolve=>{require(['@/views/system/Department'],resolve);}},
    	    {path:'/employee',name:'员工管理',component:resolve=>{require(['@/views/system/Employee'],resolve);}},
    	    {path:'/user',name:'帐号管理',component:resolve=>{require(['@/views/system/User'],resolve);}},
    	    {path:'/role',name:'角色管理',component:resolve=>{require(['@/views/system/Role'],resolve);}},
    	    {path:'/auth',name:'权限管理',component:resolve=>{require(['@/views/system/Auth'],resolve);}},
    	]
    }
];

//导出
export const routers=[
    loginRouter,
    ...appRouter,
    page404Router
];
