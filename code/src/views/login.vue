<!--
	登录页面
-->
<script>
import { reactive } from "vue";
import { ElMessageBox } from "element-plus";

export default {
	name: 'login', 
	components: {
		ElMessageBox
	},
	methods: {
		//获取输入的数据，返回一个包含了id和password属性的对象
		get_input_data(){
			let t_username = document.getElementById('i_username').value
			let t_password = document.getElementById('i_password').value
			return{
				username: t_username,
				password: t_password
			}
		},
		//在这里处理跳转到注册页面事件
		to_register(){
			var input = this.get_input_data()
			console.log(input.username)
			console.log(input.password)
			console.log("I need to register first!\n");
			this.$router.push('./register')
		},
		//在这里处理登录事件
		login(){
			console.log("I want to login!\n");
			var input = this.get_input_data()
			//POST登录请求
			const here = this
			const form_data = new FormData()
			form_data.append('username', input.username)
			form_data.append('password', input.password)
			here.$axios
			.post('http://127.0.0.1:4523/m1/2749792-0-default/api/user/login', form_data, {
				headers: {
    				'Content-Type': 'multipart/form-data'
  				}
			})
			.then(function (response_1){
				if(response_1.status == 200){
					console.log("login post success")
					here.$axios
					.get('http://127.0.0.1:4523/m1/2749792-0-default/api/user/get_user_info')
					.then(function (response_2){
						if(response_2.status == 200){
							var user_id = response_2.data.user_data.user_id
							var username = response_2.data.user_data.username
							var photo_url = response_2.data.user_data.photo_url
							console.log(user_id)
							console.log(username)
							console.log(photo_url)
							here.$cur_user.user_id = user_id
							here.$cur_user.username = username
							here.$cur_user.photo_url = photo_url
							console.log(here.$cur_user)
							//here.$router.push('./result')
							here.$router.push('./index')
						}
						else{
							const dialog = new ElMessageBox({
								title: "糟糕，出错啦",
								message: response_2.message
							})
						}
					})
				}
				else{
					const dialog = new ElMessageBox({
						title: "糟糕，出错啦",
						message: response_1.message
					})
				}
			})
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
	input_username: '',
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
			<!--输入用户名-->
			<div style="display: flex;">
				<div class="rectangle_container" style="width: 20%;">
  					<p class="Chinese_font">用户名</p>
				</div>
				<div style="width: 70%; margin-left: 20px; margin-top: 23px;">
					<el-form v-model="input_data" :rules="rules" ref="a_input_data">
						<el-form-item prop="input_id">
							<el-input id="i_username" type="text" v-model="input_data.input_username" placeholder="请输入用户名" />
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
				<el-button style="width: 40%; margin-top: 30px;" @click="to_register" color="#7eec52">
					<p class="Chinese_font">去注册</p>
				</el-button>
				<el-button style="width: 40%; margin-top: 30px; margin-left: 50px;" @click="login" color="#7eec52">
					<p class="Chinese_font">登录</p>
				</el-button>
			</div>
			<div style="display: flex; justify-content: center;">
				<el-button style="width: 80%; margin-top: 30px;" @click="as_visitor" color="#7eec52">
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
  	height: 500px; 
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
