import axios from 'axios';

let base='';


export const getDepartmentList = params => { return axios.get(`${base}/system/department/list`, { params: params }); };
export const addDepartment = params => { return axios.get(`${base}/system/departments/add`, { params: params }); };
export const removeDepartment = params => { return axios.get(`${base}/system/departments/remove`, { params: params }); };
export const editDepartment = params => { return axios.get(`${base}/system/departments/edit`, { params: params }); };
export const getEmployeeList = params => { return axios.get(`${base}/system/employee/list`, { params: params }); };
