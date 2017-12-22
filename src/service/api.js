import axios from 'axios';

//axios默认配置
axios.defaults.baseURL = '';
axios.defaults.timeout = 5000;

// http request 拦截器
axios.interceptors.request.use(
    config => {
    	sessionStorage.setItem("token","123");
    	if(sessionStorage.getItem("token")!=null){
    		config.headers.Authorization = sessionStorage.getItem("token");
    	}
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    //store.commit(types.LOGOUT);
                    this.$router.push({path:'/login'});
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    }
);


export const login=params=>{return axios.post('https://api.github.com',params).then(res=>res.data);};
export const requestLogin = params => { return axios.post(`/login`, params).then(res => res.data);};

/**系统api**/
//获取部门列表（树形）
export const getDepartmentList = params => { return axios.get(`/system/department/list`, { params: params }); };
//新增部门
export const addDepartment = params => { return axios.post(`/system/departments/add`,params).then(res=>res.data); };
//删除部门
export const removeDepartment = params => { return axios.get(`/system/departments/remove`, { params: params }); };
//修改部门
export const editDepartment = params => { return axios.post(`/system/departments/edit`,params).then(res=>res.data); };
//获取员工列表（分页）
export const getEmployeeList = params => { return axios.get(`/system/employee/list`, { params: params }); };
//新增员工
export const addEmployee = params => { return axios.post(`/system/employee/add`, params).then(res=>res.data); };
//删除员工
export const removeEmployee = params => { return axios.get(`/system/employee/remove`, {params:params}); };
//批量删除员工
export const batchremoveEmployee = params => { return axios.get(`/system/employee/batchremove`, { params: params }); };
//修改员工
export const editEmployee = params => { return axios.post(`/system/employee/edit`,params).then(res=>res.data); };
//获取用户列表（分页）
export const getUserList = params => { return axios.get(`/system/user/list`, { params: params }); };



