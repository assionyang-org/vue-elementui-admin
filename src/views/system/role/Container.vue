<!--模板-->
<template>
    <section>
    <Filters></Filters>
    <Form></Form>
    <!--表格组件-->
    <Table></Table>
    </section>
</template>
<!--JS-->
<script>
//引入自定义组件
import Filters from '@/views/system/role/components/Filters';
import Form from '@/views/system/role/components/Form';
import Table from '@/views/system/role/components/Table';

	export default{
		name:'User',
		//加载组件
		components:{
			Filters,
			Form,
			Table
		}
	}
</script>