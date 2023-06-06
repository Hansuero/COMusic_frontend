<template>
	<NavigationBar />
	<div class="outer_box">
		<!--头像,名字,最近歌曲最多数量-->
		<div style="display: flex; align-items: center; width: 100%; height: 20%;">
			<img :src="this.photo_url" class="left_profile" style="margin-left: 60px;" />
			<div class="rectangle_container" style="width: 16%; margin-left: 30px;">
				<p class="theme_font">{{ username }}</p>
			</div>
		</div>
		<!--消息栏-->
		<div style="display: flex; width: 100%; height: 80%;">
			<div style="display: flex; width: 65%; margin-left: 50px;">
				<div style="display: flex; align-items: center; height: 100%; width: 100%;">
					<el-scrollbar style="display: flex; width: 100%" max-height="100%">
						<div v-for="(message, index) in message_list" :key="index" class="box_message_list" >
							<div style="width: 80%; margin-left: 10px; margin-right: 400px;">
								<p class="theme_font" style="color: black;">{{ message.sender }}</p>
							</div>
							<div style="width: 80%; margin-left: 50px; ">
								<p class="theme_font" style="color: black; word-wrap: break-word;" >{{ message.content }}</p>
							</div>
							<div style="width: 80%; margin-left: 10px; margin-right: 400px;">
								<p class="theme_font" style="color: black;" >{{ message.time }}</p>
							</div>
						</div>
					</el-scrollbar>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
export default {
	name: 'record',
	components: {
		NavigationBar
	},
	data() {
		return {
			username: this.$cur_user.username,
			photo_url: this.$cur_user.photo_url,
			user_id: this.$cur_user.user_id,
			message_list: []
		}
	},
	created() {
		const here = this
		this.$axios.get('/super_admin/get_report_list').then((response) => {
			if (response.data.result == 0 || response.data.result == 3) {
				const re_data = response.data
						const message_list = re_data.report_list
						message_list.forEach(function(element){
							var message_id = element.report_id
							var sender = element.sender
							var time = element.time
							var content = element.content
							here.$data.message_list.push({
								message_id: message_id,
								sender: sender,
								time: time,
								content: content
							})
						})
			}
			else {
				ElMessageBox.alert("获取失败了，尝试联系管理员吧", '提示', {
					confirmButtonText: '确认',
					confirmButtonClass: 'btnFalses'
				})
			}
		})
	},
	methods: {

	}
}
</script>

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

.left_profile {
	height: 90px;
	width: 90px;
	border-radius: 50%;
}

.theme_font {
	color: white;
	font-size: normal;
	font-family: 'Microsoft YaHei', sans-serif;
	;
}

.rectangle_container {
	border-radius: 30px;
	height: 40px;
	display: flex;
	background-color: #7eec52;
	justify-content: center;
	align-items: center;
}

.box_message_list {
	border-bottom: 2px solid grey;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-start;
	background-color: #F0FFF0;
	margin-top: 6px;
	border-radius: 10px;
	padding-right: 50px;
}
</style>