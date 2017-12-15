import Mock from 'mockjs'

const Departments=[
    {
    	sysno:1,
        parent_sysno:0,
        departmentname:'上海国烨跨境电子商务有限公司',
        status:1,
        isdel:false,
        version:Mock.Random.guid(),
        created_at:Mock.Random.date(),
        updated_at:Mock.Random.date()
    },
    {
    	sysno:2,
        parent_sysno:1,
        departmentname:'IT中心',
        status:1,
        isdel:false,
        version:Mock.Random.guid(),
        created_at:Mock.Random.date(),
        updated_at:Mock.Random.date()
    },
    {
    	sysno:3,
        parent_sysno:1,
        departmentname:'运营中心',
        status:1,
        isdel:false,
        version:Mock.Random.guid(),
        created_at:Mock.Random.date(),
        updated_at:Mock.Random.date()
    },
    {
    	sysno:4,
        parent_sysno:2,
        departmentname:'研发部',
        status:1,
        isdel:false,
        version:Mock.Random.guid(),
        created_at:Mock.Random.date(),
        updated_at:Mock.Random.date()
    }
];

const Employees = [];

for (let i = 0; i < 123; i++) {
    Employees.push(Mock.mock({
    sysno: Mock.Random.guid(),
    department_sysno:1,
    departmentname:'IT中心',
    employeeno:'E00000001',
    photo: 'http://pic.chinayie.com/cdn/headphoto.png',
    employeename: Mock.Random.cname(),
    'employeeage|18-60': 18,
    employeesex: Mock.Random.integer(0, 1),
    hiredate: Mock.Random.date(),
    jobtitle:'当上CEO',
    status:1,
    isdel:false,
    version:Mock.Random.guid(),
    created_at:Mock.Random.date(),
    updated_at:Mock.Random.date()
  }));
}

export {Departments,Employees};

