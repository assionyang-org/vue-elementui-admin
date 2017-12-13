<template>
	<section>
		
		 <el-breadcrumb separator="/" style="margin-left:20px;line-height:40px;">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{ item.name }}
              </el-breadcrumb-item>
           </el-breadcrumb>
           <strong style="width:100px;color:#475669;margin-left:25px;line-height:31px;">{{$route.name}}</strong>
	</section>
</template>