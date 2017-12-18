import axios from 'axios';

let base = '';

/**用户api**/
//登录
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

/**系统api**/
//获取部门列表（树形）
export const getDepartmentList = params => { return axios.get(`${base}/system/department/list`, { params: params }); };
//新增部门
export const addDepartment = params => { return axios.post(`${base}/system/departments/add`,params).then(res=>res.data); };
//删除部门
export const removeDepartment = params => { return axios.get(`${base}/system/departments/remove`, { params: params }); };
//修改部门
export const editDepartment = params => { return axios.post(`${base}/system/departments/edit`,params).then(res=>res.data); };
//获取员工列表（分页）
export const getEmployeeList = params => { return axios.get(`${base}/system/employee/list`, { params: params }); };
//新增员工
export const addEmployee = params => { return axios.post(`${base}/system/employee/add`, params).then(res=>res.data); };
//删除员工
export const removeEmployee = params => { return axios.get(`${base}/system/employee/remove`, {params:params}); };
//批量删除员工
export const batchremoveEmployee = params => { return axios.get(`${base}/system/employee/batchremove`, { params: params }); };
//修改员工
export const editEmployee = params => { return axios.post(`${base}/system/employee/edit`,params).then(res=>res.data); };
