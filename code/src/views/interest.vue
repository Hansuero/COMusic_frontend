<!--
	个人关注页面
-->

<script>
import NavigationBar from '../components/NavigationBar.vue';
import { ElMessageBox } from 'element-plus';
import { getCurrentInstance } from "vue";

export default {
	name: 'interest',
	/*
		md，我要开始骂人了，那个sb把这个data设置成了一个函数的
	*/
	data() {
		return {
            num_interest: 0,
			interest_list: []
		}
	},
	created() {
		const here = this
		here.$axios
		.get('http://127.0.0.1:4523/m1/2749792-0-default/api/user/show_following')
		.then(function(response){
			if(response.status == 200){
				console.log("get following list success")
				const re_data = response.data
				console.log(re_data)
				var following_list = re_data.following
				here.$data.num_interest = following_list.length
				following_list.forEach(function(element){
					var intere_user_id = element.user_id
					var intere_user_name = element.username
					var intere_photo_url = element.photo_url
					here.$data.interest_list.push({
						intere_user_id: intere_user_id,
						intere_user_name: intere_user_name,
						intere_photo_url: intere_photo_url
					})
				})
			}
			else{
				const dialog = new ElMessageBox({
					title: "糟糕，出错啦",
					message: response.message
				})
			}
		})
	},
	components: {
		NavigationBar,
		ElMessageBox
	},
	methods: {
		//取消关注相关方法
		cancel_interest(intere_user_name){
			const here = this
			const form_data = new FormData()
			form_data.append('following_username', intere_user_name)
			here.$axios
			.delete('http://127.0.0.1:4523/m1/2749792-0-default/api/user/unfollow_user', form_data, {
				headers: {
    				'Content-Type': 'multipart/form-data'
  				}
			})
			.then(function(response){
				if(response.status == 200){
					console.log('cancel success')
					var cancel_index
					for(var i=0; i<here.$data.num_interest; i++){
						if(here.$data.interest_list[i].intere_user_name == intere_user_name){
							cancel_index = i
							break
						}
					}
					here.$data.interest_list.splice(cancel_index, 1)
				}
				else{
					const dialog = new ElMessageBox({
						title: "糟糕，出错啦",
						message: response.message
					})
				}
			})
		},
		//跳转到关注用户主页的方法
		to_intere_user(intere_user_id){
			const here = this
			console.log(intere_user_id)
			/*
				这个功能，你现在不要试
				水太深，你把握不住
				还有就是，这个要上云之后才能用
				因为在本地MOCK的话，不能保证从user_id获取到的虚假的用户信息中
				的user_id依旧是和作为参数的user_id一样的
				所以你先别试
			*/
			//here.$router.push('/user/'+intere_user_id)
		}
	}
}
</script>

<template>
	<!--引入导航栏组件（包含左侧）-->
	<NavigationBar></NavigationBar>
	<!--存放主体内容的div-->
	<div class="outer_box">
        <el-scrollbar style="display: flex; width: 100%;" max-height="100%">
            <div style="display: flex; align-items: center;">
                <div v-for="intere in interest_list" class="box_interest_item">
					<div style="width: 100%; display: flex; align-items: center; justify-content: center;">
						<img :src="intere.intere_photo_url" class="profile" @click="to_intere_user(intere.intere_user_id)"/>
					</div>
					<div style="width: 100%; display: flex; justify-content: center; align-items: center;">
						<p class="theme_font" style="color: black;">{{ intere.intere_user_name }}</p>
					</div>
					<el-button color="#7eec52" @click="cancel_interest(intere.intere_user_name)">
						<p class="theme_font">取消关注</p>
					</el-button>
				</div>
            </div>
		</el-scrollbar>
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
.profile{
	height: 200px;
	width: 200px;
	border-radius: 50%;
}
.theme_font {
	color: white;
	font-size: large;
	font-family:'Microsoft YaHei', sans-serif;;
}
.box_interest_item{
	max-width: 300px;
	height: 500px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	background-color: #E1FFFF;
	margin-left: 40px;
	margin-right: 40px;
	border-radius: 50px;
	padding-left: 30px;
	padding-right: 30px;
}
</style>