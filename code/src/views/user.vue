<!--
	个人页面
-->

<script>
import NavigationBar from "../components/NavigationBar.vue";

export default {
	name: 'user',
    components: {
        NavigationBar //导航栏，包含左侧
    },
	methods: {
		/*在这里写一些响应事件*/
	}
}
</script>

<script setup>
import { reactive } from "vue";

const input_data = reactive({
	input_profile: '',
	input_introduction: '',
})
</script>

<template>
	<NavigationBar></NavigationBar>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.English_font {
	color: white;
	font-size: large;
	font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.Chinese_font {
	color: white;
	font-size: large;
	font-family:'Microsoft YaHei', sans-serif;;
}
.logo_picture {
	display: flex;
	height: 200px;
  	justify-content: center; /* 将内容居中 */
	margin-top: 180px;
  	margin-left: calc(1/5 * 100%); /* 将左侧留出1/5的空间 */
}
.bordered_container {
	justify-content: center; /* 将内容居中 */
  	border: 2px solid #7eec52; /* 将边框设置为2像素宽、绿色的实线 */
  	width: 400px;
  	height: 500px; /* 设置高度为200像素 */
	margin-left: 150px;
  	border-radius: 30px;
}
.bordered_container > div {
  padding: 10px; /* 在子元素周围添加10像素的内边距 */
}
.rectangle_container {
	margin-top: 20px;
  	border-radius: 30px;
  	height: 40px;
	background-color: #7eec52;
  	display: flex;
  	justify-content: center;
  	align-items: center;
}
.rectangle_container p {
  margin: 0; /* 将内联元素的margin属性设置为0,以使它们紧贴在一起 */
}
</style>
