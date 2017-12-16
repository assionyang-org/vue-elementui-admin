import axios from 'axios';

let base='';


export const getDepartmentList = params => { return axios.get(`${base}/system/department/list`, { params: params }); };
export const addDepartment = params => { return axios.post(`${base}/system/departments/add`,params).then(res=>res.data); };
export const removeDepartment = params => { return axios.get(`${base}/system/departments/remove`, { params: params }); };
export const editDepartment = params => { return axios.post(`${base}/system/departments/edit`,params).then(res=>res.data); };
export const getEmployeeList = params => { return axios.get(`${base}/system/employee/list`, { params: params }); };
export const addEmployee = params => { return axios.post(`${base}/system/employee/add`, params).then(res=>res.data); };
export const removeEmployee = params => { return axios.get(`${base}/system/employee/remove`, {params:params}); };
export const batchremoveEmployee = params => { return axios.get(`${base}/system/employee/batchremove`, { params: params }); };
export const editEmployee = params => { return axios.post(`${base}/system/employee/edit`,params).then(res=>res.data); };