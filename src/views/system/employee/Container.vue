<!--模板-->
<template>
    <section>
    <!--查询过虑器组件-->
    <EmployeeFilters></EmployeeFilters>
    <!--增改窗体组件-->
    <EmployeeForm></EmployeeForm>
    <!--表格组件-->
    <EmployeeTable></EmployeeTable>
    </section>
</template>
<!--JS-->
<script>
//引入自定义组件
import EmployeeForm from '@/views/system/employee/components/Form';
import EmployeeFilters from '@/views/system/employee/components/Filters';
import EmployeeTable from '@/views/system/employee/components/Table';

	export default{
		name:'Employee',
		//加载组件
		components:{
			EmployeeFilters,
			EmployeeForm,
			EmployeeTable
		}
	}
</script>