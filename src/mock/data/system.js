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

export {Departments};

