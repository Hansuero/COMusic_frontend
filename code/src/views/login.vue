<!--
	登录页面
-->
<script>
import { reactive } from "vue";
import { ElMessageBox } from "element-plus";
import { getCurrentInstance } from 'vue';
import test_profile_url from '../assets/profile.png'

var app = null

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
			const here = this
			console.log("I want to login!\n");
			var input = this.get_input_data()

			/*
				这里是一个跳过登录，直接进入主页面的快捷通道
				仅供本地开发测试使用
				无法预测在云端会发生什么情况
			*/
			if(input.username == 55555 && input.password == 55555){
				here.$cur_user.user_id = 55555
				here.$cur_user.username = "Keine"
				here.$cur_user.photo_url = test_profile_url
				here.$is_login = true
				console.log(here.$is_login)
				console.log(here.$is_login)
				here.$router.push('./user/55555')
				return
			}

			//POST登录请求
			const form_data = new FormData()
			form_data.append('username', input.username)
			form_data.append('password', input.password)
			here.$axios
			.post('/user/login', form_data, {
				headers: {
    				'Content-Type': 'multipart/form-data'
  				}
			})
			.then(function (response_1){
				if(response_1.status == 200){
					const re_data_1 = response_1.data
					if(re_data_1.result == 0){
						console.log("login post success")
						here.$axios
						.get('/user/get_user_info')
						.then(function (response_2){
							if(response_2.status == 200){
								const re_data_2 = response_2.data
								if(re_data_2.result == 0){
									var username = re_data_2.user_data.username
									var user_id = re_data_2.user_data.user_id
									var photo_url = re_data_2.user_data.photo_url
									console.log(user_id)
									console.log(username)
									console.log(photo_url)
									here.$cur_user.user_id = user_id
									here.$cur_user.username = username
									here.$cur_user.photo_url = photo_url
									console.log(here.$cur_user)
									//here.$router.push('./result')
									app.config.globalProperties.$is_login = true
									here.$router.push('./index')
								}
								else{
									alert(re_data_2.message)
								}
							}
							else{
								alert("error! response status is not 200!")
							}
						})
					}
					else{
						alert(re_data_1.message)
					}
				}
				else{
					alert("error! response status is not 200!")
				}
			})
		},
		//在这里处理游客访问
		as_visitor(){
			const here = this
			console.log("I am a visitor!\n")
			here.$router.push('./index')
		}
	}
}
</script>

<script setup>
import { reactive } from "vue";

app = getCurrentInstance().appContext.app

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
				<el-button style="width: 40%; margin-top: 30px;" id="c_to_register" @click="to_register" color="#7eec52">
					<p class="Chinese_font">去注册</p>
				</el-button>
				<el-button style="width: 40%; margin-top: 30px; margin-left: 50px;" id="c_login" @click="login" color="#7eec52">
					<p class="Chinese_font">登录</p>
				</el-button>
			</div>
			<div style="display: flex; justify-content: center;">
				<el-button style="width: 80%; margin-top: 30px;" id="c_as_visitor" @click="as_visitor" color="#7eec52">
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
