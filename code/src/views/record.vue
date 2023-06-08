<template>
	<NavigationBar />
	<div class="outer_box">
		<!--头像,名字,最近歌曲最多数量-->
		<div style="display: flex; align-items: center; width: 100%; height: 20%;">
			<img :src="this.photo_url" class="left_profile" style="margin-left: 60px;" />
			<div class="rectangle_container" style="width: 16%; margin-left: 30px;">
				<p class="theme_font">{{ username }}</p>
			</div>
			<div class="rectangle_container" style="width: 18%; margin-left: 20%;">
				<p class="theme_font">最近播放最大数量</p>
			</div>
			<el-input id="i_num" type="number" v-model="max_num" aria-placeholder="{{ max_num }}"
				style="width:auto;margin-left:10px" @change="changeMax" :min="1" :max="999"/>
		</div>
		<div style="display: flex; width: 100%; height: 80%;">
			<div style="display: flex; width: 65%; margin-left: 50px;">
				<div style="display: flex; align-items: center; height: 100%; width: 100%;">
					<el-scrollbar style="display: flex; width: 100%" max-height="100%">
						<div v-for="(song, index) in song_list?.slice(0, max_num)" :key="index" class="box_song_list">
							<div style="width: 80%; margin-left: 50px;">
								<p class="theme_font" style="color: black;" @click="to_song(song.song_id)">{{ song.title }}</p>
							</div>
							<div style="margin-left: 400px;">
								<p class="theme_font" style="color: black;">{{ song.artist }}</p>
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
			max_num: 10,
			song_list: []
		}
	},
	created() {
		const here = this
		this.$axios.get('/music/get_max').then((response) =>{
			if (response.data.result == 0) {
				here.$data.max_num = response.data.max
			}
			else{
				ElMessageBox.alert("获取最大数量失败了,"+response.data.message, '提示', {
					confirmButtonText: '确认',
					confirmButtonClass: 'btnFalses'
				})
			}
		})
		this.$axios.get('/music/get_record_list').then((response) => {
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
				ElMessageBox.alert("获取最近播放失败了,"+response.data.message, '提示', {
					confirmButtonText: '确认',
					confirmButtonClass: 'btnFalses'
				})
			}
		})
	},
	methods: {
		to_song(song_id) {
			console.log(song_id)
			this.$router.push('/song/' + song_id)
		},
		changeMax() {
			const form_data = new FormData()
			form_data.append('max', this.max_num)
			this.$axios.post('/music/post_max', form_data, {
				headers: {
					'Content-type': "multipart/form-data"
				}
			})
			.then(function (response) {
			if (response.data.result == 0) {
				console.log(this.max_num)
			}
			else{
				ElMessageBox.alert("更改失败了,"+response.data.message, '提示', {
					confirmButtonText: '确认',
					confirmButtonClass: 'btnFalses'
				})
			}
		}.bind(this))
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