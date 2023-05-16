<!--
	登录页面
-->

<template>
	<div style="margin-top: 50px; width: 100%; display: flex;">
		<!--左侧的logo-->
		<img src="../assets/logo.png" class="logo_picture">
		<!--右边输入信息的表单-->
		<div class="bordered_container">
			<!--平台名称COMusic-->
			<div style="display: flex; justify-content: center;">
				<div class="rectangle" style="width: 60%;">
  					<p class="English_font">COMusic</p>
				</div>
			</div>
			<!--输入用户ID-->
			<div style="display: flex;">
				<div class="rectangle" style="width: 20%;">
  					<p class="English_font">用户名</p>
				</div>
				<div style="width: 70%; margin-left: 20px; margin-top: 23px;">
					<el-input v-model="input" placeholder="请输入用户名" />
				</div>
			</div>
			<div style="display: flex;">
				<div class="rectangle" style="width: 20%;">
  					<p class="Chinese_font">密码</p>
				</div>
				<div style="width: 70%; margin-left: 20px; margin-top: 23px;">
					<el-input v-model="input" placeholder="请输入用户密码" />
				</div>
			</div>
            <div style="display: flex;">
				<div class="rectangle" style="width: 20%;">
  					<p class="Chinese_font">确认密码</p>
				</div>
				<div style="width: 70%; margin-left: 20px; margin-top: 23px;">
					<el-input v-model="input" placeholder="请确认密码" />
				</div>
			</div>
            <div style="display: flex;">
				<div class="rectangle" style="width: 20%;">
  					<p class="Chinese_font">邮箱</p>
				</div>
				<div style="width: 70%; margin-left: 20px; margin-top: 23px;">
					<el-input v-model="input" placeholder="请输入邮箱地址" />
				</div>
			</div>
			<div style="display: flex; justify-content: center;">
				<el-button style="width: 80%; margin-top: 30px;" @click="register()" color="#7eec52">
					<p class="Chinese_font">注册账号</p>
				</el-button>
			</div>
		</div>
	</div>
	
</template>

<script>
export default {
	name: 'register',
	methods: {
        //在这里处理注册事件
        register(){
            console.log("I want to register!\n");
        }
    }
}
</script>

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
.rectangle {
	margin-top: 20px;
  	border-radius: 30px;
  	height: 40px;
  	background-color: #7eec52;
  	display: flex;
  	justify-content: center;
  	align-items: center;
}
.rectangle p {
  margin: 0; /* 将内联元素的margin属性设置为0,以使它们紧贴在一起 */
}
</style>