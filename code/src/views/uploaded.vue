<template>
	<NavigationBar />
	<div class="outer_box">
		<!--头像,名字-->
		<div style="display: flex; align-items: center; width: 100%; height: 20%;">
			<img :src= "this.photo_url" class="left_profile" style="margin-left: 60px;" />
			<div class="rectangle_container" style="width: 16%; margin-left: 30px;">
				<p class="theme_font">{{ username }}</p>
			</div>
		</div>
		<div style="display: flex; width: 100%; height: 80%;">
			<div style="display: flex; width: 65%; margin-left: 50px;">
				<div style="display: flex; align-items: center; height: 100%; width: 100%;">
					<el-scrollbar style="display: flex; width: 650px" max-height="100%">
						<div v-for="(song,index) in song_list" class="box_song_list">
							<p class="theme_font" style="width: 200px; margin-left: 50px; color: black;" @click="to_song(song.song_id)">{{ song.title }}</p>
							<p class="theme_font" style="color: black;margin-right:10px">{{ song.artist }}</p>
							<button style="background-color:#7eec52 ;color:white; border-radius: 10px; margin-left: auto; border-color:#7eec52" @click="DeleteSong(song.song_id)">删除</button>
						</div>
					</el-scrollbar>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
import { ElMessageBox } from "element-plus";
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
			song_list: []
		}
	},
	created() {
		const here = this
		this.$axios.get('/music/get_uploaded_list').then((response) => {
			console.log(response)
			if (response.data.result == 0) {
				const re_data = response.data
						const song_list = re_data.song_list
						song_list.forEach(function(element){
							var song_id = element.song_id
							var title = element.song_title
							var artist = element.song_artist
							here.$data.song_list.push({
								song_id: song_id,
								title: title,
								artist: artist
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
		DeleteSong(id) {
			console.log(id)
			this.$axios.delete('/music/delete_song', {
				params: {
					song_id: id
				}
			}).then(function (response) {
				if (response.data.result == 0) {
					ElMessageBox.alert("删除成功", '提示', {
						confirmButtonText: '确认',
						confirmButtonClass: 'btnFalses'
					})
				}
				else{
					ElMessageBox.alert("删除失败了", '提示', {
					confirmButtonText: '确认',
					confirmButtonClass: 'btnFalses'
				})
				}
			})
		},
		to_song(song_id) {
			console.log(song_id)
			this.$router.push('/song/' + song_id)
		}
	},
}
</script>

<style>
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

.box_song_list {
	border-bottom: 2px solid grey;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #F0FFF0;
	margin-top: 6px;
	border-radius: 20px;
	padding-right: 50px;
}

.btnFalses {
	background: #7eec52 !important;
	border-color: #7eec52 !important;
}
</style>