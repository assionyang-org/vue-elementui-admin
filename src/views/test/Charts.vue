<template>
    <div class="content">
        <div id="main"></div>
    </div>
</template>


<style scoped>
.content {
    /*自行添加样式即可*/
}

#main {
    /*需要制定具体高度，以px为单位*/
    height: 400px;
}
</style>


<script>
	import echarts from 'echarts'
	import $ from 'jquery'

	export default {
    data() {
            return {
                // 初始化空对象
                chart: null,
                // 初始化图表配置
                opinion: ['高富帅', '矮富帅', '高富挫', '矮富挫', '女生'],
                opinionData: [{
                    value: 26,
                    name: '高富帅'
                }, {
                    value: 31,
                    name: '矮富帅'
                }, {
                    value: 18,
                    name: '高富挫'
                }, {
                    value: 28,
                    name: '矮富挫'
                }, {
                    value: 21,
                    name: '女生'
                }]
            }
        },
        methods: {
            // 绘图
            drawGraph(id) {
                // 绘图方法
                this.chart = echarts.init(document.getElementById(id))
                    // 皮肤添加同一般使用方式
                this.chart.showLoading()
                    // 返回到data中
                var that = this
                    // ajax 请求数据
                $.ajax({
                        // 方式
                        type: "GET",
                        // 是否异步
                        async: true,
                        // 路径||API
                        url: "xxx",
                        //返回数据形式为json
                        dataType: "json",
                        // 加载成功
                        success: function(result) {
                            // 更新初始数据
                            that.opinionData = result
                        },
                        // 加载错误
                        error: function(errorMsg) {
                            // alert("请求数据失败!");
                            console.log(errorMsg)
                        }
                    })
                    // set
                this.chart.setOption({
                    title: {
                        text: '女生喜欢的男生种类',
                        subtext: '纯属扯犊子',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        x: 'center',
                        y: 'bottom',
                        data: this.opinion // 别忘了this
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {
                                show: true
                            },
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            magicType: {
                                show: true,
                                type: ['pie']
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    calculable: true,
                    series: [{
                        name: '种类',
                        type: 'pie',
                        // 内圆半径，外圆半径
                        radius: [30, 100],
                        // 位置，左右，上下
                        center: ['50%', '50%'],
                        roseType: 'area',
                        data: this.opinionData, // 别忘了this

                    }]
                })
                this.chart.hideLoading()
            }
        },
        // keypoint：执行方法
        // “将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。”
        mounted() {
            this.$nextTick(function() {
                this.drawGraph('main')
            })
        }
}
</script>