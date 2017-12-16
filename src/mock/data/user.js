import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '杨春来',
    menus:[
                           {
      id:1,
      name:'Dashboard',
      path:'dashboard',
      icon:'el-icon-date',
      title:'Dashboard',
      children:[]
  },
  {
      id:2,
      name:'Vuextest',
      path:'vuextest',
      icon:'el-icon-location',
      title:'Vuex测试',
      children:[
      ]
  },
  {
      id:3,
      name:'Notfound',
      path:'notfound',
      icon:'el-icon-menu',
      title:'404页',
      children:[]
  },
  {
      id:4,
      name:'Login',
      path:'login',
      icon:'el-icon-circle-check',
      title:'登录页',
      children:[]
  },
  {
      id:5,
      name:'System',
      path:'system',
      icon:'el-icon-setting',
      title:'系统管理',
      children:[
          {
            id:6,
            name:'Department',
            path:'department',
            icon:'',
            title:'部门管理',
            children:[]
          },
          {
            id:7,
            name:'Employee',
            path:'employee',
            icon:'',
            title:'员工管理',
            children:[]
          },
          {
            id:8,
            name:'User',
            path:'user',
            icon:'',
            title:'帐号管理',
            children:[]
          },
          {
            id:9,
            name:'RoleAuth',
            path:'',
            icon:'',
            title:'权限管理',
            children:[
               {
                 id:10,
                 name:'Role',
                 path:'role',
                 icon:'',
                 title:'角色',
                 children:[]
               },
               {
                 id:11,
                 name:'Auth',
                 path:'auth',
                 icon:'',
                 title:'权限',
                 children:[]
               }
            ]
          }
      ]
      }
    ]
  }
]

const LoginUsers2 = [
  {
    id: 1,
    username: 'guest',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '杨春来2',
    menus:[
       {
          id:1,
          name:'Dashboard',
          path:'dashboard',
          icon:'el-icon-date',
          title:'Dashboard',
          children:[]
       },
       {
      id:5,
      name:'System',
      path:'system',
      icon:'el-icon-setting',
      title:'系统管理',
      children:[
          {
            id:6,
            name:'Department',
            path:'department',
            icon:'',
            title:'部门管理',
            children:[]
          },
          {
            id:7,
            name:'Employee',
            path:'employee',
            icon:'',
            title:'员工管理',
            children:[]
          },
          {
            id:8,
            name:'User',
            path:'user',
            icon:'',
            title:'帐号管理',
            children:[]
          },
          {
            id:9,
            name:'RoleAuth',
            path:'',
            icon:'',
            title:'权限管理',
            children:[
               {
                 id:10,
                 name:'Role',
                 path:'role',
                 icon:'',
                 title:'角色',
                 children:[]
               },
               {
                 id:11,
                 name:'Auth',
                 path:'auth',
                 icon:'',
                 title:'权限',
                 children:[]
               }
            ]
          }
      ]
      }
    ]
  }
 ]

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}

export { LoginUsers,LoginUsers2,Users };
