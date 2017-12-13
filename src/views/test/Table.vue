<template>
    <section>
    	<!--工具条-->
	<el-col :span="24" class="toolbar" style="padding-top:10px;">
		<el-form :inline="true">
			<el-form-item>
				<el-input  placeholder="姓名"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" >查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" >新增</el-button>
			</el-form-item>
		</el-form>
    </el-col>
    <el-alert>
    title="带辅助性文字介绍"
    type="success"
    description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……">
  </el-alert>
	<el-col :span="24">
    <el-table :data="users" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120">
			</el-table-column>
			<el-table-column prop="sex" label="性别" width="100">
			</el-table-column>
			<el-table-column prop="age" label="年龄" width="100">
			</el-table-column>
			<el-table-column prop="birth" label="生日" width="120">
			</el-table-column>
			<el-table-column prop="addr" label="地址" min-width="180">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
	</el-table>
	</el-col>
	<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" >批量删除</el-button>
			<el-pagination layout="prev, pager, next" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
    </section>
</template>

<script>
	export default{
		name:'Table',
		data(){
			return {
				users: [
				  {
				  	name:'张三',
				  	sex:'男',
				  	age:'29',
				  	birth:'1988-06-01',
				  	addr:'上海市杨浦区'
				  },
				  {
				  	name:'张三',
				  	sex:'男',
				  	age:'29',
				  	birth:'1988-06-01',
				  	addr:'上海市杨浦区'
				  },
				  {
				  	name:'张三',
				  	sex:'男',
				  	age:'29',
				  	birth:'1988-06-01',
				  	addr:'上海市杨浦区'
				  },
				  {
				  	name:'张三',
				  	sex:'男',
				  	age:'29',
				  	birth:'1988-06-01',
				  	addr:'上海市杨浦区'
				  },
				  {
				  	name:'张三',
				  	sex:'男',
				  	age:'29',
				  	birth:'1988-06-01',
				  	addr:'上海市杨浦区'
				  },
				  {
				  	name:'张三',
				  	sex:'男',
				  	age:'29',
				  	birth:'1988-06-01',
				  	addr:'上海市杨浦区'
				  },
				  {
				  	name:'张三',
				  	sex:'男',
				  	age:'29',
				  	birth:'1988-06-01',
				  	addr:'上海市杨浦区'
				  },
				  {
				  	name:'张三',
				  	sex:'男',
				  	age:'29',
				  	birth:'1988-06-01',
				  	addr:'上海市杨浦区'
				  },
				  {
				  	name:'张三',
				  	sex:'男',
				  	age:'29',
				  	birth:'1988-06-01',
				  	addr:'上海市杨浦区'
				  },
				  {
				  	name:'张三',
				  	sex:'男',
				  	age:'29',
				  	birth:'1988-06-01',
				  	addr:'上海市杨浦区'
				  },
				  {
				  	name:'张三',
				  	sex:'男',
				  	age:'29',
				  	birth:'1988-06-01',
				  	addr:'上海市杨浦区'
				  },
				  {
				  	name:'张三',
				  	sex:'男',
				  	age:'29',
				  	birth:'1988-06-01',
				  	addr:'上海市杨浦区'
				  },
				  {
				  	name:'张三',
				  	sex:'男',
				  	age:'29',
				  	birth:'1988-06-01',
				  	addr:'上海市杨浦区'
				  },
				  {
				  	name:'张三',
				  	sex:'男',
				  	age:'29',
				  	birth:'1988-06-01',
				  	addr:'上海市杨浦区'
				  },
				  {
				  	name:'张三',
				  	sex:'男',
				  	age:'29',
				  	birth:'1988-06-01',
				  	addr:'上海市杨浦区'
				  },
				  {
				  	name:'张三',
				  	sex:'男',
				  	age:'29',
				  	birth:'1988-06-01',
				  	addr:'上海市杨浦区'
				  },
				  {
				  	name:'张三',
				  	sex:'男',
				  	age:'29',
				  	birth:'1988-06-01',
				  	addr:'上海市杨浦区'
				  },
				  {
				  	name:'张三',
				  	sex:'男',
				  	age:'29',
				  	birth:'1988-06-01',
				  	addr:'上海市杨浦区'
				  },
				  {
				  	name:'张三',
				  	sex:'男',
				  	age:'29',
				  	birth:'1988-06-01',
				  	addr:'上海市杨浦区'
				  }
				],
				total: 100,
				page: 1,
			}
		}
	}
</script>