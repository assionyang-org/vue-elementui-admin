<template>
	<section>
		<el-row :gutter="20" style="padding:10px;">
	    <el-col :span="6">
	    <el-card class="box-card">
  	    	<div slot="header" class="clearfix">
   	    	 <span>总销售额</span>
   	    	 <el-button style="float: right; padding: 3px 0" type="text">查看</el-button>
 	    	 </div>
  	    	<div v-for="o in 4" :key="o" class="text item">
   	    	 {{'列表内容 ' + o }}
 	    	 </div>
       </el-card>
	    </el-col>
	    <el-col :span="6">
	    <el-card class="box-card">
  	    	<div slot="header" class="clearfix">
   	    	 <span>访问量</span>
   	    	 <el-button style="float: right; padding: 3px 0" type="text">查看</el-button>
 	    	 </div>
  	    	<div v-for="o in 4" :key="o" class="text item">
   	    	 {{'列表内容 ' + o }}
 	    	 </div>
       </el-card>
	    </el-col>
	    <el-col :span="6">
	    <el-card class="box-card">
  	    	<div slot="header" class="clearfix">
   	    	 <span>支付笔数</span>
   	    	 <el-button style="float: right; padding: 3px 0" type="text">查看</el-button>
 	    	 </div>
  	    	<div v-for="o in 4" :key="o" class="text item">
   	    	 {{'列表内容 ' + o }}
 	    	 </div>
       </el-card>
	    </el-col>
	    <el-col :span="6">
	    <el-card class="box-card">
  	    	<div slot="header" class="clearfix">
   	    	 <span>运营活动效果</span>
   	    	 <el-button style="float: right; padding: 3px 0" type="text">查看</el-button>
 	    	 </div>
  	    	<div v-for="o in 4" :key="o" class="text item">
   	    	 {{'列表内容 ' + o }}
 	    	 </div>
       </el-card>
	    </el-col>
	</el-row>

	<el-row :gutter="20" style="padding:10px;">
	    <el-col :span="24">
	    <el-card class="box-card" style="height:400px;">
  	    	<div slot="header" class="clearfix">
   	    	 <span>总销售额</span>
   	    	 <el-button style="float: right; padding: 3px 0" type="text">查看</el-button>
 	    	 </div>
  	    	<div v-for="o in 4" :key="o" class="text item">
   	    	 {{'列表内容 ' + o }}
 	    	 </div>
       </el-card>
	    </el-col>
	    </el-row>

	    <el-row :gutter="20" style="padding:10px;">
	    <el-col :span="12">
	    <el-card class="box-card" style="height:400px;">
  	    	<div slot="header" class="clearfix">
   	    	 <span>总销售额</span>
   	    	 <el-button style="float: right; padding: 3px 0" type="text">查看</el-button>
 	    	 </div>
  	    	<div v-for="o in 4" :key="o" class="text item">
   	    	 {{'列表内容 ' + o }}
 	    	 </div>
       </el-card>
	    </el-col>
	    <el-col :span="12">
	    <el-card class="box-card" style="height:400px;">
  	    	<div slot="header" class="clearfix">
   	    	 <span>总销售额</span>
   	    	 <el-button style="float: right; padding: 3px 0" type="text">查看</el-button>
 	    	 </div>
  	    	<div v-for="o in 4" :key="o" class="text item">
   	    	 {{'列表内容 ' + o }}
 	    	 </div>
       </el-card>
	    </el-col>
	    </el-row>
	</section>
</template>