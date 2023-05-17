<!--
	登录页面
-->
<script>
import { reactive } from "vue";
export default {
	name: 'login', 
	methods: {
		//获取输入的数据，返回一个包含了id和password属性的对象
		get_input_data(){
			let id = document.getElementById('i_id').value
			let password = document.getElementById('i_password').value
			return{
				id,
				password
			}
		},
		//在这里处理跳转到注册页面事件
		to_register(){
			var input = this.get_input_data()
			console.log(input.id)
			console.log(input.password)
			console.log("I need to register first!\n");
			this.$router.push('./register')
		},
		//在这里处理登录事件
		login(){
			console.log("I want to login!\n");
		},
		//在这里处理游客访问
		as_visitor(){
			console.log("I am a visitor!\n");
		}
	}
}
</script>

<script setup>
import { reactive } from "vue";

const input_data = reactive({
	input_id: '',
	input_password: '',
})
</script>

<template>
	<div style="margin-top: 50px; width: 100%; display: flex;">
		<!--左侧的logo-->
		<img src="../assets/logo.png" class="logo_picture">
		<!--右边输入信息的表单-->
		<div class="bordered_container">
			<!--平台名称COMusic-->
			<div style="display: flex; justify-content: center;">
				<div class="rectangle_container" style="width: 60%;">
  					<p class="English_font">COMusic</p>
				</div>
			</div>
			<!--输入用户ID-->
			<div style="display: flex;">
				<div class="rectangle_container" style="width: 20%;">
  					<p class="English_font">ID</p>
				</div>
				<div style="width: 70%; margin-left: 20px; margin-top: 23px;">
					<el-form v-model="input_data" :rules="rules" ref="a_input_data">
						<el-form-item prop="input_id">
							<el-input id="i_id" type="text" v-model="input_data.input_id" placeholder="请输入用户ID" />
						</el-form-item>
					</el-form>
				</div>
			</div>
			<!--输入用户密码-->
			<div style="display: flex;">
				<div class="rectangle_container" style="width: 20%;">
  					<p class="Chinese_font">密码</p>
				</div>
				<div style="width: 70%; margin-left: 20px; margin-top: 23px;">
					<el-form :model="input_data" :rules="rules" ref="a_input_data">
						<el-form-item prop="input_password">
							<el-input id="i_password" v-model="input_data.input_password" type="password" placeholder="请输入用户密码" />
						</el-form-item>
					</el-form>
				</div>
			</div>
			<div style="display: flex; margin-left: 20px;">
				<el-button style="width: 40%; margin-top: 30px;" @click="to_register()" color="#7eec52">
					<p class="Chinese_font">去注册</p>
				</el-button>
				<el-button style="width: 40%; margin-top: 30px; margin-left: 50px;" @click="login()" color="#7eec52">
					<p class="Chinese_font">登录</p>
				</el-button>
			</div>
			<div style="display: flex; justify-content: center;">
				<el-button style="width: 80%; margin-top: 30px;" @click="as_visitor()" color="#7eec52">
					<p class="Chinese_font">游客模式访问</p>
				</el-button>
			</div>
		</div>
	</div>
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
