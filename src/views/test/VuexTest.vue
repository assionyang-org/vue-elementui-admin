<template>
	<section style="padding:10px;">
		<div>
	    <h1>vuex 测试</h1>
	    点击次数：{{getCount}} <br/><br/>
	    <el-button @click="increment">+</el-button>
	    <el-button @click="decrement">-</el-button>
	</div>
	</section>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {mapActions} from 'vuex'

	export default{
		computed:{
			//使用对象展开运算符将 getters 混入 computed 对象中
			...mapGetters([
				'getCount'
				])
		},
		methods:{
			...mapActions([
                'increment', //映射 this.increment() 为  this.$store.dispatch('increment');
                'decrement'
				])
		}
	}
</script>