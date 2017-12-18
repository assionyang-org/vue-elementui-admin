<!--模板-->
<template>
    <section>
    <UserFilters></UserFilters>
    <UserForm></UserForm>
    <!--表格组件-->
    <UserTable></UserTable>
    </section>
</template>
<!--JS-->
<script>
//引入自定义组件
import UserFilters from '@/views/system/user/components/Filters';
import UserForm from '@/views/system/user/components/Form';
import UserTable from '@/views/system/user/components/Table';

	export default{
		name:'User',
		//加载组件
		components:{
			UserFilters,
			UserForm,
			UserTable
		}
	}
</script>