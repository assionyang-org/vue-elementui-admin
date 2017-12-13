import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '杨春来',
    auths:[
      {
        path:'/table'
      },
      {
        path:'/dashboard'
      },
      {
        path:'/form'
      },
      {
        path:'/vuextest'
      },
      {
        path:'/slide'
      },
      {
        path:'/notify'
      },
      {
        path:'/collapse'
      },
      {
        path:'/dialog'
      },
      {
        path:'/upload'
      },
      {
        path:'/test1'
      },
      {
        path:'/test2'
      },
      {
        path:'/department'
      },
      {
        path:'/employee'
      },
      {
        path:'/user'
      },
      {
        path:'/role'
      },
      {
        path:'/auth'
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
    auths:[
      {
        path:'/dashboard'
      }
    ]
  }
];

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
