<!--
	个人页面
-->

<script>
import NavigationBar from '../components/NavigationBar.vue';
import { useRoute } from "vue-router";
import { ElMessageBox } from "element-plus";

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
		if(here.$cur_user.user_id != cur_id){
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
					cur_user_id = response.data.user_data.user_id
					cur_username = response.data.user_data.username
					cur_photo_url = response.data.user_data.photo_url
				}
				else{
					const dialog = new ElMessageBox({
						title: "糟糕，出错啦",
						message: response.data.message
					})
				}
			})
		}
		else{
			cur_user_id = here.$cur_user.user_id
			cur_photo_url = here.$cur_user.photo_url
			cur_username = here.$cur_user.username
		}
		return {
			profile_type: '.png',
			photo_url: cur_photo_url,
			user_id: cur_user_id,
			username: cur_username,
			introduction: '快来编辑你的个人简介啊嘿嘿嘿！',
			can_modify: false
		}
	},
	components: {
		NavigationBar,
		ElMessageBox
	},
	methods: {
		upload_profile(){
			console.log("this is upload_profile");
			this.$refs.profile_select.click()
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
						console.log('upload_photo post success')
						delta = 1
					}
					else{
						const dialog = new ElMessageBox({
							title: "糟糕，出错啦",
							message: response.data.message
						})
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
			let former = this.$data.can_modify
			const here = this
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
						console.log("upload_bio post success")
					}
					else{
						const dialog = new ElMessageBox({
							title: "糟糕，出错啦",
							message: response.data.message
						})
					}
				})
			}
			else{
				here.$data.can_modify = true
			}
		}
	}
}
</script>

<script setup>
import { reactive } from "vue";

const input_data = reactive({
	input_introduction: '',
})
</script>

<template>
	<!--引入导航栏组件（包含左侧）-->
	<NavigationBar 
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
			<div style="margin-left: 50px;">
				<el-button v-if="can_modify" color="#7eec52" @click="modify_introduction()">
					<p class="Chinese_font">保存个人简介</p>
				</el-button>
				<el-button v-if="!can_modify" color="#7eec52" @click="modify_introduction()">
					<p class="Chinese_font">编辑个人简介</p>
				</el-button>
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
	width: 80%;
	height: 80vh;
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
