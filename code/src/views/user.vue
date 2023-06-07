<!--
	个人页面
-->

<script>
import NavigationBar from '../components/NavigationBar.vue';
import { useRoute } from "vue-router";
import { ElMessageBox } from "element-plus";
import default_url from '../assets/default_profile.png'

var app = null

export default {
	name: 'user',
	/*
		md，我要开始骂人了，那个sb把这个data设置成了一个函数的
	*/
	data() {
		const here = this
		var cur_id = useRoute().params.id
		var cur_user_id
		var cur_username
		var cur_photo_url
		var who_see = 1
		if(here.$cur_user.user_id != cur_id){
			who_see = 2
			console.log("this is get_other_info")
			const form_data = new FormData()
			form_data.append('id', cur_id)
			here.$axios
			.get('/user/get_other_info', {
				params: {
    				id: cur_id
  				}
			})
			.then(function(response){
				if(response.status == 200){
					const re_data = response.data
					if(re_data.result == 0){
						cur_user_id = response.data.user_data.user_id
						cur_username = response.data.user_data.username
						cur_photo_url = response.data.user_data.photo_url
					}
					else{
						alert(re_data.message)
					}		
				}
				else{
					alert("error! response status is not 200!")
				}
			})
		}
		else{
			cur_user_id = here.$cur_user.user_id
			cur_photo_url = here.$cur_user.photo_url
			cur_username = here.$cur_user.username
		}
		return {
			who_see: who_see,
			USER_SELF: 1,
			USER_OTHER: 2,
			profile_type: '.png',
			photo_url: cur_photo_url,
			user_id: cur_user_id,
			username: cur_username,
			introduction: '快来编辑你的个人简介啊嘿嘿嘿！',
			can_modify: false
		}
	},
	created() {
		const here = this
		//当前来看的人就是在看自己
		if(here.$data.who_see == here.$data.USER_SELF){
			here.$axios
			.get('/user/get_intro')
			.then(function(response){
				if(response.status == 200){
					const re_data = response.data
					if(re_data.result == 0){
						here.$data.introduction = re_data.intro
					}
					else{
						alert(re_data.message)
					}
				}
				else{
					alert("error! response status is not 200!")
				}
			})
		}
		//在查看其他人的个人主页
		else if(here.$data.who_see == here.$data.USER_OTHER){
			here.$axios
			.get('/user/get_other_intro', {
                params: {
    				id: here.$data.user_id
  				}
            })
			.then(function(response){
				if(response.status == 200){
					const re_data = response.data
					if(re_data.result == 0){
						here.$data.introduction = re_data.intro
					}
					else{
						alert(re_data.message)
					}
				}
				else{
					alert("error! response status is not 200!")
				}
			})
		}
	},
	components: {
		NavigationBar,
		ElMessageBox
	},
	methods: {
		upload_profile(){
			const here = this
			if(here.$data.who_see == here.$data.USER_SELF){
				console.log("this is upload_profile");
				this.$refs.profile_select.click()
			}
		},
		select_profile(event){
			const here = this
			const profile = event.target.files[0];
			//使用二进制流
			const profile_read = new FileReader()
			var delta = 0
			profile_read.readAsBinaryString(profile)
			profile_read.onload = () => {
				const binary_profile = profile_read.result
				const form_data = new FormData()
				form_data.append('photo', profile)
				here.$axios
				.post('/user/upload_photo', form_data, {
					headers: {
    					'Content-Type': 'multipart/form-data'
  					}
				})
				.then(function(response){
					if(response.status == 200){
						const re_data = response.data
						if(re_data.result == 0){
							alert(re_data.message)
							delta = 1
						}
						else{
							alert(re_data.message)
						}
					}
					else{
						alert("error! response status is not 200!")
					}
				})
			}
			if(!delta){
				const profile_read_2 =  new FileReader()
				profile_read_2.readAsDataURL(profile)
				profile_read_2.onload = () => {
					const url_profile = profile_read_2.result
					here.$cur_user.photo_url = url_profile
					here.photo_url = url_profile
				}
			}
		},
		modify_introduction(){
			const here = this
			if(here.$data.who_see == here.$data.USER_OTHER){
				here.$data.can_modify = false
				return
			}
			let former = here.$data.can_modify
			if(former){
				here.$data.can_modify = false
				var new_introduction = document.getElementById('i_introduction').value
				console.log(new_introduction)
				const form_data = new FormData()
				form_data.append('intro', new_introduction)
				here.$axios
				.post('/user/upload_intro', form_data, {
					headers: {
    					'Content-Type': 'multipart/form-data'
  					}
				})
				.then(function(response){
					if(response.status == 200){
						const re_data = response.data
						if(re_data.result == 0){
							console.log("upload_bio post success")
							alert(re_data.message)
						}
						else{
							alert(re_data.message)
						}
					}
					else{
						alert("error! response status is not 200!")
					}
				})
			}
			else{
				here.$data.can_modify = true
			}
		},
		to_uploaded(){
			const here = this
			here.$router.push('../uploaded')
		},
		logout(){
			const here = this
			here.$axios
			.get('/user/logout')
			.then(function(response){
				if(response.status == 200){
					const re_data = response.data
					if(re_data.result == 0){
						alert(re_data.message)
						app.config.globalProperties.$is_login = false
						var visitor = {
    						user_id: 0,
    						username: 'visitor',
    						photo_url: default_url
						}
						app.config.globalProperties.$cur_user = visitor
						here.$router.push('../login')
					}
					else{
						alert(re_data.message)
					}
				}
				else{
					alert("error! response status is not 200!")
				}
			})
		},
		follow_other(){
			const here = this
			const form_data = new FormData()
			form_data.append('following_username', here.$data.username)
			here.$axios
			.post('/user/follow_user', form_data, {
				headers: {
    				'Content-Type': 'multipart/form-data'
  				}
			})
			.then(function(response){
				if(response.status == 200){
					const re_data = response.data
					if(re_data.result == 0){
						alert(re_data.message)
					}
					else{
						alert(re_data.message)
					}
				}
				else{
					alert("error! response status is not 200!")
				}
			})
		}
	}
}
</script>

<script setup>
import { reactive } from "vue";
import { getCurrentInstance } from "vue";

app = getCurrentInstance().appContext.app

const input_data = reactive({
	input_introduction: '',
})
</script>

<template>
	<!--引入导航栏组件-->
	<NavigationBar 
	v-if="who_see == USER_SELF"
	ref="navigation_bar"
	:profile_url="photo_url"
	/>
	<NaviNoLeft
	v-if="who_see == USER_OTHER"
	ref="navigation_bar"
	:profile_url="photo_url"
	/>
	<!--存放主体内容的div-->
	<div class="outer_box">
		<div style="width: 100%; height: 40%; display: flex; justify-content: center; align-items: center;">
			<el-button class="profile">
				<img :src="photo_url" class="profile" @click="upload_profile"/>
				<input type="file" accept=".jpg, .png" ref="profile_select" @change="select_profile" style="display: none;" />
			</el-button>
		</div>
		<div style="width: 100%; height: 5%; display: flex; justify-content: center; align-items: center;">
			<div class="rectangle_container" style="width: 20%;">
				<p class="Chinese_font">{{ username }}</p>
			</div>
		</div>
		<div style="width: 100%; height: 50%; display: flex; justify-content: center; align-items: center;">
			<div v-if="can_modify">
				<el-form :model="input_data" :rules="rules" ref="a_input_data">
					<el-form-item prop="input_introduction">
						<el-input :rows="8" style="width: 500px;" id="i_introduction" v-model="introduction" type="textarea"/>
					</el-form-item>
				</el-form>
			</div>
			<div v-if="!can_modify">
				<el-form :model="input_data" :rules="rules" ref="a_input_data">
					<el-form-item prop="input_introduction">
						<el-input :rows="8" disabled="true" style="width: 500px;" v-model="introduction" type="textarea"/>
					</el-form-item>
				</el-form>
			</div>
			<div style="width: 50px;"></div>
			<div style="display: flex; justify-content: center; align-items: center;">
				<el-button v-if="can_modify" color="#7eec52" @click="modify_introduction()">
					<p class="Chinese_font">保存个人简介</p>
				</el-button>
				<el-button v-if="!can_modify" color="#7eec52" @click="modify_introduction()">
					<p class="Chinese_font">编辑个人简介</p>
				</el-button>
			</div>
			<div style="width: 50px;"></div>
			<div style="width: 150px;">
				<div v-if="who_see == USER_SELF">
					<el-button color="#7eec52" @click="to_uploaded">
						<p class="Chinese_font">查看上传记录</p>
					</el-button>
					<el-button style="margin-top: 40px;" color="#7eec52" @click="logout">
						<p class="Chinese_font">退出登录</p>
					</el-button>
				</div>
				<div v-if="who_see == USER_OTHER">
					<el-button color="#7eec52" @click="follow_other">
						<p class="Chinese_font">关注我啦</p>
					</el-button>
				</div>
			</div> 
		</div>
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outer_box {
	justify-content: center;
	position: absolute; 
	display: flex; 
	flex-wrap: wrap; 
	left: 185px; 
	top: 20vh;
	height: 80vh;
	width: 80%;
}
.profile {
	height: 180px;
	width: 180px;
	left: 40%;
	top: 40%;
	border-radius: 50%;
}
.Chinese_font {
	color: white;
	font-size: large;
	font-family:'Microsoft YaHei', sans-serif;;
}
.rectangle_container {
	  border-radius: 30px;
	  height: 40px;
	  display: flex;
	background-color: #7eec52;
	justify-content: center;
	  align-items: center;
}
.rectangle_container p {
  margin: 0; /* 将内联元素的margin属性设置为0,以使它们紧贴在一起 */
}
</style>
